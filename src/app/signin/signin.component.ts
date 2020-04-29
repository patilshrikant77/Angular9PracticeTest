import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserResponse, User } from '../user';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  isSubmitted  =  false;
  response: UserResponse ={
    message:'',
    type:undefined
  };
  constructor(private authService: AuthService, private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    //  if (this.authService.isLoggedIn$) {
    //     this.router.navigate(['/admin']);
    //  }

    this.signinForm  =  this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required]
  });
  }

  get f() { return this.signinForm.controls; }


  login(){
    this.isSubmitted = true;
    if(this.signinForm.invalid){
      console.log('coming here');
      return;
    }
    this.authService.login(this.signinForm.value).subscribe(
      (results:any)=>{
         if(results.type){
        //  console.log('if',results[0])
          this.authService.setToken(results[0].data[0]);
          this.router.navigateByUrl('/admin');
        }else{
          //console.log('else',results)
          this.response=results;
        }      
     },
    error=>{
     //console.log('error',error);
      this.response=error;
     
     });
    
  }

}
