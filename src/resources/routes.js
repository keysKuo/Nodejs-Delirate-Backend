import Account_Router from './Account/Router.js';
import Item_Router from './Item/Router.js';

function router(app) {
    app.use('/account', Account_Router);
    app.use('/item/', Item_Router);
}

export default router;

