import { Injectable } from '@angular/core';
import { UserResponse,UserInfo} from './user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   apiURL='http://localhost/practice_test/api/';

  constructor(private http: HttpClient) { }

 public submitUser (data:UserInfo){
    return this.http.post<UserResponse>(`${this.apiURL}/create_user`,data);
  }

  public allUsers (){
    return this.http.get<UserInfo>(`${this.apiURL}/read`);
  }


}
