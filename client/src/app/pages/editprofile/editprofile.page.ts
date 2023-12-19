import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})
export class EditprofilePage implements OnInit {
  @ViewChild('fileInput') fileInput: any;

  user: any;
  getSingleUser: any;
  filterUser: any;
  editProfileForm!: FormGroup;
  fileInp: any;

  constructor(
    private storage: StorageService,
    private userService: UserService,
    private modalCtrl: ModalController
  ) {}

  ionViewWillEnter() {
    this.storage
      .getFromlocal('user')
      .then((res: any) => {
        this.user = JSON.parse(res);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  ngOnInit(): void {
    this.editProfileForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      bio: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
    });
    this.getRegisteredUser();
  }

  getRegisteredUser() {
    this.userService.getRegiseredUser().subscribe((res: any) => {
      console.log(res.reg);
      this.getSingleUser = res.reg.filter(
        (item: any) => item._id === this.user._id
      );
      console.log(this.getSingleUser);
      this.filterUser = this.getSingleUser[0];
      console.log(this.filterUser);
      this.editProfileForm.patchValue(this.filterUser);
    });
  }

  get e() {
    return this.editProfileForm.controls;
  }

  AddProfilePicture() {
    console.log('hittedd AddProfilePicture');
    this.fileInput.nativeElement.click();
  }

  handleFileInput(event: any) {
    this.fileInp = event.target.files[0];
    console.log(this.fileInp);
    if (this.fileInp) {
      this.modalCtrl.dismiss();
    }
  }

  remove() {
    console.log('hittedd Remove');
  }

  editPrifileData() {
    console.log(this.editProfileForm.value);
    let formData = new FormData();
    formData.append('image', this.fileInp);
    formData.append('name', this.editProfileForm.value.name);
    formData.append('username', this.editProfileForm.value.username);
    formData.append('bio', this.editProfileForm.value.bio);
    formData.append('gender', this.editProfileForm.value.gender);

    this.userService.editProfile(formData, this.filterUser._id).subscribe({
      next: (result: any) => {
        console.log(result);
        if (result.status === 'updated') {
          this.getRegisteredUser();
        }
      },
      error: (error: any) => {
        console.log(error.error);
      },
      complete: () => {
        console.log('Completed');
      },
    });
  }
}
