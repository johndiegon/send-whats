import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: "root" })
export class LogingGuard implements CanActivate {
  constructor(private router: Router, private loginService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.checkLoggedIn();
  }

  checkLoggedIn(): boolean {
    if (!this.loginService.checkLogin()) {
      this.router.navigate(["/login"]);
      return false;
    }
    return true;
  }
}
