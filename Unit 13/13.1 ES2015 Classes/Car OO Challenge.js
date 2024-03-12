/* eslint-disable max-classes-per-file */
//  Part One
class Vehicle {
  constructor(make, model, year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  honk() {
    return 'Beep.';
  }

  toString() {
    return `The vehicle is a ${this.make} ${this.model} from ${this.year}.`;
  }
}

const myFirstVehicle = new Vehicle("Honda", "Monster Truck", 1999);

//  Part Two
class Car extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 4;
  }
}

const myFirstCar = new Car("Toyota", "Corolla", 2005);

//  Part Three
class Motorcycle extends Vehicle {
  constructor(make, model, year) {
    super(make, model, year);
    this.numWheels = 2;
  }

  revEngine() {
    return 'VROOM!!!';
  }
}

const myFirstMotorcycle = new Motorcycle("Honda", "Nighthawk", 2000);

//  Part Four
class Garage {
  constructor(capacity) {
    this.vehicles = [];
    this.capacity = capacity;
  }

  add(newVehicle) {
    if (!(newVehicle instanceof Vehicle)) {
      return 'Only vehicles are allowed in here!';
    }
    if (this.vehicles.length >= this.capacity) {
      return 'Sorry, we\'re full.';
    }

    this.vehicles.push(newVehicle);
    return 'Vehicle added!';
  }
}

const garage = new Garage(2);
