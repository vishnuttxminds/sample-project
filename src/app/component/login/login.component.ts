import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClientService } from 'src/app/service/http-client.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePass = true;

  @ViewChild('email') email!: ElementRef;
  @ViewChild('password') password!: ElementRef;

  authService: HttpClientService = inject(HttpClientService);

  constructor(private fb: FormBuilder, private router: Router) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  loginClick() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const email = this.email.nativeElement.value;
    const password = this.password.nativeElement.value;
    const success = this.authService.login(email, password);

    if (!success) {
      alert('Login failed');
    } else {
      this.authService.loginAuthenticated().subscribe(
        (response: any) => {
          console.log('Suucess : ', response.access_token);
          this.authService.saveToken(response.access_token || '');
          this.authService.saveUserId(response.user_details.id || '');
          alert('Login Success');
          this.router.navigateByUrl('/dashboard');
        },
        (error) => {
          console.log('Error : ', error);
        }
      );
    }
  }
}
