export interface Member {
  id: number;
  name: string;
  status: string;
  joined: number;
  city: string;
  country: string;
  localized_country_name: string;
  state: string;
  lat: number;
  lon: number;
  photo: Photo;
  group_profile: Groupprofile;
  is_pro_admin: boolean;
}

interface Groupprofile {
  status: string;
  visited: number;
  created: number;
  updated: number;
  group: Group;
  answers: Answer[];
  link: string;
}

interface Answer {
  question_id: number;
  question: string;
  answer: string;
}

interface Group {
  id: number;
  urlname: string;
  name: string;
  status: string;
  who: string;
  members: number;
  join_mode: string;
  localized_location: string;
  group_photo: Photo;
}

interface Photo {
  id: number;
  highres_link: string;
  photo_link: string;
  thumb_link: string;
  type: string;
  base_url: string;
}
