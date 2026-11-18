import { useId, useState } from "react";
import { CircleAlert, Eye, EyeOff } from "lucide-react";

/**
 * Labelled input for React Hook Form. Spread `register(...)` into it:
 * React 19 passes `ref` as a normal prop, so it reaches the <input>.
 */
const FormField = ({
  label,
  icon: Icon,
  error,
  type = "text",
  labelAction,
  ...inputProps
}) => {
  const id = useId();
  const errorId = `${id}-error`;
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <label
          htmlFor={id}
          className="text-[11px] font-semibold tracking-[0.18em] text-neutral-600 uppercase"
        >
          {label}
        </label>
        {labelAction}
      </div>

      <div className="group relative">
        {Icon && (
          <Icon
            aria-hidden
            className={`pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 transition-colors ${
              error
                ? "text-red-500"
                : "text-neutral-400 group-focus-within:text-ink"
            }`}
          />
        )}
        <input
          id={id}
          type={isPassword && visible ? "text" : type}
          aria-invalid={error ? "true" : "false"}
          aria-describedby={error ? errorId : undefined}
          className={`h-12 w-full rounded-lg border bg-white text-[15px] text-ink outline-none transition placeholder:text-neutral-400 focus:ring-4 disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-70 ${
            Icon ? "pl-11" : "pl-4"
          } ${isPassword ? "pr-12" : "pr-4"} ${
            error
              ? "border-red-400 focus:border-red-500 focus:ring-red-500/10"
              : "border-neutral-200 hover:border-neutral-300 focus:border-ink focus:ring-ink/5"
          }`}
          {...inputProps}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            aria-label={visible ? "Hide password" : "Show password"}
            aria-controls={id}
            className="absolute top-1/2 right-2 -translate-y-1/2 rounded-md p-2 text-neutral-400 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-ink disabled:opacity-50"
          >
            {visible ? (
              <EyeOff className="size-4.5" />
            ) : (
              <Eye className="size-4.5" />
            )}
          </button>
        )}
      </div>

      {error && (
        <p
          id={errorId}
          className="flex animate-fade-in items-start gap-1.5 text-[13px] text-red-600"
        >
          <CircleAlert className="mt-0.5 size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  );
};

export default FormField;
