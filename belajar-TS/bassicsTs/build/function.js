"use strict";
//tipe data pada balikan function
function getName() {
    return 'Hello my name is ujang';
}
console.log(getName());
function getAge() {
    return 19;
}
function printName() {
    console.log('ini nama');
}
printName();
////////
// static typing tipe data pada argumen
function multiply(val1, val2) {
    return val1 / val2;
}
const result = multiply(0, 35);
console.log(result);
const add = (val1, val2) => {
    return val1 / val2;
};
const hasil = add(50, 20);
console.log(hasil);
//default parammeter
const fullName = (first, last = "Udin") => {
    return first + " " + last;
};
console.log(fullName("asep"));
//optional parammeter
const getNama = (val1, val2) => {
    return val1 + " " + val2;
};
console.log(getNama(12, 12) + 12);
