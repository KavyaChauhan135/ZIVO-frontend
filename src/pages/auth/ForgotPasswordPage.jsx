import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { ArrowLeft, LoaderCircle, Mail, MailCheck } from "lucide-react";
import { toast } from "react-toastify";
import Alert from "../../components/auth/Alert";
import AuthHeader from "../../components/auth/AuthHeader";
import FormField from "../../components/auth/FormField";
import SubmitButton from "../../components/auth/SubmitButton";
import { useForgotPassword } from "../../hooks/authHooks";
import { applyFieldErrors, getErrorMessage } from "../../utils/apiError";
import { emailRules } from "../../utils/validation";

const BackToLogin = () => (
  <Link
    to="/auth/login"
    className="group inline-flex items-center gap-2 text-sm font-medium text-neutral-500 transition-colors hover:text-ink"
  >
    <ArrowLeft
      className="size-4 transition-transform group-hover:-translate-x-0.5"
      aria-hidden
    />
    Back to sign in
  </Link>
);

const ForgotPasswordPage = () => {
  const [sent, setSent] = useState(null); // { email, message }
  const [serverError, setServerError] = useState(null);
  const { mutate: requestReset, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({ mode: "onTouched", defaultValues: { email: "" } });

  const sendLink = (email, { isResend = false } = {}) => {
    setServerError(null);
    requestReset(
      { email },
      {
        onSuccess: (res) => {
          setSent({ email, message: res.message });
          if (isResend) toast.success("We've sent another reset link.");
        },
        onError: (err) => {
          if (isResend || !applyFieldErrors(err, setError, ["email"])) {
            setServerError(
              getErrorMessage(err, "Unable to send the reset link. Please try again."),
            );
          }
        },
      },
    );
  };

  if (sent) {
    return (
      <div className="text-center">
        <div className="mx-auto mb-8 flex size-16 items-center justify-center rounded-full bg-ink text-bone shadow-[0_12px_30px_-12px_rgba(14,14,14,0.6)]">
          <MailCheck className="size-7" aria-hidden />
        </div>
        <AuthHeader
          eyebrow="Email sent"
          title="Check your inbox"
          subtitle={sent.message}
        />
        <p className="-mt-4 mb-8 text-sm text-neutral-500">
          Sent to <span className="font-semibold text-ink">{sent.email}</span>
        </p>

        {serverError && (
          <div className="text-left">
            <Alert type="error" onDismiss={() => setServerError(null)}>
              {serverError}
            </Alert>
          </div>
        )}

        <Link
          to="/auth/login"
          className="flex h-12 w-full items-center justify-center rounded-lg bg-ink text-[13px] font-semibold tracking-[0.18em] text-white uppercase transition hover:bg-neutral-800"
        >
          Back to sign in
        </Link>

        <p className="mt-6 text-sm text-neutral-500">
          Didn&apos;t get the email? Check your spam folder or{" "}
          <button
            type="button"
            onClick={() => sendLink(sent.email, { isResend: true })}
            disabled={isPending}
            className="inline-flex items-center gap-1.5 font-semibold text-ink underline decoration-bronze/60 underline-offset-4 hover:decoration-ink disabled:cursor-wait disabled:opacity-60"
          >
            {isPending && <LoaderCircle className="size-3.5 animate-spin" aria-hidden />}
            {isPending ? "resending…" : "resend it"}
          </button>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(null);
            setServerError(null);
          }}
          className="mt-3 text-sm text-neutral-500 underline-offset-4 hover:text-ink hover:underline"
        >
          Use a different email
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <BackToLogin />
      </div>
      <AuthHeader
        eyebrow="Account recovery"
        title="Forgot your password?"
        subtitle="Enter the email linked to your account and we'll send you a secure link to reset it."
      />

      {serverError && (
        <Alert type="error" onDismiss={() => setServerError(null)}>
          {serverError}
        </Alert>
      )}

      <form
        onSubmit={handleSubmit(({ email }) => sendLink(email.trim()))}
        noValidate
      >
        <fieldset disabled={isPending} className="space-y-6">
          <FormField
            label="Email address"
            icon={Mail}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email", emailRules)}
          />
          <SubmitButton loading={isPending} loadingText="Sending link…">
            Send reset link
          </SubmitButton>
        </fieldset>
      </form>

      <p className="mt-8 text-center text-sm text-neutral-500">
        Remembered it?{" "}
        <Link
          to="/auth/login"
          className="font-semibold text-ink underline decoration-bronze/60 underline-offset-4 transition-colors hover:decoration-ink"
        >
          Sign in
        </Link>
      </p>
    </>
  );
};

export default ForgotPasswordPage;
