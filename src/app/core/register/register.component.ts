import { Component, OnInit } from "@angular/core";
import { ConfigurationService } from "../../server-api/configuration.service";
import { Router } from "@angular/router";
import { UserService } from "../../server-api/user.service";
import { User } from "../../shared/user";
import { AuthenticationService } from "../../server-api/authentication.service";
import { Credentials } from "../../shared/credentials";
import { LoginResult } from "../../shared/login-result";

@Component({
  selector: 'core-register',
  templateUrl: 'register.component.html'
})
export class RegisterComponent implements OnInit {
  public isValidating = false;
  public isValid = false;

  public user: User = new User();
  public password = '';
  public password2 = '';

  public fullNameIsValid = false;
  public emailIsValid = false;
  public passwordIsValid = false;
  public password2IsValid = false;

  constructor(private config: ConfigurationService, private router: Router,
              private service: UserService, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    if (this.config.isLoggedIn()) {
      this.router.navigate(['dashboard']);
    }
  }

  private validate() {
    this.emailIsValid = !(this.user.email == null || this.user.email == '');
    this.fullNameIsValid = !(this.user.fullname == null || this.user.fullname == '');
    this.passwordIsValid = !(this.password == null || this.password == '' || this.password.length < 5);
    this.password2IsValid = !(this.password2 !== this.password);

    this.isValid = this.emailIsValid && this.fullNameIsValid && this.passwordIsValid && this.password2IsValid;
  }

  private login(email: string, password: string) {
    const credentials = new Credentials();
    credentials.email = email;
    credentials.password = password;

    this.authenticationService.Authenticate(credentials)
      .then((loginResult: LoginResult) => {
        if (loginResult) {
          this.router.navigate(['dashboard']);
        } else {
          console.log('error!');
        }
      })
      .catch(() => console.log('error!'));
  }

  public change() {
    if (this.isValidating) {
      this.validate();
    }
  }

  public create() {
    this.isValidating = true;

    this.validate();

    if (this.isValid) {
      this.service.create(this.user, this.password)
        .then((id: number) => {
          if (id !== 0) {
            this.login(this.user.email, this.password);
          }
        })
        .catch((err) => console.error(err));
    }
  }
}
