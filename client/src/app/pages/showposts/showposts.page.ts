import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-showposts',
  templateUrl: './showposts.page.html',
  styleUrls: ['./showposts.page.scss'],
})
export class ShowpostsPage implements OnInit {
  productId: any;
  singlePost: any;
  user: any;
  singleUser: any;
  filterSinglePost:any;
  show: boolean[] = [];
  filterUser:any=[];
  token:String =""
  constructor(
    private route: ActivatedRoute,
    private postsService: PostsService,
    private storage: StorageService,
    private userService: UserService,
    private router:Router,
  ) {
    this.productId = this.route.snapshot.paramMap.get('id');
  }

  ionViewWillEnter() {
    this.storage
    .getFromlocal('user')
    .then((res: any) => {
      // console.log(res);
      this.user = JSON.parse(res.data);
      console.log(this.user);
      this.token = JSON.parse(res.token);
      console.log(this.token);
      this.getPost();

    })
    .catch((error: any) => {
      console.log(error);
    });
  }

  getPost(){
    let headers = new HttpHeaders({
      'Authorization': `Bearer `  + this.token
    });
    this.postsService.getPosts({headers:headers}).subscribe((res: any) => {
      console.log(res);
      console.log(res.allPost);
      this.filterSinglePost = res.allPost.filter(
        (item: any) => item._id === this.productId
      );
      console.log(this.filterSinglePost);
      this.singlePost = this.filterSinglePost[0];
      console.log(this.singlePost);
      // find user according to post******************************************************************
     this.userService.getRegiseredUser().subscribe((res:any)=>{
       console.log(res.reg);
       this.filterUser = res.reg.filter((item:any)=>item._id === this.singlePost.userId)
       this.singleUser = this.filterUser[0]        
     })
    });
  }

  ngOnInit() {
    console.log('dvnshgsdj');
  }


  gotoProfile(id:any){
    this.router.navigate(['/showsingleprofile',id])
  }

  togglelike(data:any, index:any){
 console.log('clicked', index);
 console.log('data', data);
  }


}
