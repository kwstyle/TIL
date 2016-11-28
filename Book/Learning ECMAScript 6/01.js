/**
 * Created by ddpark on 2016. 8. 26..
 */

// let a = 10;
// let a = 20;
// console.log(a);


function fn(a = 1, b = 2, c = a+b) {
    console.log(c);
}

fn(5)


function fn2(...arg) {
    console.log(arg);
}

fn2(1, 2, 3)


let {name : x , age: y} = {"name" : "kw", "age": 36};

console.log(x, y);


var obj = {
    f1:() => {
        console.log(this);
        var f2 = function() { console.log(this); }
        f2();
        setTimeout(f2, 2000);
    }
}
obj.f1();