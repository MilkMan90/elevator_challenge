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

  requestFloor(person, desiredFloor){
    this.requests.push(Object.assign(person, {desiredFloor}))
    //run requests
    if(this.state === 'idle'){
      this.runElevator()
    }
  }

  elevatorMove(floor){
    let floorsMoved = Math.abs(this.currentFloor - floor)

    let promise = new Promise((resolve, reject)=>{
      setTimeout(()=>{
        this.currentFloor = floor;
        this.floors += floorsMoved;
        this.stops += 1;
        resolve()
      }, 50)
    })

    return promise
  }

  runElevator(){
    this.state = 'moving';
    this.elevatorMove(this.requests[0].currentFloor).then(()=>{
      this.elevatorMove(this.requests[0].desiredFloor).then(()=>{
        this.requests.shift();
        if (this.requests.length > 0){
          this.runElevator()
        } else {
          if (moment().hour() < 12){
            this.elevatorMove(0).then(()=>{
              this.state = 'idle'
            })
          } else {
            this.state = 'idle'
          }
        }
      })
    })
  }

}
