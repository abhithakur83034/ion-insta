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
  filterUser:any=[]

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
this.getPost();
  }

  getPost(){
    this.postsService.getPosts().subscribe((res: any) => {
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
