
  $('#submit').click(function (event) {
    const lang = localStorage.getItem('language');

    const name = $('#name');
    const nameVal = name.val().trim();
    const subject = $('#subject');
    const subjectVal = subject.val().trim();
    const email = $('#email');
    const emailVal = email.val().trim();
    const msg = $('#msg');
    const msgVal = msg.val().trim();

    const year = $('#year');
    const yearVal = year.val();

    const date = new Date();

    const statusELM = $('.statusElm');
    statusELM.empty();

    const arrLang = {
      'en': {
        'name': 'Please, use your full name.',
        'subject': 'Please check the message subject. It should contain at least four characters.',
        'email': 'Please check if email is valid',
        'year': 'Please check that the current year is correct. This input serves as a protection against spam.',
        'msg' : 'Do you really send such a short message?'
      },
      'cs': {
        'name': 'Uveďte prosím celé své jméno.',
        'subject': 'Zkontrolujte si prosím předmět zprávy. Měl by obsahovat, alespoň čtyři znaky.',
        'email': 'Zkontrolujte si prosím správně vyplněný e-mail.',
        'year': 'Zkontrolujte si prosím správnost aktuálně vyplněného roku. Tento údaj nám slouží jako ochrana před spamem.',
        'msg' : 'Opravdu chcete poslat takto krátkou zprávu?'
      }
    }    

    // Validace jednotlivých prvků
    if (nameVal.length > 5 && nameVal.includes(' ')) {
      name.css('box-shadow', '0 0 0 1px black');

    } else {
      event.preventDefault();
      statusELM.append(`<div class="red-alert">${arrLang[lang].name}</div>`)
      addErrorEffect(name, 'shake');
    }

    if (subjectVal.length > 3) {
      subject.css('box-shadow', '0 0 0 1px black');
    } else {
      event.preventDefault();
      statusELM.append(`<div class="red-alert">${arrLang[lang].subject}</div>`)
      addErrorEffect(subject, 'shake');
    }

    if (emailVal.length > 5 && emailVal.includes('@') && emailVal.includes('.')) {
      email.css('box-shadow', '0 0 0 1px black');
    } else {
      event.preventDefault();
      statusELM.append(`<div class="red-alert">${arrLang[lang].email}</div>`)
      addErrorEffect(email, 'shake');
    }

    if (yearVal.length > 3 && yearVal == date.getFullYear()) {
      year.css('box-shadow', '0 0 0 1px black');
    } else {
      event.preventDefault();
      statusELM.append(`<div class="red-alert">${arrLang[lang].year}</div>`)
      addErrorEffect(year, 'shake');
    }

    if (msgVal.length > 10) {
      msg.css('box-shadow', '0 0 0 1px black');
    } else {
      event.preventDefault();
      statusELM.append(`<div class="red-alert">${arrLang[lang].msg}</div>`)
      addErrorEffect(msg, 'shake');
    }

  });



function addErrorEffect(elementName, animationName) {
  animationend = 'animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd';
  elementName.addClass(animationName).one(animationend, () => {
    elementName.removeClass(animationName);
  });

  elementName.css('-webkit-box-shadow', '0 0 0 1px red');
  elementName.css('-moz-box-shadow', '0 0 0 1px red');
  elementName.css('box-shadow', '0 0 0 1px red');
}