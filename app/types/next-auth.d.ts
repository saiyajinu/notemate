import "next-auth";

declare module "next-auth" {
  /**
   * Extends the built-in session.user object
   */
  interface User {
    id?: string;
  }

  /**
   * Extends the built-in session object
   */
  interface Session {
    user?: User & {
      id?: string;
    }
  }
}
