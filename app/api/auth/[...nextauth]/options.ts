import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaClient } from "@prisma/client";
import { User as CustomUser } from "@/types/user";
import { z } from "zod";

/*Setting the parameters for credentials sign in and role based access control*/

const prisma = new PrismaClient();

const credentialsSchema = z.object({
    email: z.string().email("Invalid email"),
    name: z.string().min(1, "Please fill in a username"),
});

async function validateUser(email: string, name: string) {
    try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) throw new Error("User does not exist");
    if(user.name !== name) throw new Error("Invalid username");

    return {
        
            id: user.id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
       
    };
} catch(error) {
    console.error("Error authenticating user:", error);
    return null;
    }

}

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "johndoe@email.com"},
                name: { label: "Name", type: "text", placeholder: "justinsmith"},
            },
            async authorize(credentials) {
                if(!credentials) {
                    console.error("No credentials");
                    return null;
                }
                try {
                    const {email, name} = credentialsSchema.parse(credentials);
                    return await validateUser(email, name);
                } catch(error) {
                    console.error("Error authorsing user");
                    return null;
                }
             
                },
        }),
    ],
    callbacks: {
        async jwt( { token, user }) {

            if (user) {
                const customUser = user as CustomUser;
    
                token.id = customUser.id;
                token.name = customUser.name;
                token.email = customUser.email;
                token.role = customUser.role;

            }
            return token;
            
        },

        async session({ session, token }) {
            if(token) {
                session.user.id = token.id as string;
                session.user.email = token.email as string;
                session.user.name = token.name as string;
                session.user.role = token.role as string;

            }

            return session;
        },
    }, 

    secret: process.env.NEXTAUTH_SECRET,
};