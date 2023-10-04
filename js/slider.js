// 초기시 필수 변수
let slides = document.querySelector('.slides'), //ul태그
    slide = document.querySelectorAll('.slides li'),//li태그 전부
    currentIndex = 0, //위치구분
    slideCount = slide.length,//슬라이드 개수
    slideWidth = document.querySelector('img').width, //슬라이드 넓이
    slideMargin = 10, //슬라이드 margin
    slideEventLocked = false;//이벤트 중복방지

/**li복사본 생성 및 slides클래스 넓이지정, 위치조정, animation추가 */
window.onload = function makeClone() {
    cloneImg();//이미지 복사
    updateWidth();//넓이 지정
    setInitialPos();//위치 지정
    setTimeout(function () {//애니메이션 추가
        slides.classList.add('animated');
    }, 100);
}

/**이미지 복사*/
function cloneImg() {
    //뒤에 5개의 이미지
    for (var i = 0; i < slideCount; i++) {
        var cloneSlide = slide[i].cloneNode(true);//클론 복사
        cloneSlide.classList.add('clone');
        slides.appendChild(cloneSlide);//뒤에추가
    }
    //앞에 5개의 이미지
    for (var i = slideCount - 1; i >= 0; i--) {
        var cloneSlide = slide[i].cloneNode(true);//클론 복사
        cloneSlide.classList.add('clone');
        slides.prepend(cloneSlide);//앞에추가
    }
}
/**넓이 지정 */
function updateWidth() {
    var currentSlides = document.querySelectorAll('.slides li');//복사이후 이미지 개수
    var newSlideCount = currentSlides.length;
    var newWith = (slideWidth + slideMargin) * newSlideCount - slideMargin + 'px';
    slides.style.width = newWith;//복사이후 이미지들을 감싸고 있는 것의 크기
}
/**위치지정 (가운데 정렬)*/
function setInitialPos() {
    var initialTranslateValue = -(slideWidth + slideMargin) * slideCount;//-(100+10)*5
    slides.style.transform = 'translateX(' + initialTranslateValue + 'px)';//가운데 정렬
}
/**이동버튼 함수*/
function moveBtn(mv) {
    let mvnum;
    if (mv == 'prev') {
        mvnum = currentIndex - 1;
    } else if (mv == 'next') {
        mvnum = currentIndex + 1;
    }
    moveSlide(mvnum);
}
/**양쪽끝으로 이동시 */
function moveSlide(num) {
    if (!slideEventLocked) {
        slides.style.left = -num * (slideWidth + slideMargin) + 'px';//위치지정
        currentIndex = num;
        slideEventLocked = true;
        // 양쪽 끝일경우
        if (currentIndex == slideCount || currentIndex == -slideCount) {
            setTimeout(() => {
                slides.classList.remove('animated');
                slides.style.left = '0px';
                currentIndex = 0;
            }, 500);

            setTimeout(() => {
                slides.classList.add('animated');
            }, 550);
        }
        setTimeout(() => {
            slideEventLocked = false;
        }, 500);
    }
}


