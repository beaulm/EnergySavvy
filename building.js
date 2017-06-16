const Day = require('./day');

class Building {

  constructor() {

    //TODO: Could be object instead of array for keyed access (such as by date)
    this.days = [new Day()];

    return this;

  }

  addUsge(day, hour, value) {

    //Make sure the day is valid
    if(day !== null && (typeof day !== 'number' || !Number.isInteger(day) || day < 0)) {

      return new Error(day+' is not a valid day');

    }

    //Make sure the hour is valid
    if(typeof hour !== 'number' || !Number.isInteger(hour) || hour < 0 || hour > 23) {

      return new Error(hour+' is not a valid hour');

    }

    //Make sure the value is valid
    if(typeof value !== 'number' || value < 0) {

      return new Error(value+' is not a valid value');

    }

    //If the day is null
    if(day === null) {

      //Just use day zero
      day = 0;

    }

    //If the supplied day doesn't currently exist
    if(this.days[day] === undefined) {

      //Add it!
      this.days[day] = new Day();

    }

    //Set the value for the specified day/hour
    this.days[day].hours[hour] = value;

    //Return this to allow method chaining
    return this;

  }

}

module.exports = Building;
