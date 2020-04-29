import { Injectable } from '@angular/core';
import { User, UserResponse } from './user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from "rxjs/operators";



export const ANONYMOUS_USER:User={
  Id:undefined,
  email:''
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL='http://localhost/practice_test/api/';

  private subject =new  BehaviorSubject<User>(ANONYMOUS_USER)
  user$:Observable<User>=this.subject.asObservable();
  isLoggedIn$:Observable<boolean>=this.user$.pipe(map(user=>!!user.Id));
  isloggedOut$:Observable<boolean>=this.isLoggedIn$.pipe(map(isLoggeIn=>!isLoggeIn));



  constructor(private http: HttpClient) {
    const ACCESS_TOKEN = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN'));
    if(ACCESS_TOKEN){
       this.subject.next(ACCESS_TOKEN);
    }
  }



  public login(userInfo: User){
     //need to call service to get access token
     return this.http.post(`${this.apiURL}/login`,userInfo);
    
  }

  public setToken(result: User){
    sessionStorage.setItem('ACCESS_TOKEN', JSON.stringify(result));
    const ACCESS_TOKEN = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN'));
  //  console.log('ACCESS_TOKEN',ACCESS_TOKEN);
    this.subject.next(ACCESS_TOKEN);
  }

  public register(userData:any){
    return this.http.post(`${this.apiURL}/register`,userData);
  }

  

  public logout(){
    sessionStorage.removeItem('ACCESS_TOKEN');
    this.subject.next(ANONYMOUS_USER);
  }

}
