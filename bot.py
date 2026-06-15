"""
HyperCar Do'kon — Telegram To'lov Boti
=======================================
O'rnatish:
    pip install python-telegram-bot==20.7 requests

Ishga tushurish:
    python bot.py

Muhit o'zgaruvchilari (.env yoki to'g'ridan-to'g'ri):
    BOT_TOKEN   — BotFather dan olingan token
    ADMIN_ID    — Sizning Telegram ID ingiz (https://t.me/userinfobot)
"""

import logging, requests
from datetime import datetime
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import (
    Application, CommandHandler, CallbackQueryHandler,
    MessageHandler, filters, ContextTypes
)

# ═══════════════════════════════════════════════════════════════
#  SOZLAMALAR — bu yerlarni to'ldiring
# ═══════════════════════════════════════════════════════════════

import os
BOT_TOKEN  = os.environ.get("BOT_TOKEN",  "8971490822:AAHPH6CoP51Vy9w1lyVHdp2K65Cc3K4b7rg")
ADMIN_ID   = int(os.environ.get("ADMIN_ID", "7635016815"))
FIREBASE   = os.environ.get("FIREBASE_URL", "https://sign-9ff7d-default-rtdb.firebaseio.com")

# To'lov rekvizitlari
PAYMENT_METHODS = {
    "humo":  {"name": "Humo",  "card": "4195 2500 5320 0802", "owner": "ABDUVAXIDOV SAN'AT", "phone": "0727 579"},
    "click": {"name": "Click", "card": "4195 2500 5320 0802", "owner": "ABDUVAXIDOV SAN'AT", "phone": "0727 579"},
    "payme": {"name": "Payme", "card": "4195 2500 5320 0802", "owner": "ABDUVAXIDOV SAN'AT", "phone": "0727 579"},
}

# UZS → So'm narxlar (o'zgartiring)
PRICES = {
    100:  "4 000 so'm",
    150:  "6 000 so'm",
    500:  "18 000 so'm",
    1000: "35 000 so'm",
}

# ═══════════════════════════════════════════════════════════════
#  LOGGING
# ═══════════════════════════════════════════════════════════════

logging.basicConfig(
    format="%(asctime)s | %(levelname)s | %(message)s",
    level=logging.INFO
)
log = logging.getLogger(__name__)

# ═══════════════════════════════════════════════════════════════
#  FIREBASE YORDAMCHILAR
# ═══════════════════════════════════════════════════════════════

def fb_put(path: str, data: dict) -> bool:
    """Firebase Realtime Database ga PUT so'rov."""
    try:
        r = requests.put(f"{FIREBASE}{path}.json", json=data, timeout=10)
        return r.status_code == 200
    except Exception as e:
        log.error(f"Firebase PUT xato: {e}")
        return False

def fb_get(path: str) -> dict | None:
    """Firebase Realtime Database dan GET so'rov."""
    try:
        r = requests.get(f"{FIREBASE}{path}.json", timeout=10)
        if r.status_code == 200:
            return r.json()
    except Exception as e:
        log.error(f"Firebase GET xato: {e}")
    return None

def fb_patch(path: str, data: dict) -> bool:
    """Firebase Realtime Database da PATCH (qisman yangilash)."""
    try:
        r = requests.patch(f"{FIREBASE}{path}.json", json=data, timeout=10)
        return r.status_code == 200
    except Exception as e:
        log.error(f"Firebase PATCH xato: {e}")
        return False

def save_order(order_id: str, user_id: str, tg_id: int,
               amount: int, status: str = "pending") -> bool:
    """Buyurtmani Firebase ga saqlash."""
    return fb_put(f"/shop_orders/{order_id}", {
        "userId":    user_id,
        "tgId":      tg_id,
        "amount":    amount,
        "status":    status,
        "timestamp": int(datetime.utcnow().timestamp()),
        "package":   f"{amount} UZS",
    })

