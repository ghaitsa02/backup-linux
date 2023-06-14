"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.getName = () => {
            return this.name;
        };
    }
    setName(value) {
        this.name = value;
    }
}
exports.User = User;
let user = new User('Doni', 20);
console.log(user.name, user.age);
//public = bisa diakses di semua class/dari luar class
//protected = hanya bisa di akses dari class tersebut dan class turunannya
//private = hanya bisa di akses pada class itu sendiri
class Admin extends User {
    constructor() {
        super(...arguments);
        this.read = true;
        this.write = true;
    }
    getRole() {
        return {
            read: this.read,
            write: this.write
        };
    }
}
let admin = new Admin('udin', 20);
admin.age;
