import NextAuth, { DefaultSession, DefaultUser } from "next-auth";
import { User as CustomUser, UserRole } from "@/types"; // Adjust path if needed

declare module "next-auth" {
  interface User extends CustomUser {}

  interface Session extends DefaultSession {
    user: CustomUser;
  }
}

    

  
