/** Turns an axios error into a message that is safe to show the user. */
export const getErrorMessage = (
  error,
  fallback = "Something went wrong. Please try again.",
) => {
  if (!error?.response) {
    return error?.code === "ECONNABORTED"
      ? "The request timed out. Please try again."
      : "Unable to reach the server. Check your connection and try again.";
  }
  return error.response.data?.message || fallback;
};

/**
 * Maps the backend's 422 `errors: [{ field, message }]` onto React Hook Form fields.
 * Returns true if at least one field error was applied.
 */
export const applyFieldErrors = (error, setError, fields) => {
  const fieldErrors = error?.response?.data?.errors;
  if (!Array.isArray(fieldErrors)) return false;

  let applied = false;
  fieldErrors.forEach(({ field, message }) => {
    if (fields.includes(field)) {
      setError(field, { type: "server", message }, { shouldFocus: !applied });
      applied = true;
    }
  });
  return applied;
};
