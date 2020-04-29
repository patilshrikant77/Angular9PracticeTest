import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'practiceTest';
  isLoggedIn$:Observable<boolean>;
  isLoggedOut$:Observable<boolean>;
  constructor(private authService:AuthService){
  

  }
  ngOnInit(){
    this.isLoggedIn$=this.authService.isLoggedIn$;
    this.isLoggedIn$.subscribe(t=>{
      console.log('this.isLogged',t)
    })
    
    this.isLoggedOut$=this.authService.isloggedOut$;

  }

  signOut(){
    this.authService.logout();
  }

}
