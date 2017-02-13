export default class Elevator {
  constructor() {
    this.state = 'idle'; //'broken' or 'moving'
    this.currentFloor = 0;
    this.riders = [];
    this.requests = [];
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

  runElevator(){
    this.requests.forEach((request)=>{
      let pickupFloor = request.currentFloor;
      let floorsToPerson = Math.abs(this.currentFloor - pickupFloor)
      let floorsToDropoff = Math.abs(pickupFloor - request.floor)
      this.currentFloor = request.floor;
      this.floors = this.floors + floorsToPerson + floorsToDropoff;
      this.stops += 2
      this.requests.shift()
    })
  }

}
