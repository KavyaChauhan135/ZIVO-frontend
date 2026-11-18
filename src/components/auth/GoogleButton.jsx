import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { LoaderCircle } from "lucide-react";
import { GOOGLE_AUTH_URL } from "../../api/authApi";

const GoogleButton = ({ disabled = false }) => {
  const [redirecting, setRedirecting] = useState(false);

  // If the user returns with the browser's Back button, the page can be
  // restored from bfcache with the spinner still showing, so reset it.
  useEffect(() => {
    const onPageShow = (e) => {
      if (e.persisted) setRedirecting(false);
    };
    window.addEventListener("pageshow", onPageShow);
    return () => window.removeEventListener("pageshow", onPageShow);
  }, []);

  const handleClick = () => {
    setRedirecting(true);
    window.location.assign(GOOGLE_AUTH_URL);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={disabled || redirecting}
      aria-busy={redirecting}
      className="flex h-12 w-full items-center justify-center gap-3 rounded-lg border border-neutral-200 bg-white text-[15px] font-medium text-ink transition hover:border-neutral-300 hover:bg-neutral-50 hover:shadow-sm focus-visible:ring-4 focus-visible:ring-ink/10 focus-visible:outline-none active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {redirecting ? (
        <LoaderCircle
          className="size-5 animate-spin text-neutral-500"
          aria-hidden
        />
      ) : (
        <FcGoogle className="size-5" aria-hidden />
      )}
      {redirecting ? "Redirecting to Google…" : "Continue with Google"}
    </button>
  );
};

export default GoogleButton;
