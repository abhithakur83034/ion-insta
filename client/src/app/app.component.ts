import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router, private storage: StorageService) {}

  user: any;

  ngOnInit(): void {
    console.log('ngOnInit');

    this.storage
      .getFromlocal('user')
      .then((res: any) => {
        this.user = JSON.parse(res);
        // console.log(this.user);

        if (this.user) {
          this.router.navigate(['']);
        } else {
          this.router.navigate(['/login']);
        }
      })
      .catch((error: any) => {
        console.log(error);
        // Handle error if needed
      });
  }
}
