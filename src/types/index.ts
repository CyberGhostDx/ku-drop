export interface Building {
  building: string;
  thai_building: string;
  alias: string;
  buses: {
    line: number;
    sign: string;
  }[];
  lat: number;
  lng: number;
}
