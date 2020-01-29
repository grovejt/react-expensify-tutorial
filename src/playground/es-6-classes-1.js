class Person {
  constructor(name = "Anynomous", age = 0) {
    this.name = name;
    this.age = age;
  }
  getGreeting() {
    return `Hi ${this.name}!`;
  }
  getDescription() {
    return `${this.name} is ${this.age} years old.`;
  }
}

class Student extends Person {
  constructor(name, age, major, classes = ["Unknown"]) {
    super(name, age);
    this.major = major;
    this.classes = classes;
  }
  hasMajor() {
    return !!this.major;
  }
  getDescription() {
    // return `${super.getDescription() (this.hasMajor() ? "There major is " + this.major : "")`;
    return `${super.getDescription()}` + (this.hasMajor() ? "There major is " + this.major : "");
  }
}

class Traveler extends Person {
  constructor(name, age, homeLocation) {
    super(name, age);
    this.homeLocation = homeLocation;
  }
  getGreeting() {
    return `Hi. I am ${this.name}.` + (this.homeLocation ? ` I'm visiting from ${this.homeLocation}` : "");
  }
}

const me = new Student("John", 55);
console.log(me.getDescription());
console.log(me);
console.log(me.hasMajor());
const other = new Person();
console.log(other.getGreeting(), other.getDescription());
const traveler1 = new Traveler("Andrew Mead", 26, "Philadelphia");
console.log(traveler1.getGreeting());
const traveler2 = new Traveler("Andrew Mead", 26);
console.log(traveler2.getGreeting());
