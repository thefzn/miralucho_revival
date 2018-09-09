// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
    'visa test': (browser) => {
        const devServer = browser.globals.devServerURL;
        browser.url(devServer).waitForElementVisible('#app', 5000);

        browser.setValue('#payment-method-card-number', '4');
        browser.pause(100);
        browser.assert.cssClassNotPresent('.visa-cc-color', 'cc-sprite-gray');
        browser.end();
    },

    'master card test': (browser) => {
        const devServer = browser.globals.devServerURL;
        browser.url(devServer).waitForElementVisible('#app', 5000);

        browser.setValue('#payment-method-card-number', '2');
        browser.pause(100);
        browser.assert.cssClassNotPresent('.mc-cc-color', 'cc-sprite-gray');
        browser.end();
    },

    'amex card test': (browser) => {
        const devServer = browser.globals.devServerURL;
        browser.url(devServer).waitForElementVisible('#app', 5000);

        browser.setValue('#payment-method-card-number', '3');
        browser.pause(100);
        browser.assert.cssClassNotPresent('.amx-cc-color', 'cc-sprite-gray');
        browser.end();
    },

    'discover card test': (browser) => {
        const devServer = browser.globals.devServerURL;
        browser.url(devServer).waitForElementVisible('#app', 5000);

        browser.setValue('#payment-method-card-number', '6');
        browser.pause(100);
        browser.assert.cssClassNotPresent('.dis-cc-color', 'cc-sprite-gray');
        browser.end();
    },

    'masking test': (browser) => {
        const devServer = browser.globals.devServerURL;
        browser.url(devServer).waitForElementVisible('#app', 5000);

        browser.setValue('#payment-method-card-number', '4111111111111111');
        browser.expect.element('#payment-method-card-number').to.have.value.that.equals('4111 1111 1111 1111');

        browser.end();
    },
    'masking avoid typing letters test': (browser) => {
        const devServer = browser.globals.devServerURL;
        browser.url(devServer).waitForElementVisible('#app', 5000);

        browser.setValue('#payment-method-card-number', '4F');
        browser.expect.element('#payment-method-card-number').to.have.value.that.equals('4');

        browser.end();
    },
};
