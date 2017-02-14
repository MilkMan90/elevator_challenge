const moment = require('moment')

export default class Elevator {
  constructor() {
    this.state = 'idle'; //'broken' or 'moving'
    this.currentFloor = 0;
    this.riders = [];
    this.requests = [];
    this.numberOfRequests = this.requests.length;
    this.stops = 0;
    this.floors = 0;
  }

  reset() {
    this.constructor()
  }

  requestFloor(person, floor){
    this.requests.push(Object.assign(person, {floor}))
    //run requests
    this.runElevator()
  }

  moveToPickup(request){
    let pickupFloor = request.currentFloor;
    let floorsToPerson = Math.abs(this.currentFloor - pickupFloor)
    this.currentFloor = request.currentFloor;
    this.floors += floorsToPerson;
    this.stops += 1;
  }

  moveToDropoff(request){
    let pickupFloor = request.currentFloor;
    let floorsToDropoff = Math.abs(pickupFloor - request.floor)
    this.floors += floorsToDropoff;
    this.stops += 1;
    this.currentFloor = request.floor;

    this.requests.shift();
  }

  runElevator(){
    this.state = 'moving';
    this.moveToPickup(this.requests[0])
    this.moveToDropoff(this.requests[0])
    if(this.requests.length > 0){
      runElevator()
    }

    this.state = 'idle';

    if(moment().hour() < 12){
      this.currentFloor = 0;
    }
  }

}
