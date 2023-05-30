import { GetLocationQuery } from '../queries/getLocationQuery';
import axios from 'axios';

export class LocationController {
  public async getLocation(ip:string) {
    const query = new GetLocationQuery(ip || "");
    return await query.execute();
  }

  public async getLocationByCity(city: string) {
    const apiKey = process.env.OPENCAGE_API_KEY;
    const baseUrl = 'https://api.opencagedata.com/geocode/v1/json';

    const params = {
      q: city,
      key: apiKey
    };

    return axios
    .get(baseUrl, { params })
    .then(response => {
      const results = response.data.results;
      if (results.length > 0) {
        const locationData = results[0].components;
        const { city, region, region_name, country, country_code, postcode } = locationData;
        const { lat, lng } = results[0].geometry;
        const timezone = results[0].annotations.timezone.name;

        return {
          city,
          region,
          regionName: region_name,
          country,
          countryCode: country_code,
          zip: postcode,
          lat,
          lon: lng,
          timezone
        };
      } else {
        throw new Error('Error retrieving location data');
      }
    })
    .catch(error => {
      throw new Error('Error retrieving location data');
    });
  }
}


