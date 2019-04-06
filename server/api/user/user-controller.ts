import { Controller } from 'ts-express-decorators';
import { ProxyService } from '../proxy-service';

@Controller('/user')
export class UserController {
  constructor(private proxyService: ProxyService) {}

}
