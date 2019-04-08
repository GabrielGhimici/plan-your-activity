import { Controller, Get, Next, Put, Request, Response } from 'ts-express-decorators';
import { ProxyService } from '../proxy-service';

@Controller('/events')
export class EventController {
  constructor(private proxyService: ProxyService) {}

  @Get('')
  retrieveEvents(@Request() request, @Response() response, @Next() next) {
    return this.proxyService.handleProxy('/service/events')(request, response, next);
  }

  @Get('/invitations')
  retrieveInvitations(@Request() request, @Response() response, @Next() next) {
    return this.proxyService.handleProxy('/service')(request, response, next);
  }

  @Put('/addEvent')
  addEvent(@Request() request, @Response() response, @Next() next) {
    return this.proxyService.handleProxy('/service')(request, response, next);
  }

  @Put('/respond')
  acceptInvitation(@Request() request, @Response() response, @Next() next) {
    return this.proxyService.handleBodyUpdateProxy('/service')(request, response, next);
  }

  @Put('/updateEvent')
  updateEvent(@Request() request, @Response() response, @Next() next) {
    return this.proxyService.handleProxy('/service')(request, response, next);
  }

  @Put('/deleteEvent')
  deleteEvent(@Request() request, @Response() response, @Next() next) {
    return this.proxyService.handleBodyUpdateProxy('/service')(request, response, next);
  }
}
