import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ConfigurationService } from "../../server-api/configuration.service";
import { MenuService } from "../menu/menu.service";
import { UserSettingsService } from "../../server-api/user-settings.service";
import { UrlTrackingService } from "../url-tracking.service";
import { Http } from "@angular/http";

@Component({
  selector: 'core-login-form',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username = 'test@test.com';
  public password = 'test';
  public isValidating = false;
  public usernameIsValid = false;
  public passwordIsValid = false;
  public isValid = false;
  public isLoggingIn = false;
  public credentialsAreInvalid = false;

  constructor(private menu: MenuService,
              private router: Router, private config: ConfigurationService, private urlTracking: UrlTrackingService,
              private userSettings: UserSettingsService, private http: Http) {

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

      const data = {
        email: this.username,
        password: this.password
      };

      this.http.post(`${this.config.getBaseUrl()}/token`, data)
        .subscribe((res) => {
          if (res.status === 204) {
            this.menu.showMenu(true);

            console.log(res.headers);
            this.config.setToken(res.headers.get('Authorization'));
            this.userSettings.initialize();

            const url = this.urlTracking.originalUrl;
            this.router.navigate([url || '/dashboard']);
          } else {
            this.credentialsAreInvalid = true;
            this.isLoggingIn = false;
          }
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
    this.usernameIsValid = this.username != null && this.username !== undefined && this.username.length > 0;
    this.passwordIsValid = this.password != null && this.password !== undefined && this.password.length > 0;
    this.isValid = this.usernameIsValid && this.passwordIsValid;
  }
}
