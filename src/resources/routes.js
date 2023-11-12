import Account_Router from './Account/Router.js';
import Item_Router from './Item/Router.js';
import Order_Router from './Order/Router.js';

function router(app) {
    app.use('/account', Account_Router);
    app.use('/item/', Item_Router);
    app.use('/order/', Order_Router);

    app.get('/agent', (req, res) => {
        const source = req.useragent.source;
        const browser = req.useragent.browser;
        const version = req.useragent.version;
        const os = req.useragent.os;
        const platform = req.useragent.platform;
        const isMobile = req.useragent.isMobile;
        const isTablet = req.useragent.isTablet;
        const isDesktop = req.useragent.isDesktop;

        const response = {
            source: source,
            browser: browser,
            version: version,
            os: os,
            platform: platform,
            isMobile: isMobile,
            isTablet: isTablet,
            isDesktop: isDesktop,
        };
        
        res.send(response);
    })
}

export default router;

