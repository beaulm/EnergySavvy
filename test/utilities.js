let assert = require('chai').assert;
let expect = require('chai').expect;
let sinon  = require('sinon');
let Building = require('../building');
let utilities = require('../utilities');

describe('peakUsage', () => {

  it('should be able to find the peak usage for a given time period', () => {

    let spy = sinon.spy(console, 'log');

    let newBuilding = new Building();

    newBuilding.addUsge(null, 1, 4.898962);
    newBuilding.addUsge(null, 2, 4.725122);
    newBuilding.addUsge(null, 3, 5.889937);
    newBuilding.addUsge(null, 4, 7.055993);
    newBuilding.addUsge(null, 5, 8.147902);
    newBuilding.addUsge(null, 6, 9.526529);
    newBuilding.addUsge(null, 7, 9.654547);
    newBuilding.addUsge(null, 8, 9.497643);
    newBuilding.addUsge(null, 9, 7.656154);
    newBuilding.addUsge(null, 10, 6.922413);
    newBuilding.addUsge(null, 11, 4.821351);
    newBuilding.addUsge(null, 12, 5.117135);
    newBuilding.addUsge(null, 13, 6.103418);
    newBuilding.addUsge(null, 14, 7.221611);
    newBuilding.addUsge(null, 15, 10.372388);
    newBuilding.addUsge(null, 16, 12.876020);
    newBuilding.addUsge(null, 17, 15.434560);
    newBuilding.addUsge(null, 18, 18.041841);
    newBuilding.addUsge(null, 19, 18.205720);
    newBuilding.addUsge(null, 20, 16.776500);
    newBuilding.addUsge(null, 21, 15.114921);
    newBuilding.addUsge(null, 22, 12.123730);
    newBuilding.addUsge(null, 23, 8.830045);
    newBuilding.addUsge(null, 0, 6.439924);

    utilities.peakUsage(newBuilding);

    assert(spy.calledWith('18.20572 kWh at 19:00'));

    spy.restore();

  });

});

describe('expectedSavings', () => {

  it('should be able to find the expected savings', () => {

    let spy = sinon.spy(console, 'log');

    let newBuilding = new Building();

    newBuilding.addUsge(null, 1, 4.898962);
    newBuilding.addUsge(null, 2, 4.725122);
    newBuilding.addUsge(null, 3, 5.889937);
    newBuilding.addUsge(null, 4, 7.055993);
    newBuilding.addUsge(null, 5, 8.147902);
    newBuilding.addUsge(null, 6, 9.526529);
    newBuilding.addUsge(null, 7, 9.654547);
    newBuilding.addUsge(null, 8, 9.497643);
    newBuilding.addUsge(null, 9, 7.656154);
    newBuilding.addUsge(null, 10, 6.922413);
    newBuilding.addUsge(null, 11, 4.821351);
    newBuilding.addUsge(null, 12, 5.117135);
    newBuilding.addUsge(null, 13, 6.103418);
    newBuilding.addUsge(null, 14, 7.221611);
    newBuilding.addUsge(null, 15, 10.372388);
    newBuilding.addUsge(null, 16, 12.876020);
    newBuilding.addUsge(null, 17, 15.434560);
    newBuilding.addUsge(null, 18, 18.041841);
    newBuilding.addUsge(null, 19, 18.205720);
    newBuilding.addUsge(null, 20, 16.776500);
    newBuilding.addUsge(null, 21, 15.114921);
    newBuilding.addUsge(null, 22, 12.123730);
    newBuilding.addUsge(null, 23, 8.830045);
    newBuilding.addUsge(null, 0, 6.439924);

    utilities.expectedSavings(newBuilding, 12, 18, .3);

    assert(spy.calledWith('21.014951399999998 kWh'));

    spy.restore();

  });


  it('shouldn\'t accept bad inputs', () => {

    let newBuilding = new Building();

    expect(utilities.expectedSavings(newBuilding, 'a', 18, .3)).to.be.instanceof(Error);
    expect(utilities.expectedSavings(newBuilding, 1.1, 18, .3)).to.be.instanceof(Error);
    expect(utilities.expectedSavings(newBuilding, -1, 18, .3)).to.be.instanceof(Error);
    expect(utilities.expectedSavings(newBuilding, 25, 18, .3)).to.be.instanceof(Error);

    expect(utilities.expectedSavings(newBuilding, 1, 'a', .3)).to.be.instanceof(Error);
    expect(utilities.expectedSavings(newBuilding, 1, 18.1, .3)).to.be.instanceof(Error);
    expect(utilities.expectedSavings(newBuilding, 1, -18, .3)).to.be.instanceof(Error);
    expect(utilities.expectedSavings(newBuilding, 1, 25, .3)).to.be.instanceof(Error);

    expect(utilities.expectedSavings(newBuilding, 12, 18, 'a')).to.be.instanceof(Error);
    expect(utilities.expectedSavings(newBuilding, 12, 18, -1)).to.be.instanceof(Error);

  });

  it('should fix kinda bad inputs', () => {

    let spy = sinon.spy(console, 'log');

    let newBuilding = new Building();

    newBuilding.addUsge(null, 1, 4.898962);
    newBuilding.addUsge(null, 2, 4.725122);
    newBuilding.addUsge(null, 3, 5.889937);
    newBuilding.addUsge(null, 4, 7.055993);
    newBuilding.addUsge(null, 5, 8.147902);
    newBuilding.addUsge(null, 6, 9.526529);
    newBuilding.addUsge(null, 7, 9.654547);
    newBuilding.addUsge(null, 8, 9.497643);
    newBuilding.addUsge(null, 9, 7.656154);
    newBuilding.addUsge(null, 10, 6.922413);
    newBuilding.addUsge(null, 11, 4.821351);
    newBuilding.addUsge(null, 12, 5.117135);
    newBuilding.addUsge(null, 13, 6.103418);
    newBuilding.addUsge(null, 14, 7.221611);
    newBuilding.addUsge(null, 15, 10.372388);
    newBuilding.addUsge(null, 16, 12.876020);
    newBuilding.addUsge(null, 17, 15.434560);
    newBuilding.addUsge(null, 18, 18.041841);
    newBuilding.addUsge(null, 19, 18.205720);
    newBuilding.addUsge(null, 20, 16.776500);
    newBuilding.addUsge(null, 21, 15.114921);
    newBuilding.addUsge(null, 22, 12.123730);
    newBuilding.addUsge(null, 23, 8.830045);
    newBuilding.addUsge(null, 0, 6.439924);

    utilities.expectedSavings(newBuilding, 18, 12, .3);

    assert(spy.calledWith('An end time of less than the start time was supplied to expectedSavings. Switching them and carrying on anyway.'));
    assert(spy.calledWith('21.014951399999998 kWh'));

    utilities.expectedSavings(newBuilding, 12, 18, 30);

    assert(spy.calledWith('Converting to a decimal for you'));
    assert(spy.calledWith('21.014951399999998 kWh'));

    spy.restore();

  });

});
