const form = document.querySelector('form')
const REDIRECT_URL = 'https://fasttraff.pro/yMmsT9vQ'
const modalOverlay = document.querySelector('.modal-overlay')

function sendLead(data) {
    modalOverlay.style.display = 'flex'
    fetch('callback.php', {
        method: 'POST',
        body: data
    })
        .then(response => response.text())
        .then(result =>{
            console.log(result)
            window.location.href = REDIRECT_URL + result + searchParams.replace('?','&')
            
        } )
        .catch(error => console.log('error', error));
}

const phone = form.elements.phone
const searchParams = window. location. search

function runIntlTelInputAndGeoIp(element) {
    return intlTelInput(element, {
        customPlaceholder: function (selectedCountryPlaceholder, selectedCountryData) {
            return selectedCountryPlaceholder
                .replace(/ /g, '')
                .replace(/-/g, '').replace(/\(/g, '')
                .replace(/\)/g, '');
        },
        autoHideDialCode: false,
        nationalMode: false,
        separateDialCode: false,
        autoPlaceholder: 'aggressive',
        placeholderNumberType: "MOBILE",
        initialCountry: "auto",
        // excludeCountries: ['ua'],
        utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.min.js",
        geoIpLookup: async (success, failure) => {
            const res = await fetch(`https://ipinfo.io/json?token=14a08cf404eb22`)
            const data = await res.json()
            let countryCode = (data && data.country) ? data.country : "us";
            success(countryCode);
        },
    });
}

let phoneInt = runIntlTelInputAndGeoIp(phone)
let isValid = false
const error = document.querySelector('.error')
phone.oninput = function () {

    const errorMap = [
        "Неправильный номер",
        "Неверный код страны",
        "Короткий номер",
        "Слишком длинный номер",
        "Неправильный номер",
        "Недопустимая длина",
    ]

    let phoneVal = phoneInt.getNumber(intlTelInputUtils.numberFormat.E164);
    if (phoneVal) {
        if (!phoneInt.isValidNumber()) {
            if (phoneInt.getValidationError() !== -99) {
                error.textContent = errorMap[phoneInt.getValidationError()]
                console.log(errorMap[phoneInt.getValidationError()]);;
                isValid = false
                phone.classList.add(css.inputInvalid)
            }
        } else {
            isValid = true
            phone.classList.remove(css.inputInvalid)
            error.textContent = ''
        }
    }
}


form.onsubmit = function (event) {
    event.preventDefault();
    const formData = new FormData(this)
    if (isValid) {
        sendLead(formData)

    }

}