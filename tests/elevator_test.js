require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert = require('chai').assert
const Elevator = require('../elevator').default
const Person = require('../person').default

describe('Elevator', function() {
  const elevator = new Elevator()
  const alex = new Person("Alex", 2)

  afterEach(function() {
    elevator.reset();
  });

  it('should bring a rider to a floor above their current floor', () => {
    // Alex requests the elevator to take him from 2 to 5
    elevator.requestFloor(alex, 5)

    // Assert the current floor of the elevator is the drop off floor
    assert.equal(elevator.currentFloor, 5)
    // Assert the current status of the elevator is idle after drop off
    assert.equal(elevator.state, 'idle')
    // Assert the total number of stops is 2 after drop off
    assert.equal(elevator.stops, 2)
    // Assert the total number of floors traversed
    assert.equal(elevator.floors, 5)
  });

  it('should bring a rider to a floor below their current floor', () => {
    // Alex requests the elevator to take him from 2 to 5
    elevator.requestFloor(alex, 1)

    // Assert the current floor of the elevator is the drop off floor
    assert.equal(elevator.currentFloor, 1)
    // Assert the current status of the elevator is idle after drop off
    assert.equal(elevator.state, 'idle')
    // Assert the total number of stops is 2 after drop off
    assert.equal(elevator.stops, 2)
    // Assert the total number of floors traversed
    assert.equal(elevator.floors, 3)
  });

  const bob = new Person("Bob", 3)
  const sue = new Person("Sue", 6)

  it('should bring both riders to their desired floors - test 1', () => {
    // bob requests the elevator to take him from 3 to 9
    elevator.requestFloor(bob, 9)
    elevator.requestFloor(sue, 2)

    // Assert the current floor of the elevator is the drop off floor
    assert.equal(elevator.currentFloor, 2)
    // Assert the current status of the elevator is idle after drop off
    assert.equal(elevator.state, 'idle')
    // Assert the total number of stops is 2 after drop off
    assert.equal(elevator.stops, 4)
    // Assert the total number of floors traversed
    assert.equal(elevator.floors, 16)
  });

  // const bob = new Person("Bob", 3)
  // const sue = new Person("Sue", 6)
  //
  it('should bring both riders to their desired floors - Both Go Up', () => {
    // bob requests the elevator to take him from 3 to 9
    elevator.requestFloor(bob, 9)
    elevator.requestFloor(sue, 9)

    // Assert the current floor of the elevator is the drop off floor
    assert.equal(elevator.currentFloor, 9)
    // Assert the current status of the elevator is idle after drop off
    assert.equal(elevator.state, 'idle')
    // Assert the total number of stops is 2 after drop off
    assert.equal(elevator.stops, 4)
    // Assert the total number of floors traversed
    assert.equal(elevator.floors, 15)
  });

  // const bob = new Person("Bob", 3)
  // const sue = new Person("Sue", 6)
  //
  it('should bring both riders to their desired floors - Bob up sue down', () => {
    // bob requests the elevator to take him from 3 to 9
    elevator.requestFloor(bob, 10)
    elevator.requestFloor(sue, 1)

    // Assert the current floor of the elevator is the drop off floor
    assert.equal(elevator.currentFloor, 1)
    // Assert the current status of the elevator is idle after drop off
    assert.equal(elevator.state, 'idle')
    // Assert the total number of stops is 2 after drop off
    assert.equal(elevator.stops, 4)
    // Assert the total number of floors traversed
    assert.equal(elevator.floors, 19)
  });

  // const bob = new Person("Bob", 3)
  // const sue = new Person("Sue", 6)
  //
  it('should bring both riders to their desired floors - Bob down sue Up', () => {
    // bob requests the elevator to take him from 3 to 9
    elevator.requestFloor(bob, 1)
    elevator.requestFloor(sue, 9)

    // Assert the current floor of the elevator is the drop off floor
    assert.equal(elevator.currentFloor, 9)
    // Assert the current status of the elevator is idle after drop off
    assert.equal(elevator.state, 'idle')
    // Assert the total number of stops is 2 after drop off
    assert.equal(elevator.stops, 4)
    // Assert the total number of floors traversed
    assert.equal(elevator.floors, 13)
  });


  // const bob = new Person("Bob", 3)
  // const sue = new Person("Sue", 6)
  //
  it('should bring both riders to their desired floors - Bob down sue down', () => {
    // bob requests the elevator to take him from 3 to 1
    elevator.requestFloor(bob, 1)
    elevator.requestFloor(sue, 5)

    // Assert the current floor of the elevator is the drop off floor
    assert.equal(elevator.currentFloor, 5)
    // Assert the current status of the elevator is idle after drop off
    assert.equal(elevator.state, 'idle')
    // Assert the total number of stops is 2 after drop off
    assert.equal(elevator.stops, 4)
    // Assert the total number of floors traversed
    assert.equal(elevator.floors, 11)
  });


});
