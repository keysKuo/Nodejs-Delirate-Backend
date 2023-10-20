
function mailForm(options) {
    let logo_link = options.logo_link || process.env.LOGO_LINK;
    let caption = options.caption || '';
    let content = options.content || '';
    
    return `<div 
        style="width: 35%; margin: 0 auto;
        text-align: center; font-family: 'Google Sans', Roboto, sans-serif;
        min-height: 300px; padding: 40px 20px;
        border-width: thin; border-style: solid; border-color: #dadce0; border-radius: 8px">

        <img style="width: 296px;
        aspect-ratio: auto 74 / 24;
        height: 96px;" src="${logo_link}" />

        <div style="
            color: rgba(0,0,0,0.87);
            line-height: 32px;
            padding-bottom: 24px;
            text-align: center;
            word-break: break-word;
            font-size: 24px">

            ${caption}
        </div>

        <div style="border: thin solid #dadce0;
            color: rgba(0,0,0,0.87);
            line-height: 26px;
            text-align: center;
            word-break: break-word;
            font-size: 18px">

            ${content}
        </div>

        <p>Mọi thắc mắc vui lòng liên hệ contact.ezgroup@gmail.com</p>
        <p>Hotline: 0767916592 - SUD Technology</p>
    </div>
    `;
};

export { mailForm };