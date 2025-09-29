import User from "@/models/user";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const { email, password } = credentials;
        try {
          await connectDB();
        } catch (error) {
          throw new Error("Error in connecting to DB!");
        }
        if (!email || !password) {
          throw new Error("Invalid Data!");
        }
        const user = await User.findOne({ email: email });
        if (!user) {
          throw new Error("User doesn't exist!");
        }
        const isValid = await verifyPassword(password, user.password);
        if (!isValid) throw new Error("Username or password is incorrect!");

        return { email };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // وقتی کاربر لاگین می‌کنه، user وجود داره و می‌تونیم اطلاعات رو به token اضافه کنیم
      if (user) {
        token.email = user.email;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      // اطلاعات توکن رو به session اضافه کن که سمت کلاینت در دسترس باشه
      session.user = {
        email: token.email,
        id: token.id,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
