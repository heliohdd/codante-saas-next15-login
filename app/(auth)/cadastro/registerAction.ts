"use server";

import db from "@/lib/db";
import { hashSync } from "bcrypt-ts";

export default async function registerAction(
  _prevState: string,
  formData: FormData
): Promise<{ message: string; success: boolean }> {
  const entries = Array.from(formData.entries());
  const data = Object.fromEntries(entries) as {
    email: string;
    name: string;
    password: string;
  };

  console.log("==== Server Action User ====");
  console.log(data);

  //   Se não tiver nome, email, senha retorna erro
  if (!data.name || !data.email || !data.password) {
    return {
      message: "Preencha todos os campos",
      success: false,
    };
  }

  //   Se um usuário já existe
  const user = await db.user.findUnique({ where: { email: data.email } });

  if (user) {
    return {
      message: "Este usuário já existe",
      success: false,
    };
  }
  //   Se não existir cria o usuário
  await db.user.create({
    data: {
      email: data.email,
      name: data.name,
      password: hashSync(data.password),
    },
  });

  return {
    message: "Usuário criado com sucesso",
    success: true,
  };
}
