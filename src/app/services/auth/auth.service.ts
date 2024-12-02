import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  url = 'http://localhost:3000/login';

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  async login(username: string, password: string): Promise<boolean> {
    if (await this.isValidCredentials(username, password)) {
      this.isLoggedIn = true;
      return true;
    }
    return false;
  }

  logout() {
    this.isLoggedIn = false;
  }

  async isValidCredentials(
    username: string,
    password: string
  ): Promise<boolean> {
    try {
      const response = await fetch(`${this.url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        return false;
      }

      const data = await response.json();
      return data.success;
    } catch (error) {
      console.error('Error during fetch:', error);
      return false;
    }
  }
}
