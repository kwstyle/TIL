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
문서 내의 엘리먼트 공간을 배치(layout), 정렬(align)및 분산(distribute)하는 효율적인 방법을 제공한다

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
display: flex 또는 display:inline-flex를 설정하면 끝.

flex display만 선언하면 Flexbox모델이 시작되지만 조의해야할점은 자식 엘리먼트가 자동으로 flex item이 된다는 것이다

#### 중요한 포인트
1. flex container: display:flex를 설정한 부모 엘트리먼
2. flex items: flex container 내의 자식 엘리먼트

## Flex Container 프로퍼티
Flex-direction, Flex-wrap, flex-flow, justify-content, align-items, align-content

위에 섹션에서 몇가지 기본 원칙을 설명했다 이제는 활용을 해보자
flex container를 설멍하면 두가지 정렬 속성을 사용할 수 있다

그리고 블록 요소의 너비 속성을 width: 200px; 로 정의하는 것처럼 flex container가 같을 수 있는 6가지 속성이 있다.

#### 1. flex-direction
```css
ul {
    flex-direction: row || column || row-reverse || column-reverse;
}
```
flex-driection 속성은 아이템이 배치되는 방법을 결정한다. 수평(horizontally), 수직(vertically) 그리고 양방향의 반대 (reversed)
Flexbox 모델에서는 이것을 주축(main axis) 및 교차축(cross axis)라고 부른다 기본값으로 주축 방향을 왼쪽에서 오른쪽으로 배치는 수평과 같이 느껴진다
교차축은 위에서 아래로 배치되는 수직과 같다
기본적으로 flex-direction의 속성은 행(row)으로 설정되고 주축을 따라 플렉스 아이템을 정렬한다
flex-direction 속성이 열(column)로 변경되면 플렉스 아이템이 교차축을 따라 결정된다.

#### 2. flex-wrap
flex-wrap 속성은 다음 세가지 속값중 하나를 가진다
```css
ul {
    flex-direction: wrap || no-wrap || wrap-reverse;
}
```

자, 우선 ul에 좀더 많은 아이템을 추가해보자. 크기가 조정되거나 아템을 다른줄에 나눌까?
플렉스 컨테이너는 새로 추가된 플렉스 아이템을 수용하도록 조정한다.
브라우저를 가로로 스크롤 해야하는 경우에도 모든 자식 요소에 맞게 조정한다.
이것은 모든 플렉스 컨테이너의 기본 동적이다 플렉스 컨테이너는 더 많은 플렉스 아이템을 한줄에 계속해서 수용한다.
flex-wrap속성의 기본값은 no-wrap 이다
해당 속성값을 wrap로 변경하게 되면 컨테이너는 아이템을 기본 너비로 더이상 포함할수 없다면 여러줄로 나뉘어진다.
wrap-reverse이라면 아래줄부터 채운다.

#### 3. flex-flow
flex-flow는 flex-direction 및 flex-wrap 값의 약칭 속성이다
위에 설명한 두개의 속성을 하나로 선언한다

```css
ul {
    flex-flow: row wrap;
}
```

#### 4. justify-content
justify-content 속성은 아래 5가지 값 중 하나를 갖는다.
```css
ul {
    justify-content : flex-start || flex-end || center || space-between || space-around
}
```
justify-content 는 정렬에 관련된 속성인데 주축(main axis)에서 플렉스 아ㅣ이템을 배치하는 방법을 정의한다.

##### 1) flex-start
기본 값이 flex-start 아이템을 주축의 시작 부분으로 그룹화 한다.

##### 2) flex-end
주축의 끝으로 그룹화한다.

##### 3) center
 예상대로 아이템을 주축을 따라 중앙에 배치한다

##### 4) space-between
플렉스 항목간에 동일한 간격을 유지한다.

##### 5) space-around
아이템 주위까지 해서 동일한 간격을 유지한다.

#### 5. Align-times
```css
ul {
    align-items : flex-start || flex-end || center || stretch || baseline
}
```
align-items는 교차축에 배치되는 방법을 정의한다 이것이 justify-content와 차이점이다.
기본값은 stretch이다 이것은 플렉스 아이템이 플렉스 컨테이너의 전체 높이를 채울 수 있도록 플렉스 아이템을 늘린다.(stretch)

#### 6. Align-content




















