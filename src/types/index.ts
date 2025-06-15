export interface Coordinate {
  lat: number;
  lng: number;
}

export interface Building extends Coordinate {
  building: string;
  thai_building: string;
  alias: string;
  buses: {
    line: number;
    sign: string;
  }[];
}

export interface BusStop extends Coordinate {
  id: number;
  signID: string;
  signName: string;
}

export interface BusLine {
  line: number;
  polylines: Coordinate[][];
  busStops: BusStop[];
}

export interface User {
  username: string;
}

export interface Timetable {
  date: string;
  subject: string;
  thai_subject: string;
  start: string;
  end: string;
  building: string;
}
