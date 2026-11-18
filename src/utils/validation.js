// Mirrors the backend's express-validator rules (backend/src/validators/auth.validator.js).

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const PASSWORD_RULES = [
  { id: "length", label: "At least 8 characters", test: (v) => v.length >= 8 },
  { id: "upper", label: "One uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { id: "lower", label: "One lowercase letter", test: (v) => /[a-z]/.test(v) },
  { id: "number", label: "One number", test: (v) => /\d/.test(v) },
];

export const nameRules = {
  required: "Full name is required",
  validate: (value) => {
    const length = value.trim().length;
    if (length < 2) return "Name must be at least 2 characters";
    if (length > 50) return "Name must be at most 50 characters";
    return true;
  },
};

export const emailRules = {
  required: "Email is required",
  maxLength: { value: 254, message: "Email is too long" },
  validate: (value) =>
    EMAIL_PATTERN.test(value.trim()) || "Enter a valid email address",
};

export const loginPasswordRules = {
  required: "Password is required",
};

export const newPasswordRules = {
  required: "Password is required",
  maxLength: { value: 72, message: "Password must be at most 72 characters" },
  validate: (value) =>
    PASSWORD_RULES.every((rule) => rule.test(value)) ||
    "Use 8+ characters with an uppercase letter, a lowercase letter and a number",
};
