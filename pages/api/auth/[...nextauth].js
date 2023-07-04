import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;
      session.user.id = token.id;
      session.foo = token.foo;
      console.log('session', session, token, user);

      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('JWT', token, user, account, profile, isNewUser);
      token.foo = 'BAZ';
      return token;
    },
  },
};

export default NextAuth(authOptions);
