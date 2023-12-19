import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http:HttpClient) { }

  //user register***************************************************************************************************************************
  regiser(data:any){
    return this.http.post(`http://localhost:9000/api/register`,data)
  }

  //user login***************************************************************************************************************************
  login(data:any){
    return this.http.post(`http://localhost:9000/api/login`,data)
  }

// getRegistered user*****************************************************************************************************************************

getRegiseredUser(){
  return this.http.get(`http://localhost:9000/api/registereduser`)
}


//Edit profile***********************************************************************************************************************]


editProfile(data:any,id:any){
  return this.http.put(`http://localhost:9000/api/userupdate/${id}`,data)
}



}
