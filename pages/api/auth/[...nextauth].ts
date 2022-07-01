import NextAuth from 'next-auth/next';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../../utils/db';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: process.env.MAILJET_HOST,
        port: parseInt(process.env.MAILJET_PORT ?? '0'),
        auth: {
          user: process.env.MAILJET_API_KEY,
          pass: process.env.MAILJET_SECRET_KEY,
        },
      },
      from: process.env.MAILJET_FROM,
      maxAge: 60 * 10,
    }),
  ],
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/auth/login',
    verifyRequest: '/auth/verification',
    // error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 7,
  },
});
