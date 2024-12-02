import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';
  isLoggedIn = false;
  url = 'http://localhost:3000/login';

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(this.TOKEN_KEY);
      this.isLoggedIn = !!token;
    }
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }

  async login(username: string, password: string): Promise<boolean> {
    if (await this.isValidCredentials(username, password)) {
      this.isLoggedIn = true;
      if (isPlatformBrowser(this.platformId)) {
        localStorage.setItem(this.TOKEN_KEY, 'true');
      }
      return true;
    }
    return false;
  }

  logout() {
    this.isLoggedIn = false;
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.TOKEN_KEY);
    }
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
          username,
          password,
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
