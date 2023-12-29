import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../services/posts.service';
import { LoaderService } from '../services/loader.service';
import { register } from 'swiper/element/bundle';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  @ViewChild('fileInput') fileInput: any;
  user: any;
  getSingleUser: any;
  filterUser: any;
  captionForm!: FormGroup;
  fileInp: any;
  img1: any;
  selectedFile: any;
  imageSources: string[] = [];
  token:String =""

  constructor(
    private storage: StorageService,
    private userService: UserService,
    private postService: PostsService,
    private loader: LoaderService
  ) {register();}

  ngOnInit(): void {
    this.captionForm = new FormGroup({
      caption: new FormControl('', [Validators.required]),
    });
  }

  ionViewWillEnter() {
    this.storage
      .getFromlocal('user')
      .then((res: any) => {
        console.log(res);
        this.user = JSON.parse(res.data);
        console.log(this.user);
        this.token =JSON.parse(res.token);
        console.log(this.token);
        
        
      })
      .catch((error: any) => {
        console.log(error);
      });

    this.getRegisteredUser();
  }

  get e() {
    return this.captionForm.controls;
  }

  getRegisteredUser() {
    this.userService.getRegiseredUser().subscribe((res: any) => {
      // console.log(res.reg);
      this.getSingleUser = res.reg.filter(
        (item: any) => item._id === this.user._id
      );
      // console.log(this.getSingleUser);
      this.filterUser = this.getSingleUser[0];
      // console.log(this.filterUser);
    });
  }

  filesUploads(event: any) {
    event.preventDefault();
    // console.log('hittedd uplads');
    this.fileInput.nativeElement.click();
  }

  //   handleFileInput(event:any){
  // this.fileInp = event.target.files[0];
  // console.log(this.fileInp);
  //   }

  // handleFileInput(event: any) {
  //   console.log(event.target.files);

  //   if (event.target.files && event.target.files) {
  //     let reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       this.img1 = event.target.result;
  //       console.log(this.img1);

  //     };
  //     reader.readAsDataURL(event.target.files[0]); // to trigger onload
  //   }

  //   let fileList: FileList = event.target.files;
  //   let file: File = fileList[0];
  //   // console.log(file);
  //   this.selectedFile = file;
  //   // console.log(this.selectedFile);
  // }

  handleFileInput(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      const fileList: FileList = event.target.files;
      const filesArray: File[] = Array.from(fileList);
      filesArray.forEach((file: File) => {
        const reader = new FileReader();
  
        reader.onload = (e: any) => {
          this.img1 = e.target.result;
          // console.log(this.img1);
          this.imageSources.push(this.img1);
        };
  
        reader.readAsDataURL(file); // Read each file as data URL
  console.log(file);
  
        this.selectedFile = file;
      });
    }
  }


 
 
  
  
  captionData() {
   let headers = new HttpHeaders({
      'Authorization': `Bearer ` + this.token
    });
    let formData = new FormData();
    formData.append('image', this.selectedFile);
    formData.append('caption', this.captionForm.value.caption);
  
    this.postService.addPosts(formData, this.filterUser._id,{headers:headers}).subscribe({
      next: (result: any) => {
        if (result.status === 'success') {
          this.loader.showToast('Posted');
          this.captionForm.reset();
        }
      },
      error: (error: any) => {
        console.log(error.error);
        this.loader.showToast(error.error);
      },
      complete: () => {
        // Additional completion logic if needed
      },
    });
  }
  
}
