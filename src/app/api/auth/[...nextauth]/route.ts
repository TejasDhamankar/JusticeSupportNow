import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
console.log("--- NextAuth Route Loading ---");
console.log("ADMIN_EMAIL:", process.env.ADMIN_EMAIL);
console.log("ADMIN_PASSWORD:", !!process.env.ADMIN_PASSWORD); // (hidden for security)
const adminUsers = [
  {
    id: "1",
    name: "Admin User",
    email: process.env.ADMIN_EMAIL,
    password: process.env.ADMIN_PASSWORD,
  },
];

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = adminUsers.find(user => user.email === credentials.email);
        
        // --- ADD THIS DEBUG LOG ---
      console.log("Authorizing user...");
      console.log("Form email:", credentials.email);
      console.log("Form password:", credentials.password);
      console.log("Env user found:", user ? user.email : 'No user found');
      console.log("Env password:", user?.password);
      console.log("Password match?", user?.password === credentials.password);
      // -------------------------

        if (user && user.password === credentials.password) {
          return { id: user.id, name: user.name, email: user.email };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
});

export { handler as GET, handler as POST };
