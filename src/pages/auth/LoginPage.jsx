import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { Lock, Mail } from "lucide-react";
import { toast } from "react-toastify";
import Alert from "../../components/auth/Alert";
import AuthHeader from "../../components/auth/AuthHeader";
import Divider from "../../components/auth/Divider";
import FormField from "../../components/auth/FormField";
import GoogleButton from "../../components/auth/GoogleButton";
import SubmitButton from "../../components/auth/SubmitButton";
import { useLogin } from "../../hooks/authHooks";
import { applyFieldErrors, getErrorMessage } from "../../utils/apiError";
import { emailRules, loginPasswordRules } from "../../utils/validation";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // A notice can be handed over by another page (password reset, failed Google sign-in).
  const [banner, setBanner] = useState(location.state?.notice ?? null);
  const { mutate: login, isPending } = useLogin();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: { email: location.state?.email ?? "", password: "" },
  });

  const onSubmit = ({ email, password }) => {
    setBanner(null);
    login(
      { email: email.trim(), password },
      {
        onSuccess: (res) => {
          const firstName = res.data.user?.name?.split(" ")[0];
          toast.success(firstName ? `Welcome back, ${firstName}!` : res.message);
          navigate("/", { replace: true });
        },
        onError: (err) => {
          if (!applyFieldErrors(err, setError, ["email", "password"])) {
            setBanner({
              type: "error",
              message: getErrorMessage(err, "Unable to sign in. Please try again."),
            });
          }
        },
      },
    );
  };

  return (
    <>
      <AuthHeader
        eyebrow="Welcome back"
        title="Sign in to ZIVO"
        subtitle="Pick up right where you left off."
      />

      {banner && (
        <Alert type={banner.type} onDismiss={() => setBanner(null)}>
          {banner.message}
        </Alert>
      )}

      <GoogleButton disabled={isPending} />
      <Divider>or sign in with email</Divider>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset disabled={isPending} className="space-y-5">
          <FormField
            label="Email address"
            icon={Mail}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email", emailRules)}
          />
          <FormField
            label="Password"
            icon={Lock}
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            error={errors.password?.message}
            labelAction={
              <Link
                to="/auth/forgot-password"
                className="text-xs font-medium text-neutral-500 underline-offset-4 transition-colors hover:text-ink hover:underline"
              >
                Forgot password?
              </Link>
            }
            {...register("password", loginPasswordRules)}
          />
          <div className="pt-2">
            <SubmitButton loading={isPending} loadingText="Signing in…">
              Sign in
            </SubmitButton>
          </div>
        </fieldset>
      </form>

      <p className="mt-8 text-center text-sm text-neutral-500">
        New to ZIVO?{" "}
        <Link
          to="/auth/register"
          className="font-semibold text-ink underline decoration-bronze/60 underline-offset-4 transition-colors hover:decoration-ink"
        >
          Create an account
        </Link>
      </p>
    </>
  );
};

export default LoginPage;
