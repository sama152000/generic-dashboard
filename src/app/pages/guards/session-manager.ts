// import { TokenData, RouteData, RoleResult, Action, RoleData } from './models';
// import { User } from 'oidc-client';
// export class SessionManager {
//   /* private Fields */
//   private static instance: SessionManager;
//   public appRole: RoleResult = {};
//   /* public Fields */
//   public tokenData: TokenData | null = null;
//   public IsLoggedIn = false;

//   public static Current(): SessionManager {
//     if (this.instance == null) {
//       this.instance = new SessionManager();
//       this.instance.CheckToken();
//     }
//     return this.instance;
//   }
//   public GetToken(): TokenData | null {
//     if (this.tokenData && this.tokenData.IsExpired()) {
//       return null;
//     }

//     return this.tokenData;
//   }

//   public GetRole(): RoleData | null {
//     const rolesData = sessionStorage.getItem('Roles');
//     if (rolesData) {
//       const roles = JSON.parse(rolesData);
//       if (roles && roles.length > 0) {
//         this.appRole = roles[0];
//         const role = Object.assign(new RoleData(), {
//           roleName: this.appRole?.RoleName,
//           roleNameAr: this.appRole?.RoleNameAr,
//           roleId: this.appRole?.RoleId,
//           appId: this.appRole?.AppId,
//           roleCode: this.appRole?.RoleCode
//         });
//         return role;
//       }
//     }
//     return null;
//   }

//   public StartSession(user?: User) {
//     if (!user) {
//       throw new Error('User is undefined in StartSession');
//     }
//     // this.MapRoles(user.profile.roles);
//     this.MapRoles(user.profile['roles']);
//     this.tokenData = Object.assign(new TokenData(), {
//       Token: user.access_token,
//       Expiry: user.expires_in
//     });
//     sessionStorage.setItem('TokenData', JSON.stringify(this.tokenData));
//     sessionStorage.setItem('token', user.access_token);
//   }

//   public SetPermissions(permissions: any[]): void {
//     this.MapPermissions(permissions);
//   }

//   public EndSession() {
//     this.tokenData = null;
//   }
//   /**
//    * Get Permission
//    * @param id
//    * @returns
//    */
//   public GetPermission(id: string | Action): string | undefined {
//     const permissionsData = sessionStorage.getItem('Permissions');
//     if (!permissionsData) {
//       return undefined;
//     }
//     const permissionList = JSON.parse(permissionsData) as any;
//     const permission = permissionList.permissions.find((x: any) => x === id);
//     return permission;

//   }
//   /**
//    * Get Page Permissions
//    * @param page
//    * @returns
//    */
//   public GetPagePermission(page: string): string[] {
//     const permissionsData = sessionStorage.getItem('Permissions');
//     if (!permissionsData) {
//       return [];
//     }
//     const permissionList = JSON.parse(permissionsData) as any;
//     const permissions = permissionList.permissions.filter((x: any) => x.includes(page));
//     return permissions;
//   }
//   /**
//    * Check Is Authorize Permission
//    */
//   public IsAuthorized(data: RouteData): boolean {
//     if (data.IsAnonymous) {
//       return true;
//     }
//     const p = this.GetPermission(data.permission);
//     if (p) {
//       return true;
//     }
//     return false;
//   }
//   /**
//    * Check Is Admin Role
//    * @returns
//    */
//   public IsAdmin(): boolean {
//     const rolesData = sessionStorage.getItem('Roles');
//     if (!rolesData) {
//       return false;
//     }
//     const roles = JSON.parse(rolesData) as any[];
//     if (roles !== undefined && roles !== null) {
//       const role = roles.find((x) => x.RoleCode === 'TRANSPORTATION-SYSTEM');
//       if (role !== undefined && role !== null) {
//         return true;
//       }
//       return false;
//     }
//     return false;
//   }

//   /**
//    * Map Roles With App Code
//    * @param roles
//    */
//   private MapRoles(roles: any): void {
//     const parsedRoles = JSON.parse(roles);
//     const appRoles = parsedRoles.filter((x: any) => x.AppCode === 'TRANSPORTATION-SYSTEM');
//     sessionStorage.setItem('Roles', JSON.stringify(appRoles));
//   }
//   /**
//    * Map Permission By App Code
//    * @param permissions
//    */
//   private MapPermissions(permissions?: any[]) {
//     if (!permissions) {
//       return;
//     }
//     const appPermission = permissions.find((x: any) => x.appCode === 'TRANSPORTATION-SYSTEM');
//     sessionStorage.setItem('Permissions', JSON.stringify(appPermission));
//   }
//   /**
//    * Check Token
//    */
//   private CheckToken(): void {
//     // TODO: Implement Storage.GetFromSession or replace with sessionStorage.getItem
//     const tokenDataString = sessionStorage.getItem('TokenData');
//     if (!tokenDataString) {
//       this.tokenData = null;
//       this.IsLoggedIn = false;
//       return;
//     }
//     this.tokenData = JSON.parse(tokenDataString) as TokenData;
//     if (this.tokenData == null) {
//       this.IsLoggedIn = false;
//     } else {
//       const token = this.tokenData as TokenData;
//       this.IsLoggedIn = new Date() < new Date(token.Expiry);
//     }
//   }

// }
