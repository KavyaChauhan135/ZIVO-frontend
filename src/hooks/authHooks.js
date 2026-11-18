import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  forgotPasswordApi,
  loginApi,
  registerApi,
  resetPasswordApi,
} from "../api/authApi";
import { setCredentials } from "../features/authSlice";

export const useLogin = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (res) => dispatch(setCredentials(res.data)),
  });
};

export const useRegister = () => {
  const dispatch = useDispatch();
  return useMutation({
    mutationFn: registerApi,
    onSuccess: (res) => dispatch(setCredentials(res.data)),
  });
};

export const useForgotPassword = () =>
  useMutation({ mutationFn: forgotPasswordApi });

export const useResetPassword = () =>
  useMutation({ mutationFn: resetPasswordApi });
