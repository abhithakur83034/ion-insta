import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoaderService } from 'src/app/services/loader.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm!: FormGroup;
  constructor(private userData: UserService, private loader: LoaderService) {}

  ngOnInit() {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmpassword: new FormControl('', [Validators.required]),
    });
  }
  get e() {
    return this.registerForm.controls;
  }

  RegisterData() {
    console.log(this.registerForm.value);
    if (this.registerForm.value.password !== this.registerForm.value.confirmpassword) {
      this.loader.showAlert(
        'Password Error',
        'Password & Current Password must be same'
      );
      return;
    }else{
      this.userData.regiser(this.registerForm.value).subscribe({
        next: (res: any) => {
          console.log(res);
          if (res.status === 'success') {
            console.log('registered');
            this.loader.showToast('Successfully Registered');
            this.registerForm.reset()
          } else {
            this.loader.showToast(res.message);
          }
        },
        error: (error: any) => {
          console.log(error);
        },
        complete: () => {
          console.log('completed');
        },
      });
    }
  }
}
