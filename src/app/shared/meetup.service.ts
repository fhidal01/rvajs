import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ReplaySubject, of, Observable } from "rxjs";
import { catchError } from "rxjs/operators";
import { ApiResponse } from "../models/api-response.interface";

@Injectable({
  providedIn: "root",
})
export class MeetupService {
  private upcomingEventsUrl =
    "https://api.meetup.com/rva-js/events?&sign=true&photo-host=public&page=20&status=upcoming";
  private pastEventsUrl =
    "https://api.meetup.com/rva-js/events?&sign=true&photo-host=public&page=500&status=past";
  private membersUrl =
    "https://api.meetup.com/rva-js/members?photo-host=public&page=3&sign=true&offset=0&order=joined";

  private MEMBERS_CACHE_KEY = "members";
  private UPCOMING_EVENTS_CACHE_KEY = "upcoming_events";
  private PAST_EVENTS_CACHE_KEY = "past_events";
  private cache: Map<string, ReplaySubject<ApiResponse>> = new Map();

  constructor(private client: HttpClient) {}

  public getMembers(): Observable<ApiResponse> {
    if (this.cache.has(this.MEMBERS_CACHE_KEY)) {
      return this.cache.get(this.MEMBERS_CACHE_KEY).asObservable();
    }
    this.cache.set(this.MEMBERS_CACHE_KEY, new ReplaySubject(1));
    this.client
      .jsonp(`${this.membersUrl}`, "callback")
      .pipe(catchError(this.handleError({ meta: {}, data: [] })))
      .subscribe((x) => this.cache.get(this.MEMBERS_CACHE_KEY).next(x));

    return this.cache.get(this.MEMBERS_CACHE_KEY).asObservable();
  }

  public getUpcomingEvents(): Observable<ApiResponse> {
    if (this.cache.has(this.UPCOMING_EVENTS_CACHE_KEY)) {
      return this.cache.get(this.UPCOMING_EVENTS_CACHE_KEY).asObservable();
    }
    this.cache.set(this.UPCOMING_EVENTS_CACHE_KEY, new ReplaySubject(1));
    this.client
      .jsonp(`${this.upcomingEventsUrl}`, "callback")
      .pipe(catchError(this.handleError({ meta: {}, data: [] })))
      .subscribe((x) => this.cache.get(this.UPCOMING_EVENTS_CACHE_KEY).next(x));

    return this.cache.get(this.UPCOMING_EVENTS_CACHE_KEY).asObservable();
  }

  public getPastEvents(): Observable<ApiResponse> {
    if (this.cache.has(this.PAST_EVENTS_CACHE_KEY)) {
      return this.cache.get(this.PAST_EVENTS_CACHE_KEY).asObservable();
    }
    this.cache.set(this.PAST_EVENTS_CACHE_KEY, new ReplaySubject(1));
    this.client
      .jsonp(`${this.pastEventsUrl}`, "callback")
      .pipe(catchError(this.handleError({ meta: {}, data: [] })))
      .subscribe((x) => this.cache.get(this.PAST_EVENTS_CACHE_KEY).next(x));

    return this.cache.get(this.PAST_EVENTS_CACHE_KEY).asObservable();
  }

  private handleError(results) {
    return (err: any) => {
      console.error(err);
      return of(results);
    };
  }
}
