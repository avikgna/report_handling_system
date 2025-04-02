import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from "@prisma/client";
import { User as CustomUser, UserRole } from "@/types/user";



const prisma = new PrismaClient();

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "johndoe@email.com"},
                name: { label: "Name", type: "text", placeholder: "justinsmith"},
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.name) {
                    return null;
                }

                const sysUser = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if(sysUser && sysUser.name === credentials.name && sysUser.email === credentials.email){
                    return {
                        id: sysUser.id.toString(),
                        email: sysUser.email,
                        name: sysUser.name,
                        role: sysUser.role,
                    };
                }

                return null;

            },
        }),
    ],
    callbacks: {
        async jwt( { token, user }) {

            const customUser = user as CustomUser;

            if (user) {
    
                token.id = customUser.id;
                token.name = customUser.name;
                token.email = customUser.email;
                token.role = customUser.role;

                console.log(token.id)
                console.log(token.name)
                console.log(token.email)
                console.log(token.role)

            }
            return token;
            
        },

        async session({ session, token }) {
            if(token) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.role = token.role as string;

                console.log(session.user.id)
                console.log(session.user.email)
                console.log(session.user.name)
                console.log(session.user.role)

            }

            return session;
        },
    }, 

    secret: process.env.NEXTAUTH_SECRET,
};