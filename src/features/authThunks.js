import { getMeApi, refreshApi } from "../api/authApi";
import { clearCredentials, setCredentials } from "./authSlice";

// Refresh tokens are single-use (rotated on every call), so two concurrent
// refreshes would send the same cookie and the backend would treat the second
// as token reuse and revoke every session. Share one in-flight request.
let inFlight = null;

/**
 * Restores the session after a page load: exchanges the refresh-token cookie
 * for a new access token, then loads the user from GET /auth/me.
 * Resolves with the user; rejects (and clears credentials) if there is no
 * valid session.
 */
export const restoreSession = () => (dispatch) => {
  if (!inFlight) {
    inFlight = (async () => {
      try {
        const { data: tokens } = await refreshApi();
        const { data: me } = await getMeApi(tokens.accessToken);
        dispatch(
          setCredentials({ user: me.user, accessToken: tokens.accessToken }),
        );
        return me.user;
      } catch (err) {
        dispatch(clearCredentials());
        throw err;
      } finally {
        inFlight = null;
      }
    })();
  }
  return inFlight;
};
