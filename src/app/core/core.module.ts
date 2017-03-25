import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ApplicationRootComponent } from "./application-root/application-root.component";
import { AccordionModule, AlertModule } from "ng2-bootstrap";
import { MenuService } from "./menu/menu.service";
import { UrlTrackingService } from "./url-tracking.service";
import { CoreRoutingModule } from "./core-routing.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { MenuComponent } from "./menu/menu.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { RegisterComponent } from "./register/register.component";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { ServerApiModule } from "../server-api/server-api.module";
import { ModalsModule } from "../modals/modals.module";
import { AdminModule } from "../admin/admin.module";

@NgModule({
  imports: [
    BrowserModule, FormsModule, HttpModule,
    CommonModule,
    AlertModule.forRoot(),
    AccordionModule.forRoot(),
    CoreRoutingModule,
    ServerApiModule,
    ModalsModule,
    AdminModule
  ],
  declarations: [ApplicationRootComponent, DashboardComponent, LoginComponent, MenuComponent, PageNotFoundComponent, RegisterComponent],
  exports: [ApplicationRootComponent, AdminModule],
  providers: [MenuService, UrlTrackingService],
  bootstrap: [ApplicationRootComponent]
})
export class CoreModule {
}
