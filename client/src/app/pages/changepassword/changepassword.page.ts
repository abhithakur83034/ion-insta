import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoaderService } from 'src/app/services/loader.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.page.html',
  styleUrls: ['./changepassword.page.scss'],
})
export class ChangepasswordPage implements OnInit {
  changePassword !: FormGroup
  user:any;
  userData:any;
  Success:any
  Fail:any
  Warn:any


  constructor( private storage: StorageService, private account:UserService, private router:Router, private loader:LoaderService) { 
    this.user = this.storage
      .getFromlocal('user')
      .then((res: any) => {
        console.log(res);
        this.userData = JSON.parse(res);
        console.log(this.userData);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  ngOnInit() {
    console.log('Entare');
    this.changePassword = new FormGroup({
      oldPassword : new FormControl('',[Validators.required]),
      newPassword : new FormControl('',[Validators.required]),
      confirmPassword : new FormControl('',[Validators.required]),
    })
  }

  get e(){
   return this.changePassword.controls;
  }

  changePasswordData(){
    console.log(this.changePassword.value);
this.account.changePassword(this.changePassword.value, this.userData._id).subscribe({
  next: (res: any) => {
    this.changePassword.reset()
    console.log(res);

    if(res.status === "success")
    {
      this.loader.showToast('Password Change Successfully', 3000, 'top');
      this.router.navigate([''])
    }else if(res.status === "fail"){
      this.Fail = res.message;
      // console.log("old password does not mtch");      
    }else{
   this.Warn = res.message
      // console.log("please check your new password & confirm password");
      
    }
  },
  error: (error: any) => {
    console.log(error);
  },
  complete: () => {
    console.log('complete');
  },
});
    
  }

}
