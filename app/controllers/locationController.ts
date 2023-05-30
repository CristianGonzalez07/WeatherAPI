import { GetLocationQuery } from '../queries/getLocationQuery';

export class LocationController {
  public async getLocation(ip:string) {
    const query = new GetLocationQuery(ip || "");
    await query.execute();
  }
}


