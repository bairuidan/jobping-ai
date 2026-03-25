export const CURRENT_VERSION_KEY = 'jobping_current_version';

export function setCurrentVersionId(id: number) {
  localStorage.setItem(CURRENT_VERSION_KEY, String(id));
}

export function getCurrentVersionId() {
  const raw = localStorage.getItem(CURRENT_VERSION_KEY);
  return raw ? Number(raw) : null;
}
