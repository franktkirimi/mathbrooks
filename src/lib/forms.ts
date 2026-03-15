export function getFormspreeId(): string {
  return import.meta.env.VITE_FORMSPREE_ID?.trim() ?? "";
}

export function hasFormspreeConfig(): boolean {
  return getFormspreeId().length > 0;
}
