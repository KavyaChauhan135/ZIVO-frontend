import { CircleAlert, CircleCheck, X } from "lucide-react";

const VARIANTS = {
  error: {
    Icon: CircleAlert,
    classes: "border-red-200 bg-red-50 text-red-800",
  },
  success: {
    Icon: CircleCheck,
    classes: "border-emerald-200 bg-emerald-50 text-emerald-800",
  },
};

const Alert = ({ type = "error", children, onDismiss }) => {
  const { Icon, classes } = VARIANTS[type] ?? VARIANTS.error;
  return (
    <div
      role={type === "error" ? "alert" : "status"}
      className={`mb-6 flex animate-fade-in items-start gap-3 rounded-lg border px-4 py-3 text-sm leading-relaxed ${classes}`}
    >
      <Icon className="mt-0.5 size-4 shrink-0" aria-hidden />
      <div className="flex-1">{children}</div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss message"
          className="-m-1 rounded p-1 opacity-60 transition hover:opacity-100"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
};

export default Alert;
