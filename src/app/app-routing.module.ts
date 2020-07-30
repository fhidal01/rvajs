import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomePageComponent } from "./containers/home-page/home-page.component";
import { EventsPageComponent } from "./containers/events-page/events-page.component";

const routes: Routes = [
  { path: "", pathMatch: "full", component: HomePageComponent },
  { path: "events", pathMatch: "full", component: EventsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
