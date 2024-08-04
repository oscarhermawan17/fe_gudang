import { LoginPayload, LoginResponse } from "@/utils/api/auth";
import { ReactNode } from "react";

export type Role = 'owner' | 'adminInventory' | 'cashier'

export interface User {
	username: string;
	role: Role;
	token?: string;
	navigateTo?: string;
}
  
export interface AuthContextType {
	roles: Role[];
	token: string;
	login: (values: LoginPayload) => Promise<LoginResponse | undefined>;
	logout: () => void;
}

export interface AuthProviderProps {
	children: ReactNode;
}