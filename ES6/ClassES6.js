/**
 * Created by ddpark on 2016. 7. 15..
 */

'use strict';
class User {
    constructor(name) {
        this._name = name;
    }

    say() {
        return 'My name is ' + this._name;
    }

}


class Admin extends User {
    say() {
        return '[Administrator]' + super.say();
    }
}

var user = new User('Alice');
console.log(user.say());
var admin = new Admin('Bob');

console.log(admin.say());

function loop(func, count = 3) {
    for(var i=0; i < count; i++){
        func();
    }
}

function sum(...numbers) {
    console.log(numbers);
    return numbers.reduce(function(a, b) {
        console.log(a, b);
        return a + b;
    });

}

loop(function() {console.log('hello'); }, 5);
console.log(sum(1,2,3,4,5));