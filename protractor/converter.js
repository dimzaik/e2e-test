converter = require("xls-to-json");
  converter({
    input: "../e2e-test/protractor/testdata/testdata.xls",  // input xls
    output: "../e2e-test/protractor/testdata/convertedTestData.json", // output json
    sheet: "convertedTestData"  // specific sheetname
  }, function(err, result) {
    if(err) {
      console.error(err);
    } else {
      console.log("Test data converted to json format Successfully!");
    }
  });
