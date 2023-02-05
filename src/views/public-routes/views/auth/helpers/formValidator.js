/* A regular expression that checks if the string is between 3 and 23
characters long and contains only letters, numbers, hyphens and
underscores. */
export const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
/* Checking for a password that is between 8 and 24 characters long and
contains at least one lowercase letter, one uppercase letter, one number,
and one special character. */
export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const REGISTER_URL = 'http://localhost:3500/register';
