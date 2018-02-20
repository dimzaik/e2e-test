const fs = require('fs')
const XLSX = require('xlsx');
const pwd = process.cwd();
const mkdirp = require('mkdirp');

converter('testdata.xls', 'testdata.json');
function converter(inputFile, outputFile) {
const src = 'data/'+inputFile;
const dest = 'data/';

const workbook = XLSX.readFile(src);



    var result = {};
    workbook.SheetNames.forEach(function(sheetName) {
        var data = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if(data.length > 0){
            result[sheetName] = data;
        }
    });
	
	const outputFolder = '${pwd}/data/';
    var json = JSON.stringify(result, null, 4)

    fs.writeFile('${outputFolder}/'+outputFile, json, 'utf8');

	mkdirp.sync(dest);
}
/*
converter('testdata.xls');
function converter(filename) {
	var self = {};
	var xls = require('xlsjs');
	self.workbook = null;
	self.sheet = null;

	self.readFile = function(filename) {
		self.workbook = xls.readFile('data/'+filename);		
		self.sheetNames = self.workbook.SheetNames;
	}

	self.readFile(filename);

	self.selectSheet = function(sheet) {
		sheet = (typeof sheet == "string" || typeof sheet == "number") ? sheet : 0;
		self.sheet = self.workbook.Sheets[self.workbook.SheetNames[sheet]];
		return self;
	};

	self.toJSON = function(filename, sheetnr) {

		if(filename) self.readFile(filename);
		if(sheetnr) self.selectSheet(0);
		if(!self.sheet) self.selectSheet(0);

		var data = xls.utils.sheet_to_json(self.sheet);

		return data;
	};	

	self.uttak = self.toJSON().filter(function(item, i){
		return !!item.Uttak;
	});
	
	self.innskudd = self.toJSON().filter(function(item, i){
		return !!item.Innskudd;
	})
	
	return self;
}
*/
module.exports = converter;
