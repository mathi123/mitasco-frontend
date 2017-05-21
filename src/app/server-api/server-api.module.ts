import { NgModule } from "@angular/core";
import { CountryService } from "./country.service";
import { GroupService } from "./group.service";
import { PermissionCodeService } from "./permission-code.service";
import { TodoService } from "./todo.service";
import { UserService } from "./user.service";
import { ConfigurationService } from "./configuration.service";
import { UserSettingsService } from "./user-settings.service";

@NgModule({
  providers: [ConfigurationService, CountryService, GroupService,
    PermissionCodeService, TodoService, UserService, UserSettingsService]
})
export class ServerApiModule {

}
