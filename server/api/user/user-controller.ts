import { Controller, Get, Next, Post, Request, Response } from 'ts-express-decorators';
import { ProxyService } from '../proxy-service';

@Controller('/user')
export class UserController {
  constructor(private proxyService: ProxyService) {}

  @Post('/login')
  doLogin(@Request() request, @Response() response, @Next() next) {
    return this.proxyService.handleLoginProxy(request, response, next);
  }

  @Get('/details')
  getProfile(@Request() request, @Response() response, @Next() next) {
    return this.proxyService.handleProxy('/service')(request, response, next);
  }

  @Post('/firstLogin')
  updatePassword(@Request() request, @Response() response, @Next() next) {
    return this.proxyService.handleBodyUpdateProxy('/service')(request, response, next);
  }

  @Post('/register')
  registerUser(@Request() request, @Response() response, @Next() next) {
    return this.proxyService.handleBodyUpdateProxy('/service')(request, response, next);
  }

  @Post('/colleagues')
  retrieveColleagues(@Request() request, @Response() response, @Next() next) {
    return this.proxyService.handleProxy('/service')(request, response, next);
  }

  @Post('/logout')
  logOut(@Request() request, @Response() response, @Next() next) {
    return this.proxyService.handleBodyUpdateProxy('/service')(request, response, next);
  }
}
