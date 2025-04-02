export type UserRole = "user"|"admin";

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    createdAt: Date;
}

export interface UserSession {
    id: string;
    email: string;
    name: string;
    role: UserRole;
}