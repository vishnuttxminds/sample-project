import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm!: FormGroup;
  hidePass = true;
 
  constructor(private fb: FormBuilder, private router:Router) {}
  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  loginClick() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

console.log("Router: ", this.router.config);
    console.log('Login success', this.loginForm.value);
  this.router.navigateByUrl('/dashboard');
  }
}
