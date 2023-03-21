import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "../../services/auth.service";


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService:AuthService, private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    let logged = this.authService.isSignedIn()
    if(logged)
    {
      const role = route.data['roles'] as Array<string>;
      if(role){
        const match = this.authService.isRoleMatch(role);
        if (match) {
          return true;
        } else {
          this.router.navigate(["/error/forbidden"]);
          return false;
        }
      }

    }
    this.router.navigate(["/auth/login"]);
    return false;
  }
}
