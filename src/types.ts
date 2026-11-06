export type Role = "explorer" | "guardian" | "healer" | "tinkerer";

export const ROLES: Role[] = ["explorer", "guardian", "healer", "tinkerer"];

export interface RoleAvailability {
  role: Role;
  slots: number;
  taken: number;
  remaining: number;
}

/** GET /towns */
export interface TownSummary {
  id: number;
  name: string;
  current_day: number;
  max_citizens: number;
  started: boolean;
  citizens: number;
}

/** GET /towns/{id}/roles */
export interface TownRoles {
  town_id: number;
  max_citizens: number;
  citizens: number;
  started: boolean;
  roles: RoleAvailability[];
}
