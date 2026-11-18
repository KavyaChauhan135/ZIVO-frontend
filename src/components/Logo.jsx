import { Link } from "react-router";

const Logo = ({ tone = "dark", className = "" }) => {
  const light = tone === "light";
  return (
    <Link
      to="/"
      aria-label="ZIVO – Men's Fashion, home"
      className={`inline-flex flex-col leading-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze ${className}`}
    >
      <span
        className={`font-display text-[28px] font-semibold tracking-[0.32em] ${light ? "text-bone" : "text-ink"}`}
      >
        ZIVO
      </span>
      <span
        className={`mt-1.5 text-[9px] font-medium uppercase tracking-[0.42em] ${light ? "text-bone/55" : "text-neutral-500"}`}
      >
        Men&apos;s Fashion
      </span>
    </Link>
  );
};

export default Logo;
