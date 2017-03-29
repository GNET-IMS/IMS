import { exchangeAccessToken } from '../controllers/code';

export default (router) => {
    router.get('/code', exchangeAccessToken);
}
