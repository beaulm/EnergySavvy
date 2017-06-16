#!/usr/bin/env node

const fs = require('fs');
const parse = require('csv-parse');
const Building = require('./building');
const utilities = require('./utilities');

//Get the input arguments. TODO: Could/should use `commander` library
let args = process.argv.slice(2);

//Initialize a list of buildings
let buildings = {};

//Create the parser
let parser = parse({
  columns: true,
  auto_parse: true,
  relax: true,
  skip_empty_lines: true
});

//For each row in the data set
parser.on('readable', function() {

  let record = null;

  while((record = parser.read()) !== null) {

    //Make sure the building_id is legit
    if(typeof record.building_id !== 'string' || record.building_id.length === 0) {

      console.log(record.building_id+' is not a valid building_id');
      continue;

    }

    //Make sure the hour is valid
    if(typeof record.hour !== 'number' || !Number.isInteger(record.hour) || record.hour < 0 || record.hour > 23) {

      console.log(record.hour+' is not a valid hour');
      continue;

    }

    //Make sure the kwh_usage is valid
    if(typeof record.kwh_usage !== 'number' || record.kwh_usage < 0) {

      console.log(record.kwh_usage+' is not a valid kwh_usage');
      continue;

    }

    //If this is the first record for this building TODO: Possible optimization here
    if(!buildings.hasOwnProperty(record.building_id)) {

      //Add the new building to our list of buildings
      buildings[record.building_id] = new Building();

    }

    //Try to add a new record for this building
    let result = buildings[record.building_id].addUsge(null, record.hour, record.kwh_usage);

    //If the insert failed
    if(result instanceof Error) {

      //Tell the user about it
      console.log('Failed to add record', result);

    }

  }

});

//Catch errors reading the csv
parser.on('error', function(err) {

  console.log(err.message);

});

//When all the data has been read
parser.on('finish', function() {

  let result = null;

  //Run the appropriate command
  switch(args[1]) {

    case 'peak_usage':

      //If we don't have any records for this building
      if(!buildings.hasOwnProperty(args[2])) {

        //Throw an error
        console.log(`"${args[2]}" not in data set!`);
        return false;

      }

      //Print the peak usage
      utilities.peakUsage(buildings[args[2]]);

      break;

    case 'expected_savings':

      //If we don't have any records for this building
      if(!buildings.hasOwnProperty(args[2])) {

        //Throw an error
        console.log(`"${args[2]}" not in data set!`);
        return false;

      }

      //Print the expected savings
      result = utilities.expectedSavings(buildings[args[2]], 12, 18, .3);

      //If we failed to get the expected savings
      if(result instanceof Error) {

        //Tell the user about it
        console.log('Failed to get expected savings', result);

      }

      break;
  }

});

//Try to read whatever file the user specified
// console.log('Processing file');
let input = fs.createReadStream(args[0]);
input.pipe(parser);
