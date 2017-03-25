import { Component, OnInit } from "@angular/core";
import { MenuService } from "../menu/menu.service";
import { UrlTrackingService } from "../url-tracking.service";

@Component({
  selector: 'core-application-root',
  templateUrl: 'application-root.component.html',
  styleUrls: ['application-root.component.scss']
})
export class ApplicationRootComponent implements OnInit {
  public menuIsOpen = false;

  constructor(private menu: MenuService, private urlTrackingService: UrlTrackingService) {
  }

  ngOnInit(): void {
    this.menu.menuToggled.subscribe(() => {
      this.menuIsOpen = this.menu.isOpen;
    });
  }

  public toggleMenu() {
    this.menu.toggle();
  }
}
