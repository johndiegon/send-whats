import { HttpResponse } from "@angular/common/http";
import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { ToastrService } from "ngx-toastr";
import { catchError, throwError } from "rxjs";
import { signin } from "src/app/redux/actions/client.action";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "dsw-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('passwordInput') passwordInput: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private store: Store
  ) { }

  messageApiError: string;

  loginForm = this.fb.group({
    login: ['', Validators.required],
    password: ['', Validators.required]
  });

  get passwordInputType() {
    const passwordInput = this.passwordInput?.nativeElement;
    return passwordInput?.type;
  }

  set passwordInputType(value: string) {
    const passwordInput = this.passwordInput?.nativeElement;
    passwordInput.type = value;
  }

  get passwordInputIcon() {
    return this.passwordInputType == 'text' ? 'far fa-eye-slash' : 'far fa-eye';
  }

  ngOnInit() { }
  ngOnDestroy() { }

  tooglePassword() {
    if (this.passwordInputType == "password") {
      this.passwordInputType = "text";
    } else {
      this.passwordInputType = "password";
    }
  }

  signIn(event: Event) {
    event.preventDefault();

    if (this.loginForm.valid) {

      const { login, password } = this.loginForm.value;

      this.authService.signIn({ login, password, role: 'admin' })
        .pipe(catchError((err, _) => {
          if (err.error) {
            this.messageApiError = 'Usuario ou senha invalidos!';
            this.toastr.error('Usuario ou senha invalidos!');
          }
          return throwError(() => new Error(err.message));
        }))
        .subscribe(_ => {
          this.router.navigate(["/dashboard"]);
        });
    }
  }
}
