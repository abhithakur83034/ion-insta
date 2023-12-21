import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FollowfollowingService {

  constructor(private http:HttpClient) { }

  following(data:any, id:any){
    return this.http.post(`http://localhost:9000/api/follow/${id}`,data)
  }

  getfollowing(){
    return this.http.get(`http://localhost:9000/api//get-following`)
  }
}
