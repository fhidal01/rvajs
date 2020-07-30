import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule, HttpClientJsonpModule } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeroComponent } from "./components/hero/hero.component";
import { HomePageComponent } from "./containers/home-page/home-page.component";
import { EventsPageComponent } from "./containers/events-page/events-page.component";
import { MembersComponent } from "./components/members/members.component";
import { SponsorsComponent } from "./components/sponsors/sponsors.component";
import { TeamComponent } from "./components/team/team.component";
import { NextEventComponent } from './components/next-event/next-event.component';
import { EventComponent } from './components/event/event.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroComponent,
    HomePageComponent,
    EventsPageComponent,
    MembersComponent,
    SponsorsComponent,
    TeamComponent,
    NextEventComponent,
    EventComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
