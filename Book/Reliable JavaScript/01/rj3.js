// 다른 전역 변수와 충돌을 피하기 위해 namespace를 생성
var w3 = {};

// svg 라는 하위 namespace 생성
w3.svg = {};

w3.svg.line = () => {
    var getX = (point) => {
            return point[0];
        },
        getY = (point) => {
            return point[1];
        },
        interpolate = (points) => {
            return points.join("L");
        }

    function line(data) {
        var segments = [],
            points = [],
            i = -1,
            n = data.length,
            d;

        function segment() {
            segments.push("M", interpolate(points));
        }

        while (++i < n) {
            d = data[i];
            points.push([
                +getX.call(this, d, i),
                +getY.call(this, d, i)
            ]);
        }
        if (points.length) {
            segment();
        }
        return segments.length ? segments.join("") : null;
    }

    line.x = function (funcToGetX) {
        if (!arguments.length) return getX;
        getX = funcToGetX;
        return line;
    };

    line.y = function (funcToGetY) {
        if (!arguments.length) return getY;
        getY = funcToGetY;
        return line;
    }

    return line;
}

var arrayData = [
    [10, 130],
    [100, 60],
    [190, 160],
    [280, 10]
],
    lineGenerator = w3.svg.line(),
    path = lineGenerator(arrayData);

console.log(path);