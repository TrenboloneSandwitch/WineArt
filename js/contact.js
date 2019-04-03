console.log("nahrano");
$(document).ready(function () {
  $('#submit').click(function (event) {
    console.log("button clicked");

    var name = $('#name');
    var nameVal = name.val().trim();
    var subject = $('#subject');
    var subjectVal = subject.val().trim();
    var email = $('#email');
    var emailVal = email.val().trim();
    var msg = $('#msg');
    var msgVal = msg.val().trim();

    var year = $('#year');
    var yearVal = year.val();

    var date = new Date();

    var statusELM = $('.statusElm');
    statusELM.empty();

    // Validace jednotlivých prvků
    if (nameVal.length > 5 && nameVal.includes(' ')) {
      name.css('box-shadow', '0 0 0 1px black');

    } else {
      event.preventDefault();
      statusELM.append('<div class="red-alert">Uveďte prosím celé své jméno.</div>')
      addErrorEffect(name, 'shake');
    }

    if (subjectVal.length > 3) {
      subject.css('box-shadow', '0 0 0 1px black');
    } else {
      event.preventDefault();
      statusELM.append('<div class="red-alert">Zkontrolujte si prosím předmět zprávy. Měl by obsahovat, alespoň čtyři znaky.</div>')
      addErrorEffect(subject, 'shake');
    }

    if (emailVal.length > 5 && emailVal.includes('@') && emailVal.includes('.')) {
      email.css('box-shadow', '0 0 0 1px black');
    } else {
      event.preventDefault();
      statusELM.append('<div class="red-alert">Zkontrolujte si prosím správně vyplněný e-mail.</div>')
      addErrorEffect(email, 'shake');
    }

    if (yearVal.length > 3 && yearVal == date.getFullYear()) {
      year.css('box-shadow', '0 0 0 1px black');
    } else {
      event.preventDefault();
      statusELM.append('<div class="red-alert">Zkontrolujte si prosím správnost aktuálně vyplněného roku. Tento údaj nám slouží jako ochrana před spamem.</div>')
      addErrorEffect(year, 'shake');
    }

    if (msgVal.length > 10) {
      msg.css('box-shadow', '0 0 0 1px black');
    } else {
      event.preventDefault();
      statusELM.append('<div class="red-alert">Opravdu chcete poslat takto krátkou zprávu?</div>')
      addErrorEffect(msg, 'shake');
    }

  });
});


function addErrorEffect(elementName, animationName) {

  animationend = 'animationend oAnimationEnd mozAnimationEnd webkitAnimationEnd';
  elementName.addClass(animationName).one(animationend, function () {
    elementName.removeClass(animationName);
  });

  elementName.css('-webkit-box-shadow', '0 0 0 1px red');
  elementName.css('-moz-box-shadow', '0 0 0 1px red');
  elementName.css('box-shadow', '0 0 0 1px red');
}
