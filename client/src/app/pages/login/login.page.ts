import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  rememberMe: boolean = false;
  rememberme: any;

  constructor(
    private userService: UserService,
    private router: Router,
    private storage: StorageService,
    private loader: LoaderService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  get e() {
    return this.loginForm.controls;
  }
  // rememberMe: boolean = false;

  ionViewWillEnter() {
    console.log('hit');

    this.remember();
  }

  remember() {
    console.log('Remember Me:', this.rememberMe);
    if (this.rememberMe === true) {
      this.storage
        .getFromlocal('rememberUser')
        .then((res: any) => {
          console.log(res);
          if (res) {
            this.rememberme = JSON.parse(res);
          }
          console.log(this.rememberme);
          if (this.rememberme) {
            this.loginForm.patchValue(this.rememberme);
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    } else {
      this.storage.removeFromLocal('rememberUser');
    }
  }

  loginData() {
    console.log(this.loginForm.value);
    this.userService.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.status === 'success') {
          // alert('user Login')
          this.loader.showToast('Login successfully');
          this.storage.saveToLocal('user', res.user);
          this.storage.saveToLocal('token', res.token);
          if (this.rememberMe === true) {
            this.storage.saveToLocal('rememberUser', this.loginForm.value);
          }
          // setTimeout(() => {
            this.router.navigate(['']);
          // }, 1000);
          this.loginForm.reset();
        }
      },
      error: (error: any) => {
        console.log(error.error);
        this.loader.showToast(error.error.result);
      },
      complete: () => {
        console.log('completed');
      },
    });
  }
}
