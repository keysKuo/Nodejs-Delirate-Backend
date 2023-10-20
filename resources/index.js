import Account_Router from './Account/Router.js';

function router(app) {
    app.use('/account', Account_Router);
}

export default router;

