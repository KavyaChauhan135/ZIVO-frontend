const AuthHeader = ({ eyebrow, title, subtitle }) => (
  <header className="mb-8">
    {eyebrow && (
      <p className="mb-3 text-[11px] font-semibold tracking-[0.3em] text-bronze uppercase">
        {eyebrow}
      </p>
    )}
    <h1 className="font-display text-4xl leading-tight font-semibold sm:text-[2.75rem]">
      {title}
    </h1>
    {subtitle && (
      <p className="mt-3 text-[15px] leading-relaxed text-neutral-500">
        {subtitle}
      </p>
    )}
  </header>
);

export default AuthHeader;
