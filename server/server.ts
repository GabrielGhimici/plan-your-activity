import {ServerLoader, IServerLifecycle, ServerSettings} from 'ts-express-decorators';
import * as Path from 'path';
import * as Express from 'express';
const bodyParser = require('body-parser');

@ServerSettings({
  rootDir: Path.resolve(__dirname),
  port: process.env.PORT || 3000,
  mount: {
    '/api': '${rootDir}/api/**/*.js',
    '/': '${rootDir}/general/**/*.js'
  },
  logger: {
    logRequest: true
  }
})
export class Server extends ServerLoader implements IServerLifecycle {
  public $onMountingMiddlewares(): void|Promise<any> {
    this
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({
        extended: true
      }));
    this.use(Express.static(`${__dirname}/../client/`));
    return null;
  }

  public $onServerInitError(err) {
    console.error(err);
  }
}

new Server().start();
