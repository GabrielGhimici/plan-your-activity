import { Controller } from 'ts-express-decorators';
import { ProxyService } from '../proxy-service';

@Controller('/events')
export class EventController {
  constructor(private proxyService: ProxyService) {}

}
