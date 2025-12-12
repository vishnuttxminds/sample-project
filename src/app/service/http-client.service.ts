import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserService } from './userDB/user.service';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  private apiUrl = 'https://betty-dev-api.xminds.in';
  private loginPostFix = '/v2/login';

  constructor(private http: HttpClient) {}
  private isLogged = false;
  userService: UserService = inject(UserService);

  login(email: string, password: string) {
    let user = this.userService.userDetails.find(
      (data) => data.email === email && data.password === password
    );

    if (user === undefined) this.isLogged = false;
    else this.isLogged = true;

    if (!this.isLogged) {
      return ;
    }
    return user
  }

  isAuthenticated(): boolean {
    return this.isLogged ;
  }

  loginAuthenticated() {

    const data = {
      phone_number: '+917012429389',
      device_token: ['string'],
      device_id: '',
    };

     return this.http.post(`${this.apiUrl}${this.loginPostFix}`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }
}
