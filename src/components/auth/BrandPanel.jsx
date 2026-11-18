import { Gem, Package, Sparkles } from "lucide-react";
import Logo from "../Logo";

const PERKS = [
  { icon: Sparkles, text: "Early access to new collections" },
  { icon: Gem, text: "Your wishlist and sizes, saved" },
  { icon: Package, text: "Track every order in one place" },
];

const BrandPanel = () => (
  <aside className="relative hidden overflow-hidden bg-ink text-bone lg:flex lg:w-[46%] xl:w-1/2">
    {/* Decorative layers */}
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-size-[72px_72px]"
    />
    <div
      aria-hidden
      className="absolute -top-48 -left-40 size-136 rounded-full bg-bronze/25 blur-[120px]"
    />
    <div
      aria-hidden
      className="absolute -right-32 -bottom-40 size-112 rounded-full bg-bronze-light/10 blur-[110px]"
    />
    <span
      aria-hidden
      className="pointer-events-none absolute -bottom-16 -left-6 font-display text-[19rem] leading-none font-semibold text-transparent select-none [-webkit-text-stroke:1px_rgba(255,255,255,0.07)] xl:text-[23rem]"
    >
      ZIVO
    </span>

    <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">
      <Logo tone="light" />

      <div className="max-w-md animate-fade-up">
        <p className="mb-6 flex items-center gap-3 text-[11px] font-medium tracking-[0.35em] text-bronze-light uppercase">
          <span className="h-px w-10 bg-bronze-light/70" />
          The Modern Wardrobe
        </p>
        <h2 className="font-display text-5xl leading-[1.05] font-medium xl:text-6xl">
          Dressed with <em className="text-bronze-light">intent.</em>
        </h2>
        <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-bone/65">
          Considered fits, refined fabrics and timeless essentials — built for
          the way you live.
        </p>

        <ul className="mt-10 space-y-4">
          {PERKS.map(({ icon: Icon, text }) => (
            <li
              key={text}
              className="flex items-center gap-4 text-sm text-bone/80"
            >
              <span className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
                <Icon className="size-4 text-bronze-light" aria-hidden />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </div>

      <p className="text-xs tracking-wide text-bone/40">
        © {new Date().getFullYear()} ZIVO – Men&apos;s Fashion
      </p>
    </div>
  </aside>
);

export default BrandPanel;
