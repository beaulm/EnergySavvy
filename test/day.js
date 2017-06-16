let assert = require('chai').assert;
let Day = require('../day');

describe('Day', () => {

  it('should be able to hold a list of hours and kwh_usages', () => {

    let newDay = new Day();
    assert.isArray(newDay.hours);

  });


  it('should be able to find a peak time for a day', () => {

    let newDay = new Day();
    newDay.hours[1] = 4.898962;
    newDay.hours[2] = 4.725122;
    newDay.hours[3] = 5.889937;
    newDay.hours[4] = 7.055993;
    newDay.hours[5] = 8.147902;
    newDay.hours[6] = 9.526529;
    newDay.hours[7] = 9.654547;
    newDay.hours[8] = 9.497643;
    newDay.hours[9] = 7.656154;
    newDay.hours[10] = 6.922413;
    newDay.hours[11] = 4.821351;
    newDay.hours[12] = 5.117135;
    newDay.hours[13] = 6.103418;
    newDay.hours[14] = 7.221611;
    newDay.hours[15] = 10.372388;
    newDay.hours[16] = 12.876020;
    newDay.hours[17] = 15.434560;
    newDay.hours[18] = 18.041841;
    newDay.hours[19] = 18.205720;
    newDay.hours[20] = 16.776500;
    newDay.hours[21] = 15.114921;
    newDay.hours[22] = 12.123730;
    newDay.hours[23] = 8.830045;
    newDay.hours[0] = 6.439924;
    let peak = newDay.peak();
    assert.equal(18.20572, peak.usage);
    assert.equal(19, peak.hour);

    let shortDay = new Day();
    shortDay.hours[10] = 6.922413;
    shortDay.hours[11] = 4.821351;
    shortDay.hours[12] = 5.117135;
    shortDay.hours[13] = 6.103418;
    shortDay.hours[14] = 7.221611;
    peak = shortDay.peak();
    assert.equal(7.221611, peak.usage);
    assert.equal(14, peak.hour);

  });


  it('should be able to calculate all the power used during a time period', () => {
    
      let newDay = new Day();
      newDay.hours[1] = 4.898962;
      newDay.hours[2] = 4.725122;
      newDay.hours[3] = 5.889937;
      newDay.hours[4] = 7.055993;
      newDay.hours[5] = 8.147902;
      newDay.hours[6] = 9.526529;
      newDay.hours[7] = 9.654547;
      newDay.hours[8] = 9.497643;
      newDay.hours[9] = 7.656154;
      newDay.hours[10] = 6.922413;
      newDay.hours[11] = 4.821351;
      newDay.hours[12] = 5.117135;
      newDay.hours[13] = 6.103418;
      newDay.hours[14] = 7.221611;
      newDay.hours[15] = 10.372388;
      newDay.hours[16] = 12.876020;
      newDay.hours[17] = 15.434560;
      newDay.hours[18] = 18.041841;
      newDay.hours[19] = 18.205720;
      newDay.hours[20] = 16.776500;
      newDay.hours[21] = 15.114921;
      newDay.hours[22] = 12.123730;
      newDay.hours[23] = 8.830045;
      newDay.hours[0] = 6.439924;
      let used = newDay.between(12, 18);
      assert.equal(70.049838, used);

      let shortDay = new Day();
      shortDay.hours[10] = 6.922413;
      shortDay.hours[11] = 4.821351;
      shortDay.hours[12] = 5.117135;
      shortDay.hours[13] = 6.103418;
      shortDay.hours[14] = 7.221611;
      shortDay.hours[18] = 18.041841;
      used = shortDay.between(12, 18);
      assert.equal(31.366870000000002, used);

  });

});
