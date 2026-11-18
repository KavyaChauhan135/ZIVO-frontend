import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "react-toastify";
import { getMeApi, refreshApi } from "../../api/authApi";
import { setCredentials } from "../../features/authSlice";
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

    (async () => {
      try {
        const { data: tokens } = await refreshApi();
        const { data: me } = await getMeApi(tokens.accessToken);
        dispatch(
          setCredentials({ user: me.user, accessToken: tokens.accessToken }),
        );
        const firstName = me.user?.name?.split(" ")[0];
        toast.success(firstName ? `Welcome, ${firstName}!` : "Signed in");
        navigate("/", { replace: true });
      } catch (err) {
        failWith(
          getErrorMessage(err, "We couldn't complete Google sign-in. Please try again."),
        );
      }
    })();
  }, [params, navigate, dispatch]);

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
