import { Component, OnInit } from "@angular/core";
import { MeetupService } from "src/app/shared/meetup.service";
import { Event } from "../../models/event.interface";

@Component({
  selector: "app-next-event",
  templateUrl: "./next-event.component.html",
  styleUrls: ["./next-event.component.scss"],
})
export class NextEventComponent implements OnInit {
  public nextEvent;

  constructor(private meetupSvc: MeetupService) {}

  ngOnInit(): void {
    this.meetupSvc.getUpcomingEvents().subscribe(({ data }) => {
      this.nextEvent = <Event>data[0];
    });
  }
}
