import { createServer } from 'http';
import * as next from 'next';
import routes from './routes';

const port = parseInt(process.env.PORT || '3000', 10);
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
  createServer(handler).listen(port);
});
