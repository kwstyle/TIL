'use strict';

var a = 12;
function myFunction(...pageCount) {
    console.log(pageCount)
    console.log(a);

    var b = 13;
    if(true) {
        let c = 14;
        console.log(b);

    }
}

myFunction(1, 2, 3);


