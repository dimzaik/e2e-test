Feature: Angular Homepage 
  It is a test with cucumber and gherkin 
  with which I will check the angular homepage

  Scenario: Visit Angular Homepage
    Given I am on the homepage
    When I should see a "ng-star-inserted"
    Then I should see a "hero-logo"