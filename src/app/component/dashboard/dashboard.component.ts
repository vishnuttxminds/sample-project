import { Component } from '@angular/core';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  constructor(private apiService: HttpClientService) {}
  id = this.apiService.getUserId();

  getDetails() {
    this.apiService.getUserDetails(this.id!).subscribe({
      next: (res: any) => {
        const username = res?.response?.username;
        const email = res?.response?.email;
        console.log('API success:', res);
        alert(`Username: ${username}\nEmail: ${email}`);
      },
      error: (err) => {
        console.error('API error:', err);
      },
    });
  }
}
