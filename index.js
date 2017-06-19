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
  auto_parse: true,
  columns: true,
  relax: true,
  relax_column_count: true,
  skip_empty_lines: true
});

//Initialize a variable to keep track of the last building added
let lastBuilding = null;

//For each row in the data set
parser.on('readable', () => {

  let record = null;

  while((record = parser.read()) !== null) {

    //Make sure the building_id is legit
    if(typeof String(record.building_id) !== 'string' || record.building_id.length === 0) {

      let lineNumber = parser.count + 3;
      console.log(record.building_id+' is not a valid building_id on line '+lineNumber);
      continue;

    }

    //Make sure the hour is valid
    if(typeof record.hour !== 'number' || !Number.isInteger(record.hour) || record.hour < 0 || record.hour > 23) {

      let lineNumber = parser.count + 3;
      console.log(record.hour+' is not a valid hour on line '+lineNumber);
      continue;

    }

    //Make sure the kwh_usage is valid
    if(typeof record.kwh_usage !== 'number' || record.kwh_usage < 0) {

      let lineNumber = parser.count + 3;
      console.log(record.kwh_usage+' is not a valid kwh_usage on line '+lineNumber);
      continue;

    }

    //If this is the first record for this building
    if(lastBuilding !== record.building_id && !buildings.hasOwnProperty(record.building_id)) {

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

    //Update our record of the last building added
    lastBuilding = record.building_id;

  }

});

//Catch errors reading the csv
parser.on('error', (err) => {

  console.log(err.message);

});

//When all the data has been read
parser.on('finish', async () => {

  let result = null;

  //Initialize an array to store commands coming in from stdin
  let command = ['', ''];

  //Until the user exits
  while(command[0] !== 'exit') {

    //Prompt the user for another command
    command = await new Promise((resolve, reject) => {

      let stdin = process.stdin,
          stdout = process.stdout;

      stdin.resume();
      stdout.write('Next command: ');

      stdin.once('data', (data) => {

          resolve(data.toString().trim().split(' '));

      });

    });

    //Run the appropriate command
    switch(command[0]) {

      case 'peak_usage':

        //If we don't have any records for this building
        if(!buildings.hasOwnProperty(command[1])) {

          //Throw an error
          console.log(`"${command[1]}" not in data set!`);
          break;

        }

        //Print the peak usage
        utilities.peakUsage(buildings[command[1]]);

        break;


      case 'expected_savings':

        //If we don't have any records for this building
        if(!buildings.hasOwnProperty(command[1])) {

          //Throw an error
          console.log(`"${command[1]}" not in data set!`);
          break;

        }

        //Print the expected savings
        result = utilities.expectedSavings(buildings[command[1]], 12, 18, .3);

        //If we failed to get the expected savings
        if(result instanceof Error) {

          //Tell the user about it
          console.log('Failed to get expected savings', result);

        }

        break;


      case 'exit':

        process.exit();

        break;


      default:

        console.log('Command not recognized.');
        console.log('Available commands: peak_usage, expected_savings, exit');

    }

  }

});

//Try to read whatever file the user specified
// console.log('Processing file');
let input = fs.createReadStream(args[0]);
input.pipe(parser);
