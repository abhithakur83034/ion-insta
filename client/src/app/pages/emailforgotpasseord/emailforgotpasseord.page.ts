import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-emailforgotpasseord',
  templateUrl: './emailforgotpasseord.page.html',
  styleUrls: ['./emailforgotpasseord.page.scss'],
})
export class EmailforgotpasseordPage implements OnInit {
  forgotPassword !: FormGroup
  constructor(private userDatas:UserService, private router:Router) { }

  ngOnInit() {
    this.forgotPassword = new FormGroup({
      email  :new FormControl('', [ Validators.required])
    })
  }

  get e(){
    return this.forgotPassword.controls;
  }


  forgotPasswordMail(){
    console.log(this.forgotPassword.value);
    this.userDatas.forgotPasswordMail(this.forgotPassword.value).subscribe({
      next: (res:any)=>{
        console.log(res);   
        if(res.status === "success"){
          // alert(res.message)
          this.router.navigate(['/enterotp'])
        }     
      },
      error:(error:any)=>{
        console.log(error.error);  
        if(error.error.status === 'warning') {
          alert( error.error.message)
        }     
      },complete:()=>{
        console.log("completed");
        
      }
    })
  }
}
