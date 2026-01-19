import { Request, Response, NextFunction } from "express";
import { UserRole } from "../models/User";
export interface AuthPayload {
    sub: string;
    role: UserRole;
}
export interface AuthenticatedRequest extends Request {
    user?: AuthPayload;
}
export declare function authMiddleware(req: AuthenticatedRequest, res: Response, next: NextFunction): void | Response<any, Record<string, any>>;
export declare function requireRole(roles: UserRole[]): (req: AuthenticatedRequest, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
//# sourceMappingURL=auth.d.ts.map