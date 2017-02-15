const moment = require('moment')
const lodash = require('lodash')

export default class Elevator {
  constructor() {
    this.state = 'idle'; //'broken' or 'moving'
    this.direction = 'up';
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
    let direction;

    if(person.currentFloor - desiredFloor > 0){
      direction = 'down'
    } else {
      direction = 'up'
    }

    this.requests.push(Object.assign(person, {desiredFloor, direction}))
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

  getNextFloor(){
    let action = {
      floor: 0,
      action: 'pickup'
    }

    if(this.riders.length !== 0){
      action.floor = this.requests[0].currentFloor
      action.action = 'pickup'
      this.direction = this.requests[0].direction
      return action
    } else{
      if(this.requests.length === 0){
        action.floor = this.riders[0].desiredFloor
        action.action = 'dropoff'
        return action
      } else{
        action = this.findClosest()
      }
    }

    return action;
  }

  this.findClosest(){
    let currentFloor = this.currentFloor;

    //filter requests by direction

    let requestsByDirection = this.requests.filter( request => request.directon === this.direction)

    

  }

  runElevator(){
    this.state = 'moving';

    //find next goto//set direction
    //pick up or drop off person

    let destination = this.getNextFloor();

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
