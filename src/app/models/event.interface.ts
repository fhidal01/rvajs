import { Group } from "./group.interface";
import { Venue } from "./venue.interface";

export interface Event {
  created: number;
  duration: number;
  id: string;
  name: string;
  rsvp_limit: number;
  date_in_series_pattern: boolean;
  status: string;
  time: number;
  local_date: string;
  local_time: string;
  rsvp_close_offset: string;
  updated: number;
  utc_offset: number;
  waitlist_count: number;
  yes_rsvp_count: number;
  venue: Venue;
  is_online_event: boolean;
  group: Group;
  link: string;
  description: string;
  how_to_find_us: string;
  visibility: string;
  member_pay_fee: boolean;
}
