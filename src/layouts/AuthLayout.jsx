import { Link, Outlet, useLocation } from "react-router";
import { ArrowLeft } from "lucide-react";
import BrandPanel from "../components/auth/BrandPanel";
import Logo from "../components/Logo";

const AuthLayout = () => {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-svh bg-bone text-ink">
      <BrandPanel />

      <main className="flex min-h-svh flex-1 flex-col">
        <div className="flex items-center justify-between px-5 py-5 sm:px-10 lg:justify-end lg:py-8">
          <Logo className="lg:hidden" />
          <Link
            to="/"
            className="group inline-flex items-center gap-1.5 text-sm text-neutral-500 transition-colors hover:text-ink"
          >
            <ArrowLeft
              className="size-4 transition-transform group-hover:-translate-x-0.5"
              aria-hidden
            />
            Back to store
          </Link>
        </div>

        <div className="flex flex-1 items-center justify-center px-5 pb-10 sm:px-10">
          {/* key replays the entrance animation when switching between auth pages */}
          <div key={pathname} className="w-full max-w-105 animate-fade-up">
            <Outlet />
          </div>
        </div>

        <p className="px-5 pb-6 text-center text-xs text-neutral-400 sm:px-10 lg:hidden">
          © {new Date().getFullYear()} ZIVO – Men&apos;s Fashion
        </p>
      </main>
    </div>
  );
};

export default AuthLayout;
