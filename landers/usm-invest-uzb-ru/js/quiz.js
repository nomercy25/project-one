const dom = {
    header: document.querySelector('header'),
    main: document.querySelector('main'),
    footer: document.querySelector('footer'),
    startBtn: document.querySelector('.main-btn'),
    footerBtn: document.querySelector('#footerBtn'),
    quizContainer: document.querySelector('.quiz'),
    quizButton: document.querySelector('.quiz__button'),
    quizButtonDot: document.querySelector('.quiz__button-dot'),
    footerCount: document.querySelector('.footer__count'),
    footerDotsInner: document.querySelector('.footer__dots'),
    footerDots: document.querySelectorAll('.footer__dot'),
    registration: document.querySelector('.registration'),
    // answerInputs:document.querySelectorAll('.answer-input'),
    form:document.querySelector('form'),
    
}
const css = {
    hidden: 'hidden',
    active: 'active',
    fadeOut: 'fade-out',
    click: 'click',
    inputInvalid: 'input--invalid',
}


let count = 0
const template = (title, buttons, imgNumber) => (`
        <img src="ajax/libs/intl-tel-input/17.0.8/img/logoq.png" style="width: 10%;">
        <div class="container">
        <h2>${title}</h2>
        <div class="quiz__inner">
            <div class="quiz__buttons">
            ${buttons.map(button =>`<button class="quiz__button" data-answer="${button}"><span class="quiz__button-dot"></span>${button}</button>`)}
            </div>
            <div class="quiz__img">
            <img src="ajax/libs/intl-tel-input/17.0.8/img/pic${imgNumber}.jpg" alt="${title}">
            </div>
        </div>
        </div>
`)
for (let i = 0; i < data.length; i++) {
    dom.form.innerHTML += `<input type="hidden" class="answer-input" name="answer-${i+1}">`
 }
const answerInputs = document.querySelectorAll('.answer-input')

function startQuiz() {
    dom.header.classList.add(css.fadeOut)
    dom.header.addEventListener('animationend', () => {
        dom.header.remove()
        dom.main.classList.remove(css.hidden)
        dom.quizContainer.innerHTML = template(data[count].title, data[count].buttons, count + 1)
        dom.footerCount.textContent = `Шаг ${count+1} из ${data.length}`
        data.forEach((item, index) => {
            dom.footerDotsInner.innerHTML += `<span class="footer__dot ${index === count? 'active' : ''}"></span>`
        })

    })


}
document.body.addEventListener('click', (e) => {
    let target = e.target

    if (target === dom.startBtn) {
        startQuiz()
    }
    if (target.className === 'quiz__button' || target.className === 'quiz__button-dot') {
        count++

        answerInputs[count-1].value = target.dataset.answer

        dom.main.classList.add(css.fadeOut)
        dom.footerCount.textContent = `Шаг ${count+1} из ${data.length}`
        dom.main.addEventListener('animationend', () => {
            if (count !== data.length) {
                dom.quizContainer.innerHTML = template(data[count].title, data[count].buttons, count + 1)
            }
            dom.footerDotsInner.innerHTML = ''
            dom.main.classList.remove(css.fadeOut)
            data.forEach((item, index) => {
                dom.footerDotsInner.innerHTML += `<span class="footer__dot ${index === count ? 'active' : ''}"></span>`
            })
        })

        if (count === data.length) {
            dom.quizContainer.classList.add(css.fadeOut)
            dom.footer.remove()
            dom.quizContainer.addEventListener('animationend', () => {
                dom.quizContainer.remove()
                dom.registration.classList.remove(css.hidden)
            })
        }
    }

    return
})