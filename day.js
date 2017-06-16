class Day {

  constructor() {

    this.hours = [];

    return this;

  }

  //Find the hour with the highest usage amount TODO: Could also have: min, avg, median
  peak(){

    //Initialize a variable to store the current highest usage on this day
    let highest = 0;

    //Initialize a variable to store the index of the time with the current highest usage
    let index = 0;

    //For every hour
    this.hours.forEach((value, i) => {

      //If the current hour has a higher max than any we've seen so far
      if(value > highest) {

        //Update our current highest
        highest = value;
        index = i;
      }

    });

    //Return an object with the highest hour and value
    return {hour: index, usage: highest};
  }

  //Figure out how much power is used during a given time frame
  between(start, end){

    //Initialize our usage variable
    let total = 0;

    //Go through every hour between the times specified
    for(let i=start+1; i<=end; i++) {

      //If we have a record for this hour
      if(this.hours[i] !== undefined) {

        //Add the usage to our running total
        total += this.hours[i];
      }

    }

    //Return the total amount of power used during the specified time frame
    return total;
  }

}

module.exports = Day;
