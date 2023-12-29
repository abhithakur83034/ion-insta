import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-enterotp',
  templateUrl: './enterotp.page.html',
  styleUrls: ['./enterotp.page.scss'],
})
export class EnterotpPage implements OnInit {
  otpForm !: FormGroup
  userId:any;
  userData:any;

  constructor(private router:Router, private account:UserService) { }

  ngOnInit() {
    this.otpForm = new FormGroup({
      otp : new FormControl('',[Validators.required])
    })

  }


  otpData(){
    // this.otpForm.value.email = this.userData.email;
    console.log(this.otpForm.value);
this.account.verifyOtp(this.otpForm.value).subscribe({
  next: (res:any)=>{
    console.log(res);    
    if(res.status === "fail"){
      console.log("Please check your otp");
    }else{
      console.log("otp matched");
      this.router.navigate(['/setforgotpasseord',res.checkOtp._id])
    }
  },error:(error:any)=>{
    console.log(error.error);    
  },complete:()=>{
    console.log("Completed");
  }
})
    
  }
}
