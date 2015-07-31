var utils = require('../../utils');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);
var expect = chai.expect;

describe('feedback', function() {
    before(async function(){
        browser.get('http://localhost:9001/user-settings/mail-notifications');

        await utils.common.waitLoader();

        utils.common.takeScreenshot('edit-user-profile', 'mail-notifications');
    });

    it('change project notification to all', async function() {
        await utils.common.topMenuOption(4);

        let feedbackLightbox = $('div[tg-lb-feedback]');

        await utils.lightbox.open(feedbackLightbox);

        await feedbackLightbox.$('textarea').sendKeys('test test test');

        feedbackLightbox.$('button[type=submit]').click();

        expect(utils.notifications.success.open()).to.be.eventually.equal(true);
    });
});
