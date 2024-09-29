import { Credentials } from "./auth.type";

const APP_URL: string = process.env.APP_URL || "http://localhost:3000/api";

export class AuthService {
  static async login(credentials: Credentials) {
    try {
      const response = await fetch(`${APP_URL}/auth`, {
        method: "POST",
        body: JSON.stringify({
          ...credentials,
          password: btoa(credentials.password),
        }),
      });

      if (response.status !== 201) {
        const result = await response.json();

        throw new Error(result.error);
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error("An unknown error occurred.");
      }
    }
  }
}
