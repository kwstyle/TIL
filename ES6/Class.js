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
        return '[Administrator] ' + super.say();
    }
}

var user = new User('Alice');
console.log(user.say()); // My name is Alice

var admin = new Admin('Bob');
console.log(admin.say()); // [Administrator] My name is Bob

class Test {
    constructor() {
        console.log('constructor');
    }
}

const test = new Test('');

console.log(test);
