"use server";

import { CredentialsSignin } from "./../../../node_modules/@auth/core/src/errors";

import { signIn } from "@/auth";

export default async function loginAction(_prevState: any, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: true,
      redirectTo: "/dashboard",
    });
    return { success: true };
  } catch (e) {
    if (e.type === "CredentialsSignin") {
      return { success: false, message: "Dados de login incorretors." };
    }

    return { success: false, message: "Ops, algum erro aconteceu!" };
  }
}
