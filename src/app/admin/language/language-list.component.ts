import { Component, OnInit } from "@angular/core";
import { ConfigurationService } from "../../server-api/configuration.service";
import { Router } from "@angular/router";
import { Http } from "@angular/http";

@Component({
  selector: 'language-list',
  templateUrl: 'language-list.component.html'
})
export class LanguageListComponent implements OnInit {
  private records: any;

  constructor(private configuration: ConfigurationService, private router: Router,
              private http: Http) {
  }

  ngOnInit() {
    if (!this.configuration.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    } else {
      this.loadData();
    }
  }

  private loadData() {
    this.http.get(`${this.configuration.getBaseUrl()}/language`, this.configuration.getHttpOptions())
      .toPromise()
      .then((r) => this.records = r.json())
      .catch((err: Error) => console.log(err));
  }
}
