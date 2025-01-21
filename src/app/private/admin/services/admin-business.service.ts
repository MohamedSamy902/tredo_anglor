import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AdminBusinessService {

  constructor(private apiService:ApiService) { }
  GetPermission(): Observable<Response>{
    return  this.apiService.get<Response>('/Authenticate/get-permissions')
  }

  GetAllUsers(): Observable<any>{
    return  this.apiService.get<Response>('/Authenticate/get-users')
  }

  GetUser(Id): Observable<any>{
    return  this.apiService.get<Response>('/Authenticate/get-user/'+Id)
  }
  deleteUserById(Id){
    return  this.apiService.delete<Response>('/Authenticate/delete-user/'+Id)

  }
}
