export const CLIENT_REGEX =
  /^[A-Za-z](?!.*[.-]{2})(?:[A-Za-z]|[.-](?=[A-Za-z])){1,18}[A-Za-z]$/;
export const PWD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{12,48}$/;
export const STATE_REGEX = /^[A-Z]{2}$/;
export const PHONE_REGEX = /^\d{3}-\d{3}-\d{4}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const DASH_REGEX = /^\/dash(\/)?$/;
export const PROJECTS_REGEX = /^\/dash\/projects(\/)?$/;
export const CLIENTS_REGEX = /^\/dash\/clients(\/)?$/;
