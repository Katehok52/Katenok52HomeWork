const car = {
    name: 'котёнок',
    mark: 'мурка',
    birth: 1945,
    isBroken: true,
    beepBeep: function (beepBeep) {
        console.log('Мяу-мяу')
    }
}

const carsOwner = {
    name: "Katehok",
    surname: "Amogus",
    age: 987,
    cars: [ car ],
}

console.log(car)
console.log(carsOwner)
car.beepBeep()

const people = [];
people.push("Stepan");
people.push("Katehok");
people.unshift("Alex");
console.log(people);

let someone = people.pop();
console.log(someone);
console.log(people);

let someone2 = people.shift();
console.log(someone2);
console.log(people);

// push     pop
// unshift  shift

console.log(people.indexOf("Katehok"))
console.log(people.indexOf("Sanyok"))
console.log(people.includes("Katehok"))
console.log(people.includes("Sanyok"))

const evens = [];
const maxValue = 1000;

let value = 0
while(value < 1000) {
    if(value % 2 == 0) evens.push(value)
    value++;
}
console.log(evens)

for (let i = 0; i <= maxValue; i += 2) evens.push(i);
console.log(evens);