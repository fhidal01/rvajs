import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
} from "@angular/core";
import { MeetupService } from "src/app/shared/meetup.service";

@Component({
  selector: "app-members",
  templateUrl: "./members.component.html",
  styleUrls: ["./members.component.scss"],
})
export class MembersComponent implements OnInit {
  @ViewChild("totalmembers", { static: true }) totalMembers: ElementRef;

  public latestMembers = [];
  public animatedCount = 0;
  public animationComplete = false;

  private animationStarted = false;
  private membersTotalCount = 0;

  constructor(private meetupSvc: MeetupService, private renderer: Renderer2) {}

  ngOnInit() {
    window.addEventListener("scroll", () => {
      if (
        this.membersTotalCount > 0 &&
        this.isInViewport(this.totalMembers) &&
        !this.animationStarted
      ) {
        this.animateValue(0, this.membersTotalCount, 5000);
      }
    });

    this.meetupSvc.getMembers().subscribe((res) => {
      this.membersTotalCount = parseInt(res.meta.total_count, 10);
      this.latestMembers = res.data;
    });
  }

  toggleImgError(ele) {
    ele.src = "assets/images/empty-user.svg";
    this.renderer.addClass(ele, "error");
  }

  private isInViewport(element): boolean {
    const rect = element.nativeElement.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  private animateValue(start, end, duration): void {
    this.animationStarted = true;
    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    const timer = setInterval(() => {
      current += increment;
      this.animatedCount = current;
      if (current === end) {
        this.animationComplete = true;
        clearInterval(timer);
      }
    }, stepTime);
  }
}
