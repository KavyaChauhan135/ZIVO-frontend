import { Check } from "lucide-react";
import { PASSWORD_RULES } from "../../utils/validation";

const STRENGTH = [
  { label: "Too weak", bar: "bg-red-500" },
  { label: "Weak", bar: "bg-red-500" },
  { label: "Fair", bar: "bg-amber-500" },
  { label: "Good", bar: "bg-lime-500" },
  { label: "Strong", bar: "bg-emerald-600" },
];

const PasswordChecklist = ({ value = "" }) => {
  const results = PASSWORD_RULES.map((rule) => ({
    ...rule,
    ok: rule.test(value),
  }));
  const passed = results.filter((r) => r.ok).length;
  const strength = STRENGTH[passed];

  return (
    <div className="animate-fade-in space-y-3 pt-1">
      <div className="flex items-center gap-3">
        <div className="flex flex-1 gap-1.5" aria-hidden>
          {results.map((r, i) => (
            <span
              key={r.id}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i < passed ? strength.bar : "bg-neutral-200"
              }`}
            />
          ))}
        </div>
        <span className="w-16 text-right text-xs font-medium text-neutral-500">
          {strength.label}
        </span>
      </div>
      <ul className="grid grid-cols-1 gap-x-4 gap-y-1.5 sm:grid-cols-2">
        {results.map((r) => (
          <li
            key={r.id}
            className={`flex items-center gap-2 text-xs transition-colors ${
              r.ok ? "text-emerald-700" : "text-neutral-500"
            }`}
          >
            {r.ok ? (
              <Check className="size-3.5" aria-hidden />
            ) : (
              <span
                className="mx-0.75 size-2 rounded-full border border-neutral-300"
                aria-hidden
              />
            )}
            <span>
              {r.label}
              <span className="sr-only">{r.ok ? " (met)" : " (not met)"}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PasswordChecklist;
