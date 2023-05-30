export class Location {
  constructor(
    public city: string,
    public region: string,
    public regionName: string,
    public country: string,
    public countryCode: string,
    public zip: string,
    public lat: number,
    public lon: number,
    public timezone: string
  ) {}
}
