import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {User} from "../../../models/entity/User";
import {Role} from "../../../models/entity/Role";
import {RoleService} from "../../../services/role.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  roles: Role[] = [];

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,
              private roleService: RoleService) {
    this.form = formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.minLength(5)]],
      role: [null, Validators.required]
    });
  }

  async ngOnInit() {
    this.roles = await this.roleService.getAll()
  }

  async register() {
    let user: User = this.form.value;
    user.role = this.roles.find(role => role.roleId == user.role);
    await this.authService.register(user)
      .then(async (resp: User) => {
        await this.router.navigateByUrl('/auth/login');
      }).catch((err: any) => {
        console.log(err);
      });
  }

}
