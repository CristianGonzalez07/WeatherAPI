import { Request, Response } from 'express';
import { GetLocationQuery } from '../queries/getLocationQuery';
import requestIp from 'request-ip';
import axios from 'axios';

export class LocationController {
  public async getLocation(req: Request, res: Response) {
    var ip = requestIp.getClientIp(req);
    if (ip === "::ffff:127.0.0.1" || ip === "::1" || ip === null) {
      const response = await axios.get('https://api.ipify.org?format=json');
      ip = response ? response.data.ip : "";
    }
    const query = new GetLocationQuery(ip || "");
    const result = await query.execute();
    res.json(result);
  }
}


