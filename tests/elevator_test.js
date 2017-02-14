require('babel-core/register')({
  ignore: /node_modules\/(?!ProjectB)/
});

const assert = require('chai').assert
const Elevator = require('../elevator').default
const Person = require('../person').default
const moment = require('moment')

describe('Elevator', function() {
  this.timeout(5000);
  const elevator = new Elevator()
  const alex = new Person("Alex", 2)

  afterEach(function() {
    elevator.reset();
  });

  it('should bring a rider to a floor above their current floor', (done) => {
    // Alex requests the elevator to take him from 2 to 5
    elevator.requestFloor(alex, 5)

    setTimeout(()=>{

      if (moment().hour() < 12){
        // Assert the current floor of the elevator is the drop off floor
        assert.equal(elevator.currentFloor, 0)
        // Assert the total number of stops is 2 after drop off
        assert.equal(elevator.stops, 3)
        // Assert the total number of floors traversed
        assert.equal(elevator.floors, 10)
      } else {
        // Assert the current floor of the elevator is the drop off floor
        assert.equal(elevator.currentFloor, 5)
        // Assert the total number of stops is 2 after drop off
        assert.equal(elevator.stops, 2)
        // Assert the total number of floors traversed
        assert.equal(elevator.floors, 5)
      }

      // Assert the current status of the elevator is idle after drop off
      assert.equal(elevator.state, 'idle')

      done();
    }, 500)
  });

  it('should bring a rider to a floor below their current floor', (done) => {
    // Alex requests the elevator to take him from 2 to 1
    elevator.requestFloor(alex, 1)

    setTimeout(()=>{
      if (moment().hour() < 12){
        // Assert the current floor of the elevator is the drop off floor
        assert.equal(elevator.currentFloor, 0)
        // Assert the total number of stops is 2 after drop off
        assert.equal(elevator.stops, 3)
        // Assert the total number of floors traversed
        assert.equal(elevator.floors, 4)
      } else {
        // Assert the current floor of the elevator is the drop off floor
        assert.equal(elevator.currentFloor, 1)
        // Assert the total number of stops is 2 after drop off
        assert.equal(elevator.stops, 2)
        // Assert the total number of floors traversed
        assert.equal(elevator.floors, 3)
      }

      // Assert the current status of the elevator is idle after drop off
      assert.equal(elevator.state, 'idle')

      done();
    }, 500)
  });

  const bob = new Person("Bob", 3)
  const sue = new Person("Sue", 6)

  it('should bring both riders to their desired floors - test 1', (done) => {
    // bob requests the elevator to take him from 3 to 9
    elevator.requestFloor(bob, 9)
    // sue requests the elevator to take her from 6 to 2
    elevator.requestFloor(sue, 2)

    setTimeout(()=>{
      if (moment().hour() < 12){
        // Assert the current floor of the elevator is the drop off floor
        assert.equal(elevator.currentFloor, 0)
        // Assert the total number of stops is 2 after drop off
        assert.equal(elevator.stops, 5)
        // Assert the total number of floors traversed
        assert.equal(elevator.floors, 18)

      } else {
        // Assert the current floor of the elevator is the drop off floor
        assert.equal(elevator.currentFloor, 2)
        // Assert the current status of the elevator is idle after drop off
        assert.equal(elevator.state, 'idle')
        // Assert the total number of stops is 2 after drop off
        assert.equal(elevator.stops, 4)
        // Assert the total number of floors traversed
        assert.equal(elevator.floors, 16)
      }

      // Assert the current status of the elevator is idle after drop off
      assert.equal(elevator.state, 'idle')
      done();
    }, 500)
  });

  // const bob = new Person("Bob", 3)
  // const sue = new Person("Sue", 6)
  //
  it('should bring both riders to their desired floors - Both Go Up', (done) => {
    // bob requests the elevator to take him from 3 to 9
    elevator.requestFloor(bob, 9)
    elevator.requestFloor(sue, 9)

    setTimeout(()=>{
      if (moment().hour() < 12){
        // Assert the current floor of the elevator is the drop off floor
        assert.equal(elevator.currentFloor, 0)
        // Assert the current status of the elevator is idle after drop off
        assert.equal(elevator.state, 'idle')
        // Assert the total number of stops is 2 after drop off
        assert.equal(elevator.stops, 5)
        // Assert the total number of floors traversed
        assert.equal(elevator.floors, 24)

      } else {
        // Assert the current floor of the elevator is the drop off floor
        assert.equal(elevator.currentFloor, 9)
        // Assert the current status of the elevator is idle after drop off
        assert.equal(elevator.state, 'idle')
        // Assert the total number of stops is 2 after drop off
        assert.equal(elevator.stops, 4)
        // Assert the total number of floors traversed
        assert.equal(elevator.floors, 15)
      }

      // Assert the current status of the elevator is idle after drop off
      assert.equal(elevator.state, 'idle')

      done();
    }, 500)
  });

  // const bob = new Person("Bob", 3)
  // const sue = new Person("Sue", 6)
  //
  it('should bring both riders to their desired floors - Bob up sue down', (done) => {
    // bob requests the elevator to take him from 3 to 10
    elevator.requestFloor(bob, 10)
    elevator.requestFloor(sue, 1)

    setTimeout(()=>{
      if (moment().hour() < 12){
        // Assert the current floor of the elevator is the drop off floor
        assert.equal(elevator.currentFloor, 0)
        // Assert the current status of the elevator is idle after drop off
        assert.equal(elevator.state, 'idle')
        // Assert the total number of stops is 2 after drop off
        assert.equal(elevator.stops, 5)
        // Assert the total number of floors traversed
        assert.equal(elevator.floors, 20)

      } else {
        // Assert the current floor of the elevator is the drop off floor
        assert.equal(elevator.currentFloor, 1)
        // Assert the current status of the elevator is idle after drop off
        assert.equal(elevator.state, 'idle')
        // Assert the total number of stops is 2 after drop off
        assert.equal(elevator.stops, 4)
        // Assert the total number of floors traversed
        assert.equal(elevator.floors, 19)
      }

      // Assert the current status of the elevator is idle after drop off
      assert.equal(elevator.state, 'idle')

      done();
    }, 500)
  });

  // const bob = new Person("Bob", 3)
  // const sue = new Person("Sue", 6)
  //
  it('should bring both riders to their desired floors - Bob down sue Up', (done) => {
    // bob requests the elevator to take him from 3 to 9
    elevator.requestFloor(bob, 1)
    elevator.requestFloor(sue, 9)

    setTimeout(()=>{
      if (moment().hour() < 12){
        // Assert the current floor of the elevator is the drop off floor
        assert.equal(elevator.currentFloor, 0)
        // Assert the current status of the elevator is idle after drop off
        assert.equal(elevator.state, 'idle')
        // Assert the total number of stops is 2 after drop off
        assert.equal(elevator.stops, 5)
        // Assert the total number of floors traversed
        assert.equal(elevator.floors, 22)

      } else {
        // Assert the current floor of the elevator is the drop off floor
        assert.equal(elevator.currentFloor, 9)
        // Assert the current status of the elevator is idle after drop off
        assert.equal(elevator.state, 'idle')
        // Assert the total number of stops is 2 after drop off
        assert.equal(elevator.stops, 4)
        // Assert the total number of floors traversed
        assert.equal(elevator.floors, 13)
      }

      // Assert the current status of the elevator is idle after drop off
      assert.equal(elevator.state, 'idle')

      done();
    }, 500)
  });


  // const bob = new Person("Bob", 3)
  // const sue = new Person("Sue", 6)
  //
  it('should bring both riders to their desired floors - Bob down sue down', (done) => {
    // bob requests the elevator to take him from 3 to 1
    elevator.requestFloor(bob, 1)
    elevator.requestFloor(sue, 5)

    setTimeout(()=>{
      if (moment().hour() < 12){
        // Assert the current floor of the elevator is the drop off floor
        assert.equal(elevator.currentFloor, 0)
        // Assert the current status of the elevator is idle after drop off
        assert.equal(elevator.state, 'idle')
        // Assert the total number of stops is 2 after drop off
        assert.equal(elevator.stops, 5)
        // Assert the total number of floors traversed
        assert.equal(elevator.floors, 16)

      } else {
        // Assert the current floor of the elevator is the drop off floor
        assert.equal(elevator.currentFloor, 5)
        // Assert the current status of the elevator is idle after drop off
        assert.equal(elevator.state, 'idle')
        // Assert the total number of stops is 2 after drop off
        assert.equal(elevator.stops, 4)
        // Assert the total number of floors traversed
        assert.equal(elevator.floors, 11)
      }

      // Assert the current status of the elevator is idle after drop off
      assert.equal(elevator.state, 'idle')

      done();
    }, 500)
  });


});
