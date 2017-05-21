import { Component, OnInit } from "@angular/core";
import { ConfigurationService } from "../../server-api/configuration.service";
import { MenuGroup } from "./menu-group";
import { MenuItem } from "./menu-item";
import { PermissionCodes } from "../../shared/permissions-codes";
import { MenuService } from "./menu.service";
import { UserSettingsService } from "../../server-api/user-settings.service";

@Component({
  selector: 'core-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss']
})
export class MenuComponent implements OnInit {
  public isOpen: boolean;
  private docsUrl: string;
  private groups: MenuGroup[];

  constructor(private menuService: MenuService, configuration: ConfigurationService, private userSettings: UserSettingsService) {
    this.docsUrl = configuration.getDocumentationUrl();
  }

  ngOnInit(): void {
    this.userSettings.userSettingsChanged
      .subscribe(() => {
        this.rebuildMenu();
      });

    this.menuService.menuToggled
      .subscribe(() => {
        this.isOpen = this.menuService.isOpen;
      });
  }

  private rebuildMenu() {
    this.groups = [];

    const generalMenu = new MenuGroup();

    generalMenu.description = 'Algemeen';

    this.groups.push(generalMenu);

    if (this.userSettings.hasPermission(PermissionCodes.Admin)) {
      const adminMenu = new MenuGroup();
      adminMenu.description = 'Admin';

      adminMenu.add(new MenuItem('Groepen', '/admin/group-list', true, null, null));
      adminMenu.add(new MenuItem('Gebruikers', '/admin/user-list', true, null, null));
      adminMenu.add(new MenuItem('Permissies', '/admin/permission-code-list', true, null, null));
      adminMenu.add(new MenuItem('Talen', '/admin/language-list', true, null, null));
      //adminMenu.add(new MenuItem('API docs', null, false, '_blank', this.docsUrl));

      this.groups.push(adminMenu);
    }
  }
}
