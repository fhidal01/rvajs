import { Member } from "./member.interface";
import { Event } from "./event.interface";

export interface ApiResponse {
  meta: Meta;
  data: Member[] | Event[];
}

interface Meta {
  total_count: string;
}
