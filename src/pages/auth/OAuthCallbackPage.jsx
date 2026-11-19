import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { restoreSession } from "../../features/authThunks";
import { getErrorMessage } from "../../utils/apiError";

/**
 * The backend redirects here after Google sign-in with `?status=success` or
 * `?error=<message>`. On success the refresh-token cookie is already set, so we
 * exchange it for an access token and load the user.
 */
const OAuthCallbackPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  // Refresh tokens are single-use: never run the exchange twice.
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    const failWith = (message) =>
      navigate("/auth/login", {
        replace: true,
        state: { notice: { type: "error", message } },
      });

    const error = params.get("error");
    if (error || params.get("status") !== "success") {
      failWith(error || "Google sign-in failed. Please try again.");
      return;
    }

    const welcome = (user) => {
      const firstName = user?.name?.split(" ")[0];
      toast.success(firstName ? `Welcome, ${firstName}!` : "Signed in");
      navigate("/", { replace: true });
    };

    // The page-load session restore (main.jsx) has already exchanged the new
    // cookie, so normally the user is in the store by now.
    if (user) {
      welcome(user);
      return;
    }

    // Fallback: try once more (restoreSession is safe against overlapping calls).
    dispatch(restoreSession())
      .then(welcome)
      .catch((err) =>
        failWith(
          getErrorMessage(err, "We couldn't complete Google sign-in. Please try again."),
        ),
      );
  }, [params, navigate, dispatch, user]);

  return (
    <div
      className="flex flex-col items-center py-16 text-center"
      role="status"
      aria-live="polite"
    >
      <div className="relative mb-8 size-20">
        <span className="absolute inset-0 rounded-full border-2 border-neutral-200" />
        <span className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-ink" />
        <span className="absolute inset-0 flex items-center justify-center font-display text-3xl font-semibold">
          Z
        </span>
      </div>
      <h1 className="font-display text-3xl font-semibold">Signing you in</h1>
      <p className="mt-2 text-sm text-neutral-500">
        Securely connecting your Google account…
      </p>
    </div>
  );
};

export default OAuthCallbackPage;
