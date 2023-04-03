import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import {
  AuthService,
  isAngularFireError,
} from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm!: FormGroup;
  subs: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private message: MessageService
  ) {}

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit(): void {
    this.initLoginForm();
  }

  initLoginForm() {
    this.loginForm = this.fb.group({
      email: '',
      password: '',
      remember: false,
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.subs = this.authService.emailSignIn(email, password).subscribe({
      next: () => this.router.navigate(['']),
      error: (err) => {
        if (isAngularFireError(err)) {
          const errorCode = err.code;
          if (errorCode === 'auth/user-not-found') {
            console.log(err.message);
            this.message.clear();
            this.message.add({
              key:'error1',
              severity: 'error',
              summary: 'User error',
              detail: 'Email yang anda masukkan salah atau tidak terdaftar',
              closable: false,
            });
          } else if (errorCode === 'auth/wrong-password') {
            console.log(err.message);
            this.message.clear();
            this.message.add({
              key:'error1',
              severity: 'error',
              summary: 'Password error',
              detail: 'Password yang anda masukkan salah',
              closable: false,
            });
          }
        } else {
          console.error(err);
        }
      },
    });
  }
}
