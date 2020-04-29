import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserResponse } from '../user';

export class ValidatePassword {
  static MatchPassword(abstractControl: AbstractControl) {
    let password = abstractControl.get('password').value;
    let confirmPassword = abstractControl.get('cpassword').value;
     if (password != confirmPassword) {
         abstractControl.get('cpassword').setErrors({
           MatchPassword: true
         })
    } else {
      return null
    }
  }
 
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  isSubmitted  =  false;
  response: UserResponse ={
    message:'',
    type:undefined
  };
  constructor(private authService: AuthService, private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
  //   if (this.authService.isLoggedIn$) {
  //     this.router.navigate(['/admin']);
  //  }
  this.signupForm  =  this.formBuilder.group({
        email: ['', [Validators.required,Validators.email]],
        password: ['', Validators.required],
        cpassword: ['', Validators.required]
    },{
      validator: ValidatePassword.MatchPassword //
    });

  }
  get f() { return this.signupForm.controls; }

  
  register(){
    this.isSubmitted = true;
    if(this.signupForm.invalid){
      return;
    }
    this.authService.register(this.signupForm.value).subscribe(
      (results:any)=>{
         if(results.type){
          this.response=results;
          //console.log('if',results)
            this.router.navigateByUrl('/signin');
        }else{
         // console.log('else',results)
          this.response=results;
        }      
     },
    error=>{
     //console.log('error',error);
      this.response=error;
     
     });
    
  }

}
