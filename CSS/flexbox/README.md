# Flexbox

Flexbox에 익숙해지기 위해 필요한 모든 기본 개념에 대해 설명할 것이다
Flexbox를 처음 배우는 것은 재미있지 않을 수 있다 하지만 그만한 가치는 있다.
이것은 레이아웃을 잡는 현대적인방식을 토대로 하고 있으며
금방 사라지지 않을 것이다 새로운 표준으로 부상했으니 팔벌려 안아주자.
(React native에서도 Flexbox의 개념은 중요하다.)

## 당신이 배우게 될것

먼저 기본을 살펴보자. Flexbox를 이해하려는 시도느 여기서 시작해야한다고 생각한다.
CSS는 지난 몇 년동안 많이 발전했다 디자이너는 필터(filters), 트렌지션(transitions) 및 트랜스폼(transforms)이
추가된 것에 기뻐했다. 하지만 중요한 뭔가가 빠져있었다
Crafting Intelligent 페이지 레이아웃은 CSS를 사용해서 너무 오랫동안 지속되는 것처럼 보였으며 많은 사람들이 해킹된 CSS를 작성했다.
우리는 매번 float, table, display 핵 등을 다뤄야했다
우리는 해킹된 CSS속임수를 버릴 수 있다 더 이상 float, table-cell 디스플레이를 사용하지 않아도 된다.

### Flexbox란

specification에 따르면 Flexbox 모델은 Viewport 및 Element 크기가 동적이거나 알려지지 않은 경우에도
문서 내으 ㅣ엘리먼트 공간을 배치(layout), 정렬(align)및 분산(distribute)하는 효율적인 방법을 제공한다

너무 포멀하게 들릴 수 있다 하지만 금방 이해할 수 있을것이다.

### Flexbox 모델을 사용하려면 어떻게 해야할까
간단하다. Flexbox 모델을 사용하려면 먼저너 flex-container를 정의햐야한다.
일반적인 HTML에서 간단한 목록을 레이아웃 하는 것은 다음과 같다.

```html
<ul>
    <li></li>
    <li></li>
    <li></li>
</ul>
```

일반적으로 ul을 부모 엘리먼트 li를 자식 엘리먼트라고 부른다.
flexbox를 사용하려면 부모 엘리먼트를 flex container(AKA flexible container)로 만들어야한다.

