// 초기시 필수 변수
let slides = document.querySelector('.slides'), //ul태그
    slide = document.querySelectorAll('.slides li'),//li태그 전부
    currentIndex = 0, //위치구분
    slideCount = slide.length,//슬라이드 개수
    slideWidth = 100, //슬라이드 넓이
    slideMargin = 10, //슬라이드 margin
    prevBtn = document.querySelector('.prev'),//이전버튼
    nextBtn = document.querySelector('.next');//다음버튼

//동작 시작
makeClone();

/**li복사본 생성 및 slides클래스 넓이지정, 위치조정, animation추가 */
function makeClone() {
    for (var i = 0; i < slideCount; i++) {
        var cloneSlide = slide[i].cloneNode(true);//클론 복사
        cloneSlide.classList.add('clone');
        slides.appendChild(cloneSlide);
    }
    for (var i = slideCount - 1; i >= 0; i--) {
        var cloneSlide = slide[i].cloneNode(true);//클론 복사
        cloneSlide.classList.add('clone');
        slides.prepend(cloneSlide);
    }
    updateWidth();
    setInitialPos();
    setTimeout(function () {
        slides.classList.add('animated');
    }, 100);
    console.log(currentIndex, slideCount);
}
/**넓이 지정 */
function updateWidth() {
    var currentSlides = document.querySelectorAll('.slides li');
    var newSlideCount = currentSlides.length;
    var newWith = (slideWidth + slideMargin) * newSlideCount - slideMargin + 'px';

    slides.style.width = newWith;

}
/**위치지정 */
function setInitialPos() {
    var initialTranslateValue = -(slideWidth + slideMargin) * slideCount;
    slides.style.transform = 'translateX(' + initialTranslateValue + 'px)';
}

//이벤트

nextBtn.addEventListener('click', function () {
    moveSlide(currentIndex + 1);
});
prevBtn.addEventListener('click', function () {
    moveSlide(currentIndex - 1);
});
function moveSlide(num) {
    slides.style.left = -num * (slideWidth + slideMargin) + 'px';//위치지정
    currentIndex = num;
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
    console.log(currentIndex, slideCount);
}