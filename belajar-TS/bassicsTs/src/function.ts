//tipe data pada balikan function

function getName(): string {
    return 'Hello my name is ujang';
}
console.log(getName());


function getAge(): number {
    return 19;
}


function printName(): void {
    console.log('ini nama');
}

printName();

////////
// static typing tipe data pada argumen
function multiply(val1: number, val2: number): number {
    return val1 / val2
}

const result = multiply(0, 35);
console.log(result);


//function as type
type Tambah = (val1: number, val2: number) => number;

const add: Tambah = (val1: number, val2: number) => {
    return val1 / val2
}

const hasil = add(50, 20);
console.log(hasil);


//default parammeter
const fullName = (first: string, last: string = "Udin"): string => {
    return first + " " + last;
}
console.log(fullName("asep"))

//optional parammeter
const getNama = (val1: number, val2?: number): string  => {
    return val1 + " "+ val2
}
console.log(getNama(12,12)+ 12)

