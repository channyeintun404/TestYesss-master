import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-create-successful',
  templateUrl: './user-create-successful.page.html',
  styleUrls: ['./user-create-successful.page.scss'],
})
export class UserCreateSuccessfulPage implements OnInit {

  constructor(
    private router: Router) { }

  ngOnInit() {
  }

  back(): void {
    this.router.navigate([`${'./signin'}`]);
  }

}
