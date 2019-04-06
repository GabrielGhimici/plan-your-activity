import { Controller, Next, Post, Request, Response } from 'ts-express-decorators';
import { ProxyService } from '../proxy-service';

@Controller('/user')
export class UserController {
  constructor(private proxyService: ProxyService) {}

  @Post('/login')
  doLogin(@Request() request, @Response() response, @Next() next) {
    return this.proxyService.handleLoginProxy(request, response, next);
  }
}
