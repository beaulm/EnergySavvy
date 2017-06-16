//Print the peak usage for a particular building
exports.peakUsage = function(building) {

  //Get the highest value for a particular day
  let max = building.days[0].peak();

  //Print our answer to the user
  console.log(`${max.usage} kWh at ${max.hour}:00`);

}

//Print the expected savings for a particular building for a particular timeframe at a certain rate
exports.expectedSavings = function(building, start, end, rate) {

  //If start isn't a reasonable number
  if(typeof start !== 'number' || !Number.isInteger(start) || start < 0 || start > 23) {

    //Throw an error
    return new Error(`"${start}" is not a valid start time for the expected savings window`);

  }

  //If end isn't a reasonable number
  if(typeof end !== 'number' || !Number.isInteger(end) || end < 0 || end > 23) {

    //Throw an error
    return new Error(`"${end}" is not a valid end time for the expected savings window`);

  }

  //If the end time is before the start time
  if(end < start) {

    //Say sumpin' about it
    console.log('An end time of less than the start time was supplied to expectedSavings. Switching them and carrying on anyway.');

    //But switch 'em around and proceed anyway
    let temp = end;
    end = start;
    start = temp;

  }

  //Make sure the rate is reasonable
  if(typeof rate !== 'number' || rate < 0 || rate > 1) {

    //Warn the user
    let error = `Invalid rate (${rate}) supplied to expectedSavings`;
    console.log(error);

    //If it looks like they just didn't put it in decimal format
    if(typeof rate === 'number' && rate >= 0) {

      console.log('Converting to a decimal for you');

      //Fix it for them
      rate = rate/100;

    }

    //Otherwise
    else {

      return new Error(error);

    }

  }

  //Get the usage between the times specified
  let usage = building.days[0].between(start, end);

  //Calculate how much we could expect to save
  let savings = usage*rate;

  //Print our answer to the user
  console.log(`${savings} kWh`);

}