def confirm_order(order_id: str, user_id: str, amount: int) -> bool:
    """Buyurtmani tasdiqlash: Firebase ga UZS yozish."""
    # Buyurtma statusini yangilash
    fb_patch(f"/shop_orders/{order_id}", {"status": "confirmed"})

    # O'yinchiga UZS yuborish
    current = fb_get(f"/pending_rewards/{user_id}")
    current_tanga = 0
    if current and isinstance(current, dict):
        current_tanga = current.get("tanga", 0) or 0

    return fb_put(f"/pending_rewards/{user_id}", {
        "tanga": current_tanga + amount
    })

def reject_order(order_id: str) -> bool:
    """Buyurtmani rad etish."""
    return fb_patch(f"/shop_orders/{order_id}", {"status": "rejected"})

# ═══════════════════════════════════════════════════════════════
#  HANDLERS
# ═══════════════════════════════════════════════════════════════

async def start(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    """
    /start pay_USERID_AMOUNT_ORDERID — o'yin ichidan kelgan so'rov
    /start — oddiy boshlash
    """
    user = update.effective_user
    args = ctx.args

    # Deep link orqali kelgan bo'lsa
    if args and args[0].startswith("pay_"):
        parts = args[0].split("_")
        # pay_{userId}_{amount}_{orderId}
        if len(parts) >= 4:
            game_user_id = parts[1]
            try:
                amount   = int(parts[2])
                order_id = parts[3]
            except ValueError:
                await update.message.reply_text("❌ Noto'g'ri so'rov.")
                return

            # Kontekstga saqlash
            ctx.user_data["game_user_id"] = game_user_id
            ctx.user_data["amount"]       = amount
            ctx.user_data["order_id"]     = order_id

            # Narxni topish
            price_str = PRICES.get(amount, f"{amount} UZS uchun narx belgilanmagan")

            # To'lov turlarini tanlash
            keyboard = [
                [InlineKeyboardButton("🟣 Humo",  callback_data=f"method_humo_{order_id}")],
                [InlineKeyboardButton("💳 Click", callback_data=f"method_click_{order_id}")],
                [InlineKeyboardButton("📱 Payme", callback_data=f"method_payme_{order_id}")],
            ]
            await update.message.reply_text(
                f"🛒 <b>HyperCar Do'kon</b>\n\n"
                f"📦 Paket: <b>{amount} UZS</b>\n"
                f"💰 Narxi: <b>{price_str}</b>\n"
                f"🆔 Buyurtma: <code>{order_id}</code>\n\n"
                f"To'lov turini tanlang:",
                parse_mode="HTML",
                reply_markup=InlineKeyboardMarkup(keyboard)
            )
            return

    # Oddiy /start
    await update.message.reply_text(
        f"👋 Salom, {user.first_name}!\n\n"
        "Bu bot HyperCar o'yinining to'lov boti.\n"
        "UZS sotib olish uchun o'yin ichidan Do'konga kiring."
    )


async def method_chosen(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    """To'lov turi tanlanganda."""
    query = update.callback_query
    await query.answer()

    data = query.data  # method_click_ORDERID
    parts = data.split("_", 2)
    if len(parts) < 3:
        return

    method_key = parts[1]   # click / payme / uzum
    order_id   = parts[2]

    method  = PAYMENT_METHODS.get(method_key)
    amount  = ctx.user_data.get("amount", 0)
    user_id = ctx.user_data.get("game_user_id", "")

    if not method:
        await query.edit_message_text("❌ To'lov turi topilmadi.")
        return

    price_str = PRICES.get(amount, "—")

    # Rekvizitlarni ko'rsatish
    await query.edit_message_text(
        f"💳 <b>{method['name']} orqali to'lash</b>\n\n"
        f"Karta raqami:\n"
        f"<code>{method['card']}</code>\n\n"
        f"Egasi: <b>{method['owner']}</b>\n"
        f"Miqdor: <b>{price_str}</b>\n\n"
        f"<b>Pul o'tkazgandan so'ng chek rasmini yuboring.</b>\n\n"
        f"🆔 Buyurtma: <code>{order_id}</code>",
        parse_mode="HTML"
    )

    # Buyurtmani Firebase ga saqlash
    save_order(order_id, user_id, query.from_user.id, amount)
    ctx.user_data["awaiting_receipt"] = True
    log.info(f"Buyurtma yaratildi: {order_id} | {amount} UZS | {method_key}")


async def receipt_received(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    """Chek rasmi yuborilganda."""
    if not ctx.user_data.get("awaiting_receipt"):
        return  # Bu foydalanuvchi to'lov jarayonida emas

    amount   = ctx.user_data.get("amount", 0)
    order_id = ctx.user_data.get("order_id", "—")
    user_id  = ctx.user_data.get("game_user_id", "—")
    price_str = PRICES.get(amount, "—")

    ctx.user_data["awaiting_receipt"] = False

    # Foydalanuvchiga tasdiqlash xabari
    await update.message.reply_text(
        "✅ Chekingiz qabul qilindi!\n\n"
        "Admin tekshirgandan so'ng UZS hisobingizga avtomatik qo'shiladi.\n"
        "Odatda 5-15 daqiqa ichida.",
        parse_mode="HTML"
    )

    # Admin ga xabar yuborish
    keyboard = InlineKeyboardMarkup([
        [
            InlineKeyboardButton("✅ Tasdiqlash",  callback_data=f"confirm_{order_id}_{user_id}_{amount}"),
            InlineKeyboardButton("❌ Rad etish",   callback_data=f"reject_{order_id}"),
        ]
    ])

    caption = (
        f"🧾 <b>Yangi to'lov cheki</b>\n\n"
        f"👤 Telegram: <a href='tg://user?id={update.effective_user.id}'>"
        f"{update.effective_user.full_name}</a>\n"
        f"🆔 O'yin ID: <code>{user_id}</code>\n"
        f"📦 Paket: <b>{amount} UZS</b>\n"
        f"💰 To'lov: <b>{price_str}</b>\n"
        f"🔑 Buyurtma: <code>{order_id}</code>\n"
        f"🕐 Vaqt: {datetime.now().strftime('%d.%m.%Y %H:%M')}"
    )

    try:
        if update.message.photo:
            await ctx.bot.send_photo(
                chat_id=ADMIN_ID,
                photo=update.message.photo[-1].file_id,
                caption=caption,
                parse_mode="HTML",
                reply_markup=keyboard
            )
        elif update.message.document:
            await ctx.bot.send_document(
                chat_id=ADMIN_ID,
                document=update.message.document.file_id,
                caption=caption,
                parse_mode="HTML",
                reply_markup=keyboard
            )
        else:
            # Matn chek yuborilgan bo'lsa
            await ctx.bot.send_message(
                chat_id=ADMIN_ID,
                text=caption + f"\n\n📝 Chek matni:\n{update.message.text or '—'}",
                parse_mode="HTML",
                reply_markup=keyboard
            )
    except Exception as e:
        log.error(f"Admin ga xabar yuborishda xato: {e}")


async def admin_action(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    """Admin tasdiqlash yoki rad etish."""
    query = update.callback_query

    # Faqat admin ishlatishi mumkin
    if query.from_user.id != ADMIN_ID:
        await query.answer("❌ Ruxsat yo'q!", show_alert=True)
        return

    await query.answer()
    data = query.data

    # ── Tasdiqlash ──────────────────────────────────────────────────────────
    if data.startswith("confirm_"):
        parts = data.split("_", 3)
        # confirm_{orderId}_{userId}_{amount}
        if len(parts) < 4:
            await query.edit_message_reply_markup(None)
            return

        order_id = parts[1]
        user_id  = parts[2]
        try:
            amount = int(parts[3])
        except ValueError:
            amount = 0

        success = confirm_order(order_id, user_id, amount)
        if success:
            await query.edit_message_caption(
                query.message.caption +
                f"\n\n✅ <b>TASDIQLANDI</b> — +{amount} UZS o'yinchiga yuborildi.",
                parse_mode="HTML"
            )
            # O'yinchiga xabar
            try:
                tg_id_data = fb_get(f"/shop_orders/{order_id}")
                if tg_id_data and "tgId" in tg_id_data:
                    await ctx.bot.send_message(
                        chat_id=tg_id_data["tgId"],
                        text=f"🎉 To'lovingiz tasdiqlandi!\n\n"
                             f"+{amount} UZS hisobingizga qo'shildi.\n"
                             f"O'yinni oching — UZS avtomatik keladi.",
                    )
            except Exception as e:
                log.warning(f"O'yinchiga xabar yuborishda xato: {e}")

            log.info(f"Tasdiqlandi: {order_id} | {user_id} | +{amount} UZS")
        else:
            await query.answer("❌ Firebase ga yozishda xato!", show_alert=True)

    # ── Rad etish ────────────────────────────────────────────────────────────
    elif data.startswith("reject_"):
        order_id = data.split("_", 1)[1]
        reject_order(order_id)
        await query.edit_message_caption(
            query.message.caption + "\n\n❌ <b>RAD ETILDI.</b>",
            parse_mode="HTML"
        )
        # O'yinchiga xabar
        try:
            tg_id_data = fb_get(f"/shop_orders/{order_id}")
            if tg_id_data and "tgId" in tg_id_data:
                await ctx.bot.send_message(
                    chat_id=tg_id_data["tgId"],
                    text="❌ Afsuski, to'lovingiz tasdiqlanmadi.\n\n"
                         "Chek rasmini qayta yuboring yoki biz bilan bog'laning."
                )
        except Exception as e:
            log.warning(f"Rad xabari yuborishda xato: {e}")

        log.info(f"Rad etildi: {order_id}")


# ─── Admin: barcha buyurtmalarni ko'rish ──────────────────────────────────────

async def orders(update: Update, _ctx: ContextTypes.DEFAULT_TYPE):
    """Faqat admin uchun: /orders — so'nggi buyurtmalar."""
    if update.effective_user.id != ADMIN_ID:
        return

    data = fb_get("/shop_orders")
    if not data:
        await update.message.reply_text("Hozircha buyurtma yo'q.")
        return

    lines = []
    for oid, o in list(data.items())[-10:]:  # so'nggi 10 ta
        status_icon = {"pending": "⏳", "confirmed": "✅", "rejected": "❌"}.get(
            o.get("status", ""), "❓")
        lines.append(
            f"{status_icon} {o.get('package','?')} | "
            f"ID:{o.get('userId','?')[:8]}... | "
            f"{datetime.fromtimestamp(o.get('timestamp',0)).strftime('%d.%m %H:%M')}"
        )

    await update.message.reply_text(
        "📋 <b>So'nggi buyurtmalar:</b>\n\n" + "\n".join(reversed(lines)),
        parse_mode="HTML"
    )


# ═══════════════════════════════════════════════════════════════
#  MAIN
# ═══════════════════════════════════════════════════════════════

def main():
    app = Application.builder().token(BOT_TOKEN).build()

    app.add_handler(CommandHandler("start",  start))
    app.add_handler(CommandHandler("orders", orders))

    # To'lov turi tanlash
    app.add_handler(CallbackQueryHandler(method_chosen, pattern=r"^method_"))

    # Admin tasdiqlash / rad etish
    app.add_handler(CallbackQueryHandler(admin_action, pattern=r"^(confirm|reject)_"))

    # Chek rasmi (rasm yoki hujjat yoki matn)
    app.add_handler(MessageHandler(
        filters.PHOTO | filters.Document.ALL | filters.TEXT & ~filters.COMMAND,
        receipt_received
    ))

    log.info("🤖 Bot ishga tushdi...")
    app.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    main()
