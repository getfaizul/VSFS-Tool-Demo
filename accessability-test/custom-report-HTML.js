// Pally Script to scan the SPIDER App for "Standard 508" validation
'use strict';

// Referrencing dependencies
var accReporter = require('./reporter/reporter');
var pa11y = require('pa11y');
var fs = require('file-system');

var tests = [
  {
    name: 'App: Login Page',  // Scanning the Info Page
    url: 'https://www.apartments.com/',   // Navigating to the url provided
    testOptions: {
      actions: [
      ]
    }
  },
]

// Set up test scan with Standard 508 config
function runTest(test) {
  test.testOptions.screenCapture = './accessability-test/output/' + test.name +'.png'
  var options = { 
    ...test.testOptions, 
    standard: 'Section508'};  //standard: 'Section508'}; standard: 'WCAG2AAA'; "WCAG2A"; WCAG2AA}; 
  pa11y(test.url, options).then((results) => {
      results.screenGrab = test.name + '.png';
      var htmlResults = accReporter.process(results, test.url, true);
      fs.writeFile('accessability-test/output/'+ test.name + '.html', htmlResults, function(err) {})
  }).catch((err) => {
    console.log(err);
  });
}

for (var i = 0; i < tests.length; i++) {
  runTest(tests[i])
}

var htmlResults = accReporter.buildDashboard(tests, 'VSFS Pa11y test Demo ("Chrome" browser recommended to open the report)');
fs.writeFile('accessability-test/output/index.html', htmlResults, function(err) {})