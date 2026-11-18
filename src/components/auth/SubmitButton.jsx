import { ArrowRight, LoaderCircle } from "lucide-react";

const SubmitButton = ({ loading, loadingText = "Please wait…", children }) => (
  <button
    type="submit"
    disabled={loading}
    aria-busy={loading}
    className="group relative flex h-12 w-full items-center justify-center gap-2.5 overflow-hidden rounded-lg bg-ink px-6 text-[13px] font-semibold tracking-[0.18em] text-white uppercase shadow-[0_8px_24px_-12px_rgba(14,14,14,0.6)] transition hover:bg-neutral-800 focus-visible:ring-4 focus-visible:ring-ink/20 focus-visible:outline-none active:scale-[0.99] disabled:cursor-wait disabled:opacity-85"
  >
    {/* hover sheen */}
    <span
      aria-hidden
      className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-linear-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[300%]"
    />
    {loading ? (
      <>
        <LoaderCircle className="size-4.5 animate-spin" aria-hidden />
        <span>{loadingText}</span>
      </>
    ) : (
      <>
        <span>{children}</span>
        <ArrowRight
          className="size-4 transition-transform group-hover:translate-x-1"
          aria-hidden
        />
      </>
    )}
  </button>
);

export default SubmitButton;
