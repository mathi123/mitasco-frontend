import { Injectable } from "@angular/core";
import { User } from "../shared/user";
import { Subject } from "rxjs/Subject";
import { Http } from "@angular/http";
import { ConfigurationService } from "./configuration.service";

@Injectable()
export class UserSettingsService {
  private loggedUser: User;
  private permissions = [];
  private roles: any;
  public userSettingsChanged = new Subject();

  constructor(private http: Http, private config: ConfigurationService) {
  }

  initialize() {
    this.http.get(`${this.config.getBaseUrl()}/context/role`, this.config.getHttpOptions())
      .subscribe(res => {
        if (res.status === 200) {
          this.roles = res.json();

          console.info(this.roles);

          this.userSettingsChanged
            .next();
        } else {
          // todo: show error
        }
      });

    this.http.get(`${this.config.getBaseUrl()}/context/permission`, this.config.getHttpOptions())
      .subscribe(res => {
        if (res.status === 200) {
          this.permissions = res.json();
          console.info(this.permissions);

          this.userSettingsChanged
            .next();
        } else {
          // todo: show error
        }
      });
  }

  getUser() {
    return this.loggedUser;
  }

  hasPermission(code: string) {
    return this.permissions.some(perm => perm.code === code);
  }
}
