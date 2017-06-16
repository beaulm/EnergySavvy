let assert = require('chai').assert;
let Building = require('../building');

describe('Building', () => {

  it('should be able to store a list of days', () => {

    let newBuilding = new Building();
    assert.isArray(newBuilding.days[0].hours);

  });


  it('should be able to add records to a day', () => {

    let newBuilding = new Building();
    newBuilding.addUsge(null, 1, 4.898962);
    assert.equal(4.898962, newBuilding.days[0].hours[1]);

    newBuilding.addUsge(1, 1, 5.898962);
    assert.equal(5.898962, newBuilding.days[1].hours[1]);

  });


  it('shouldn\'t accept any bad data', () => {

    let newBuilding = new Building();

    try {
      newBuilding.addUsge('a', 1, 4.898962);
    } catch (e) {
      assert.throws(e);
    }

    try {
      newBuilding.addUsge(-1, 1, 4.898962);
    } catch (e) {
      assert.throws(e);
    }

    try {
      newBuilding.addUsge(1.1, 1, 4.898962);
    } catch (e) {
      assert.throws(e);
    }

    try {
      newBuilding.addUsge(null, 'a', 4.898962);
    } catch (e) {
      assert.throws(e);
    }

    try {
      newBuilding.addUsge(null, 1.1, 4.898962);
    } catch (e) {
      assert.throws(e);
    }

    try {
      newBuilding.addUsge(null, -1, 4.898962);
    } catch (e) {
      assert.throws(e);
    }

    try {
      newBuilding.addUsge(null, 25, 4.898962);
    } catch (e) {
      assert.throws(e);
    }

    try {
      newBuilding.addUsge(null, 1, 'a');
    } catch (e) {
      assert.throws(e);
    }

    try {
      newBuilding.addUsge(null, 1, -4.898962);
    } catch (e) {
      assert.throws(e);
    }

  });

});
