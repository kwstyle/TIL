# 1 문법 맛보기

지금까지 JavaScript와는 다르게 ECMA Script6의 새로운 기능에 따른 문법들을 알아보자.

* let
기존 블록 스코프 개념이 없던 var 와 다르게 let은 블록 스코프 변수를 선언하는 키워드 이다. s선언과 동시에 값을 할당할 수 있다. 
var로 선언된 변수는 함수 스코프 변수이고 함수 밖에에 var로 선언된 변수는 전역 변수로 선언되었다.
우선 이전 방식인 var로 선언된 함수 스코프 변수에 대해서 알아보자.
```javascript
var a = 12; // 전역 접근 가능
function myFunction() {
    console.log(a);
    var b = 13;
    
    if(true) {
        var c = 14;
        console.log(b);
    }
    console.log(c);
    
}
myFunction();
```

실행결과는 다음과 같다.
```
12
13
14
```

if 문 밖에서도 변수 c에 접근이 가능하지만 다른 언어에서는 이해하기가 힘들다. 그런 혼동을 막기위해 let 이라는 ㄱ키워드가 등장했다
위에서도 말했지만 구분하자면 var 는 함수 스코프 변수, let은 블록 스코프 변수 이다. 당연한 얘기겠지만 블록안에서 정의하면 해당 블록에서만 접근이 가능하다.

```javascript
let a = 12;
function myFunction() {
    console.log(a);
    
    let b = 13;
    if(true) {
        let c = 14; 
        console.log(b);
    }
    console.log(c);
    
}

myFunction();
```

실행결과
```
12
13
Reference Error Exception
```

### 변수 재선언
var는 변수를 재선언 했을시 같은 스코프에 있는 값을 엎어쓴다. 하지만 let은 그렇지 않다. let으로 선언된 같은 스코프 안에 있는 변수를 다시 let으로 선언하면 SyntaxError 예외 상황이 발생한다.
```javascript
let a = 10;
let a = 20;
console.log(a);
```
결과 
```
SyntaxError: Identifier 'a' has already been declared
```


* const
* 펼침 연산자와 나머지 파라미터
* Iterable에서 해체 연산으로 데이터 및 객체 추출
* Arrow function
* 객체 프로퍼티를 새로운 구문으로 생성


