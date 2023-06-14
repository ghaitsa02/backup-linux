"use strict";
//enum
//numeric enum
var Mount;
(function (Mount) {
    Mount[Mount["JAN"] = 1] = "JAN";
    Mount[Mount["FEB"] = 2] = "FEB";
    Mount[Mount["MAR"] = 3] = "MAR";
    Mount[Mount["APR"] = 4] = "APR";
    Mount[Mount["MAY"] = 5] = "MAY";
})(Mount || (Mount = {}));
// console.log(Mount.JAN);
//string enum
var Bulan;
(function (Bulan) {
    Bulan["JAN"] = "Januari";
    Bulan["FEB"] = "Februari";
    Bulan["MAR"] = "Maret";
    Bulan["APR"] = "April";
    Bulan["MAY"] = "Mei";
})(Bulan || (Bulan = {}));
console.log(Bulan.JAN, Mount.JAN);
