import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Key, X, ShieldAlert } from 'lucide-react';
import { useData } from '../../context/DataContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const { loginAdmin } = useData();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      setError(false);
      setPassword('');
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10000] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4"
      >
        <div className="relative w-full max-w-md bg-[#05070D] border border-primary/40 rounded-3xl p-8 shadow-[0_0_50px_rgba(0,229,255,0.3)]">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-red-500/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/40 flex items-center justify-center mb-4">
              <Lock className="w-7 h-7 text-primary" />
            </div>
            <h3 className="text-2xl font-black font-display text-white uppercase">
              UBT-TEAM CMS ADMIN
            </h3>
            <p className="text-xs text-gray-400 font-tech uppercase tracking-wider mt-1">
              Enter Administrator Security Key
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-tech text-gray-300 uppercase mb-1">
                Password: (Default: ubt2026)
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                  placeholder="Enter admin password..."
                  className="w-full bg-black/60 border border-white/20 rounded-xl px-4 py-3 text-sm text-white focus:border-primary focus:outline-none pl-10"
                />
                <Key className="w-4 h-4 text-gray-400 absolute left-3 top-3.5" />
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/50 flex items-center gap-2 text-xs text-red-300">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                <span>Invalid key! Hint: try 'ubt2026' or 'admin'</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-secondary text-black font-extrabold font-display text-sm uppercase tracking-wider shadow-lg hover:shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all"
            >
              ACCESS CMS PANEL
            </button>
          </form>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
