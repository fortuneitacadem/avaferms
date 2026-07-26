export function resolveAssetUrl(url: string | undefined | null): string | undefined {
  if (!url) return undefined;

  const base = import.meta.env.BASE_URL || '/';

  if (/^(https?:)?\/\//.test(url)) {
    return url;
  }

  if (url.startsWith(base)) {
    return url;
  }

  if (url.startsWith('./') || url.startsWith('../')) {
    return url;
  }

  if (url.startsWith('/')) {
    const sanitized = url.replace(/^\/+/, '');
    return `${base}${sanitized}`;
  }

  const sanitized = url.replace(/^\/+/, '');
  return `${base}${sanitized}`;
}
