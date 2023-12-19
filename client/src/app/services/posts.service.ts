import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private http:HttpClient) { }

  //add post ************************************************************************

  addPosts(data:any,id:any){
    return this.http.post(`http://localhost:9000/api/uploadfiles/${id}`,data)
  }

  //get post ************************************************************************

  getPosts(){
    return this.http.get(`http://localhost:9000/api/get-all-posts`)
  }


  //like post*************************************************************************************************************

  likePost(data:any,id:any){
    return this.http.post(`http://localhost:9000/api/uploadfiles/${id}`,data)
  }


}
