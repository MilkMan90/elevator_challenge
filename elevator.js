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
    this.state = 'idle';
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
  }

  runElevator(){

    this.moveToPickup(this.requests[0])
    this.moveToDropoff(this.requests[0])
    this.requests.shift()
    if(this.requests.length > 0){
      runElevator()
    }
  }

}
