import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "../../server-api/authentication.service";
import { Credentials } from "../../shared/credentials";
import { Router } from "@angular/router";
import { ConfigurationService } from "../../server-api/configuration.service";
import { LoginResult } from "../../shared/login-result";
import { MenuService } from "../menu/menu.service";
import { UserSettingsService } from "../../server-api/user-settings.service";
import { UrlTrackingService } from "../url-tracking.service";

@Component({
  selector: 'core-login-form',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username = '0.0485660610351879@gmail.com';
  public password = 'test';
  public isValidating = false;
  public usernameIsValid = false;
  public passwordIsValid = false;
  public isValid = false;
  public isLoggingIn = false;
  public credentialsAreInvalid = false;

  constructor(private authenticationService: AuthenticationService, private menu: MenuService,
              private router: Router, private config: ConfigurationService, private urlTracking: UrlTrackingService,
              private userSettings: UserSettingsService) {

  }

  ngOnInit(): void {
    if (this.config.isLoggedIn()) {
      // Already logged in
      this.router.navigate(['/dashboard']);
      return;
    } else {
      this.menu.showMenu(false);
    }
  }

  login() {
    if (this.isLoggingIn) {
      return;
    }

    this.validate();

    if (this.isValid) {
      this.isLoggingIn = true;

      const credentials = new Credentials();
      credentials.email = this.username;
      credentials.password = this.password;

      this.authenticationService.Authenticate(credentials)
        .then((loginResult: LoginResult) => {
          if (loginResult) {
            this.menu.showMenu(true);
            this.config.setToken(loginResult.token);
            this.userSettings.initialize(loginResult);

            const url = this.urlTracking.originalUrl;
            this.router.navigate([url || '/dashboard']);
          } else {
            this.credentialsAreInvalid = true;
            this.isLoggingIn = false;
          }
        }).catch(() => {
        this.isLoggingIn = false;
      });
    }
  }

  register() {
    this.router.navigate(['register']);
  }

  validateIfNeeded() {
    if (this.isValidating) {
      this.validate();
    }
  }

  private validate() {
    this.isValidating = true;
    this.usernameIsValid = this.username != null && this.username != undefined && this.username.length > 0;
    this.passwordIsValid = this.password != null && this.password != undefined && this.password.length > 0;
    this.isValid = this.usernameIsValid && this.passwordIsValid;
  }
}
