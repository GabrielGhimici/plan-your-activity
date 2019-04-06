import { Service } from 'ts-express-decorators';
import { environement } from './proxy-utils';
import * as proxy from 'express-http-proxy';
import { parse } from 'url';

@Service()
export class ProxyService {
  public handleLoginProxy;
  constructor() {
    this.handleLoginProxy = proxy(`${environement.API_PROXY_ADDRESS}`, {
      proxyReqPathResolver: function(req) {
        return parse(req.url).path;
      },
      proxyReqBodyDecorator: function(bodyContent, srcReq) {
        return JSON.parse(Buffer.from(bodyContent.bodyValue, 'base64').toString());
      },
      proxyReqOptDecorator: function(proxyReqOpts, srcReq) {
        return new Promise(function(resolve, reject) {
          resolve(proxyReqOpts);
        });
      },
      userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
        if (!proxyResData.toString('utf8')) { return JSON.stringify({OK: false}); }
        userRes.append('Access-Control-Allow-Credentials', true);
        userRes.cookie('PYAToken', proxyResData.toString(), {expires: new Date(Number(new Date()) + 30 * 60 * 1000), httpOnly: false });
        return JSON.stringify({OK: true});
      }
    });
  }
}
