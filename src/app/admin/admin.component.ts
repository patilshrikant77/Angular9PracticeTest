import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { UserResponse, UserInfo } from '../user';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  apiURL:string="http://localhost/practice_test/userfiles/";
  response: UserResponse ={
    message:'',
    type:undefined
  };

 uresponse: [UserInfo];

  constructor(private authService: AuthService, private router: Router,  private userService:UserService) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(){
    this.userService.allUsers().subscribe(
      (results:any)=>{
        if(results.type)
        {
          this.uresponse=results[0].data;
         // console.log('if',this.uresponse)
          
        }else{
          this.response=results;
         // console.log('else',this.response)
        }
     },
    error=>{
    
      this.response=error;
     
     }
  )
  }

  signout(){
    this.authService.logout();
    this.router.navigateByUrl('/signin');
  }

}
