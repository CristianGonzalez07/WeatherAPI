import { LocationRepository } from '../../domain/location/locationRepository';
import { Location } from '../../domain/location/locationEntity';

export class GetLocationQuery {
  private locationRepository: LocationRepository;

  constructor(private ip: string) {
    this.ip = ip;
    this.locationRepository = new LocationRepository();
  }

  public async execute(): Promise<Location> {
    try {
      const location = await this.locationRepository.getLocationByIP(this.ip);
      return location;
    } catch (error) {
      throw new Error('Error retrieving location data');
    }
  }
}
