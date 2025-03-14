import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log(credentials);

        // lógica de autenticação
        // se não autenticado retorna null
        // se autenticado retorna user
        return {
          name: "Hélio",
          email: "helio@teste.com",
          password: "123456",
        };
      },
    }),
  ],
});
