import axios from 'axios';
import { Location } from './locationEntity';

interface LocationData {
  status: string;
  city: string;
  region: string;
  regionName: string;
  country: string;
  countryCode: string;
  zip: string;
  lat:number;
  lon:number;
  timezone: string;
  query:string;
}

export class LocationRepository {
  async getLocationByIP(ip: string): Promise<Location> {
    try {
      const response = await axios.get<LocationData>(`http://ip-api.com/json/${ip}?fields=status,message,country,countryCode,region,regionName,city,zip,lat,lon,timezone,query`);
      const data = response.data;
      if (response.status === 200 && data.status === 'success') {
        const location = new Location(data.city, data.region, data.regionName, data.country, data.countryCode, data.zip, data.lat, data.lon, data.timezone);
        return location;
      } else {
        throw new Error('Failed to retrieve location data');
      }
    } catch (error) {
      throw new Error('Error retrieving location data');
    }
  }
}
