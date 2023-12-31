import { useState } from "react";
// @mui
import {
  Stack,
  IconButton,
  InputAdornment,
  TextField,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
// components

// ** Third Party Imports
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Iconify from "../../../components/iconify";
import { useAuth } from "../../../hooks/auth";
// ----------------------------------------------------------------------
const schema = yup.object().shape({
  email: yup
    .string()
    .email("กรุณากรอกชื่อผู้ใช้งานให้ถูกต้อง")
    .required("กรุณากรอกชื่อผู้ใช้งาน"),
  password: yup.string().required("กรุณากรอกรหัสผ่านผู้ใช้งาน").min(4),
});

const defaultValues = {
  password: "",
  email: "",
};

export default function LoginForm() {
  // ** Hooks
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    login({ email: data.email, password: data.password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <TextField
          name="email"
          label="Email"
          {...register("email")}
          error={!!errors.email}
          type="text"
          fullWidth
          autoComplete="off"
          helperText={errors.email ? errors.email.message : null}
        />
        <TextField
          name="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  <Iconify
                    icon={showPassword ? "eva:eye-fill" : "eva:eye-off-fill"}
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register("password")}
          error={!!errors.password}
          fullWidth
          autoComplete="off"
          helperText={errors.password ? errors.password.message : null}
        />
      </Stack>

      <Box sx={{ my: 2 }}>
        <LoadingButton fullWidth size="large" type="submit" variant="contained">
          Login
        </LoadingButton>
      </Box>
    </form>
  );
}
