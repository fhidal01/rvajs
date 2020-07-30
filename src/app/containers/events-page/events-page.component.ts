import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MeetupService } from "src/app/shared/meetup.service";
import { Event } from "../../models/event.interface";

@Component({
  selector: "app-events-page",
  templateUrl: "./events-page.component.html",
  styleUrls: ["./events-page.component.scss"],
})
export class EventsPageComponent implements OnInit {
  public currentlySelected = "upcoming";
  public tab = {
    upcoming: {
      selected: true,
      data: [],
    },
    past: {
      selected: false,
      data: [],
    },
  };

  constructor(private client: HttpClient, private meetupSvc: MeetupService) {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  ngOnInit(): void {
    this.meetupSvc.getUpcomingEvents().subscribe((res) => {
      this.tab.upcoming.data = res.data;
    });

    this.meetupSvc.getPastEvents().subscribe(({ data }) => {
      this.tab.past.data = <Event[]>data.reverse();
      this.tab.past.data = this.tab.past.data.filter((event) => {
        const utc = event?.time;
        const asDate = new Date(0);
        asDate.setUTCMilliseconds(utc);
        return asDate.getFullYear() < 2100;
      });
    });
  }

  public toggleEvents(tab): void {
    this.currentlySelected = tab;
    Object.keys(this.tab).forEach((key, index) => {
      this.tab[key].selected = !this.tab[key].selected;
    });
  }
}
