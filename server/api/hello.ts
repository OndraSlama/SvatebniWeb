import type {IncomingMessage, ServerResponse} from 'http';
import * as url from 'url';
export default (req: IncomingMessage, res: ServerResponse) => {
	const queryObject = url.parse(req.url as string, true).query;
}
