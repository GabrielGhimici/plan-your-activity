import { Controller, Get, Next, Request, Response } from 'ts-express-decorators';
import { ProxyService } from '../proxy-service';

@Controller('/events')
export class EventController {
  constructor(private proxyService: ProxyService) {}

  @Get('')
  retrieveEvents(@Request() request, @Response() response, @Next() next) {
    return this.proxyService.handleProxy('/service/events')(request, response, next);
  }
}
