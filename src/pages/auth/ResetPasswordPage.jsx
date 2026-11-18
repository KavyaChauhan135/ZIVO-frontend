import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router";
import { KeyRound, Lock } from "lucide-react";
import { toast } from "react-toastify";
import Alert from "../../components/auth/Alert";
import AuthHeader from "../../components/auth/AuthHeader";
import FormField from "../../components/auth/FormField";
import PasswordChecklist from "../../components/auth/PasswordChecklist";
import SubmitButton from "../../components/auth/SubmitButton";
import { useResetPassword } from "../../hooks/authHooks";
import { applyFieldErrors, getErrorMessage } from "../../utils/apiError";
import { newPasswordRules } from "../../utils/validation";

// Same format the backend accepts (64 hex characters).
const TOKEN_PATTERN = /^[a-f0-9]{64}$/i;

const InvalidLink = () => (
  <div className="text-center">
    <div className="mx-auto mb-8 flex size-16 items-center justify-center rounded-full border border-neutral-200 bg-white">
      <KeyRound className="size-7 text-neutral-500" aria-hidden />
    </div>
    <AuthHeader
      eyebrow="Link expired"
      title="This link isn't valid"
      subtitle="Password reset links can only be used once and expire after a short time. Request a new one to continue."
    />
    <Link
      to="/auth/forgot-password"
      className="flex h-12 w-full items-center justify-center rounded-lg bg-ink text-[13px] font-semibold tracking-[0.18em] text-white uppercase transition hover:bg-neutral-800"
    >
      Request a new link
    </Link>
    <Link
      to="/auth/login"
      className="mt-6 inline-block text-sm text-neutral-500 underline-offset-4 hover:text-ink hover:underline"
    >
      Back to sign in
    </Link>
  </div>
);

const ResetPasswordPage = () => {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const { mutate: resetPassword, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    setError,
    getValues,
    control,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: { password: "", confirmPassword: "" },
  });
  const password = useWatch({ control, name: "password" });

  if (!TOKEN_PATTERN.test(token)) return <InvalidLink />;

  const onSubmit = ({ password }) => {
    setServerError(null);
    resetPassword(
      { token, password },
      {
        onSuccess: (res) => {
          toast.success("Password updated");
          navigate("/auth/login", {
            replace: true,
            state: { notice: { type: "success", message: res.message } },
          });
        },
        onError: (err) => {
          if (!applyFieldErrors(err, setError, ["password"])) {
            setServerError(
              getErrorMessage(err, "Unable to reset your password. Please try again."),
            );
          }
        },
      },
    );
  };

  return (
    <>
      <AuthHeader
        eyebrow="Account recovery"
        title="Set a new password"
        subtitle="Choose a strong password you haven't used before. You'll be signed out of all devices."
      />

      {serverError && (
        <Alert type="error" onDismiss={() => setServerError(null)}>
          {serverError}{" "}
          <Link
            to="/auth/forgot-password"
            className="font-semibold underline underline-offset-2"
          >
            Request a new link
          </Link>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset disabled={isPending} className="space-y-5">
          <div className="space-y-3">
            <FormField
              label="New password"
              icon={Lock}
              type="password"
              autoComplete="new-password"
              placeholder="Create a strong password"
              error={errors.password?.message}
              {...register("password", {
                ...newPasswordRules,
                deps: "confirmPassword",
              })}
            />
            {password && <PasswordChecklist value={password} />}
          </div>
          <FormField
            label="Confirm password"
            icon={Lock}
            type="password"
            autoComplete="new-password"
            placeholder="Re-enter your new password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === getValues("password") || "Passwords do not match",
            })}
          />
          <div className="pt-2">
            <SubmitButton loading={isPending} loadingText="Updating password…">
              Update password
            </SubmitButton>
          </div>
        </fieldset>
      </form>
    </>
  );
};

export default ResetPasswordPage;
