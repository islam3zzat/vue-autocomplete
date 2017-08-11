// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'vue-autocomplete component loaded': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL;
    browser
      .url(devServer)
      .waitForElementVisible('#app', 5000)
      .expect.element('.vue-autocomplete input').to.have.attribute('placeholder');
  
  }
};
