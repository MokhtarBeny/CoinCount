import getAxiosInstance from "@/utils/axios/getAxiosInstance";
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("ACCOUNT : ", account)
      try {
        const axiosInstance = getAxiosInstance();
        const res = await axiosInstance.post("/social-signin", { user, account });
        const { token } = res.data;
        if (!token) {
          return false;
        }
        return `/auth?t=${encodeURIComponent(token)}`;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});
