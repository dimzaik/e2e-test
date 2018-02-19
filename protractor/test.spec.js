var displayElement = require('./menuHelper');
describe('Angular Home page checking elements', function() {
  var search = element(by.tagName('input'));
  //var angularLogo = element(by.id('hero-logo'));
  var EC = protractor.ExpectedConditions;

  beforeAll(function() {
    browser.get('https://angular.io/');
  });

  it('should have a title', function() {
    expect(browser.getTitle()).toEqual('Angular');
  });

  it('should have menu items', function() {
      expect(displayElement.topMenuItems.getText()).toEqual([
        'FEATURES',
        'DOCS',
        'RESOURCES',
        'EVENTS',
        'BLOG'
      ]);
    });

	it('should have Angular logo', function() {
	  expect(displayElement.angularLogo.isPresent()).toBe(true);
	});	
	
  it('should do a search', function() {
	  search.sendKeys('ng');
	  browser.wait(EC.visibilityOf($('FormsModule')), 20000);
	  expect(element(by.linkText('FormsModule')).isDisplayed()).toBe(true);
  });

});