export class User {


    constructor(public name: string, public age: number) {

    }

    setName(value: string): void {
        this.name = value
    }

    getName = (): string => {
        return this.name
    }
}

let user = new User('Doni', 20);
console.log(user.name, user.age);

//public = bisa diakses di semua class/dari luar class
//protected = hanya bisa di akses dari class tersebut dan class turunannya
//private = hanya bisa di akses pada class itu sendiri

class Admin extends User {
    read: boolean = true;
    write: boolean = true;

    getRole(): { read: Boolean, write: Boolean } {
        return {
            read: this.read,
            write: this.write
        }
    }
}
let admin = new Admin('udin', 20)
admin.age