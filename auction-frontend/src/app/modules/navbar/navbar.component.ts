import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../models/entity/User";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  user?: User
  constructor(public authService:AuthService, private router:Router) { }

  async ngOnInit() {
    if (this.authService.isSignedIn()) {
    await this.authService.getAuthenticatedUser().then((data:User) => {
      this.user = data;
    });
  }
  }

  async logout() {
    await this.authService.logout()
      .then(() => {
        this.router.navigate(['/auth/login']);
        localStorage.clear();
      })
      .catch((err:any) => {
        console.log(err);
      });
  }

}
