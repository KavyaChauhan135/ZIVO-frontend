import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { Lock, Mail, User } from "lucide-react";
import { toast } from "react-toastify";
import Alert from "../../components/auth/Alert";
import AuthHeader from "../../components/auth/AuthHeader";
import Divider from "../../components/auth/Divider";
import FormField from "../../components/auth/FormField";
import GoogleButton from "../../components/auth/GoogleButton";
import PasswordChecklist from "../../components/auth/PasswordChecklist";
import SubmitButton from "../../components/auth/SubmitButton";
import { useRegister } from "../../hooks/authHooks";
import { applyFieldErrors, getErrorMessage } from "../../utils/apiError";
import {
  emailRules,
  nameRules,
  newPasswordRules,
} from "../../utils/validation";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState(null);
  const { mutate: registerUser, isPending } = useRegister();

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: { name: "", email: "", password: "" },
  });
  const password = useWatch({ control, name: "password" });

  const onSubmit = ({ name, email, password }) => {
    setServerError(null);
    registerUser(
      { name: name.trim(), email: email.trim(), password },
      {
        onSuccess: (res) => {
          const firstName = res.data.user?.name?.split(" ")[0];
          toast.success(
            firstName ? `Welcome to ZIVO, ${firstName}!` : res.message,
          );
          navigate("/", { replace: true });
        },
        onError: (err) => {
          if (err.response?.status === 409) {
            setError("email", { type: "server", message: err.response.data.message }, { shouldFocus: true });
            return;
          }
          if (!applyFieldErrors(err, setError, ["name", "email", "password"])) {
            setServerError(
              getErrorMessage(err, "Unable to create your account. Please try again."),
            );
          }
        },
      },
    );
  };

  return (
    <>
      <AuthHeader
        eyebrow="Join ZIVO"
        title="Create your account"
        subtitle="Become a member for a more personal way to shop."
      />

      {serverError && (
        <Alert type="error" onDismiss={() => setServerError(null)}>
          {serverError}
        </Alert>
      )}

      <GoogleButton disabled={isPending} />
      <Divider>or sign up with email</Divider>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <fieldset disabled={isPending} className="space-y-5">
          <FormField
            label="Full name"
            icon={User}
            autoComplete="name"
            placeholder="Your full name"
            error={errors.name?.message}
            {...register("name", nameRules)}
          />
          <FormField
            label="Email address"
            icon={Mail}
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register("email", emailRules)}
          />
          <div className="space-y-3">
            <FormField
              label="Password"
              icon={Lock}
              type="password"
              autoComplete="new-password"
              placeholder="Create a strong password"
              error={errors.password?.message}
              {...register("password", newPasswordRules)}
            />
            {password && <PasswordChecklist value={password} />}
          </div>
          <div className="pt-2">
            <SubmitButton loading={isPending} loadingText="Creating account…">
              Create account
            </SubmitButton>
          </div>
        </fieldset>
      </form>

      <p className="mt-6 text-center text-xs leading-relaxed text-neutral-400">
        By creating an account, you agree to ZIVO&apos;s Terms of Service and
        Privacy Policy.
      </p>

      <p className="mt-6 text-center text-sm text-neutral-500">
        Already a member?{" "}
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

export default RegisterPage;
