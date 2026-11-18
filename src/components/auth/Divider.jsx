const Divider = ({ children }) => (
  <div className="my-7 flex items-center gap-4" role="separator">
    <span className="h-px flex-1 bg-neutral-200" />
    <span className="text-[11px] font-medium tracking-[0.22em] text-neutral-400 uppercase">
      {children}
    </span>
    <span className="h-px flex-1 bg-neutral-200" />
  </div>
);

export default Divider;
