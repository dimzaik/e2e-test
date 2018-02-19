var steps = function() {

  this.Given(/^I am on the homepage$/, function(callback) {
    support.get(this, 'https://angular.io/', function(result){
      callback(null, 10000);
    });
  });

  this.When(/^I should see a "([^"]*)" link$/, function(link, callback) {
    support.findByBinding(this, link, function(result){
      result.getText().then (function(text){
        text.trim().toLowerCase().should.equal(link.trim().toLowerCase());             
        callback(null, 10000);
      });     
    });
  });

  this.Then(/^I should not see a "([^"]*)" link$/, function(link, callback) {
    support.isElementPresent(this, link, function(result){
      result.should.equal(false);
      callback(null, 10000);
    });
  });

};

module.exports = steps;