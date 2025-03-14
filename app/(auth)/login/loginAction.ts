"use server";

import { signIn } from "@/auth";

export default async function loginAction(formData: FormData) {
  await signIn("credentials", formData);
}
