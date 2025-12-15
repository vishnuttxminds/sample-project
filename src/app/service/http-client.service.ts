import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserService } from './userDB/user.service';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  private apiBaseUrl = environment.baseUrl;
  private loginPostFix = '/v2/login';
  private userDeatils = 'v2/user_details';
  private eventsList = 'v2/upcoming_events';

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
      return;
    }
    return user;
  }

  isAuthenticated(): boolean {
    return this.isLogged;
  }

  loginAuthenticated() {
    const data = {
      phone_number: '+917012429389',
      device_token: ['string'],
      device_id: '',
    };

    return this.http.post(`${this.apiBaseUrl}${this.loginPostFix}`, data);
  }

  //save token in local storage
  saveToken(token: string) {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  //seaveUserId
  saveUserId(userId: string) {
    localStorage.setItem('user_id', userId);
  }

  getUserId(): string | null {
    return localStorage.getItem('user_id');
  }

  getUserDetails(userId: string) {
    return this.http.get(`${this.apiBaseUrl}/${this.userDeatils}?id=${userId}`);
  }

  getEventsList(page: number, size: number) {
    return this.http.get<any>(
      `${this.apiBaseUrl}/${this.eventsList}?page=${page}&size=${size}`
    );
  }
}
