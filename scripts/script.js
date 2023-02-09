$(document).ready(function () {
    // попап формы
    let popup = $('#pop-up');

    // маска для телефона
    $("#tel").mask("+7 (999) 99-99-999");

    //wow js
    let wow = new WOW({
        boxClass: 'wow',
        animateClass: 'animate__animated',
        offset: 200,
        mobile: true,
        live: true
    })
    wow.init();

    // инициализация слайдера меню
    let items = $('.responsive');
    items.slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    rows: 2,
                    slidesToScroll: 1,
                    infinite: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    rows: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    rows: 2
                }
            }
        ]
    });

    // инициализация слайдера отзывов
    $('.reviews__items').slick({
        dots: false,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1240,
                settings: {
                    rows: 2,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    rows: 2,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    rows: 2,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });


// таймер
    const deadline = new Date();// дата
    let newDateObj = new Date(); //+30 минут к текущей дате
    newDateObj.setTime(deadline.getTime() + (30 * 60 * 1000));
    let timerId = null; // id таймера
    function declensionNum(num, words) { // склонение числительных
        return words[(num % 100 > 4 && num % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(num % 10 < 5) ? num % 10 : 5]];
    }
    function countdownTimer() { // вычисляем разницу дат и устанавливаем оставшееся времени в качестве содержимого элементов
        const diff = newDateObj - new Date();
        if (diff <= 0) {
            clearInterval(timerId);
        }
        const minutes = diff > 0 ? Math.floor(diff / 1000 / 60) % 60 : 0;
        const seconds = diff > 0 ? Math.floor(diff / 1000) % 60 : 0;
        $minutes.textContent = minutes < 10 ? '0' + minutes : minutes;
        $seconds.textContent = seconds < 10 ? '0' + seconds : seconds;
        $minutes.dataset.title = declensionNum(minutes, ['минута', 'минуты', 'минут']);
        $seconds.dataset.title = declensionNum(seconds, ['секунда', 'секунды', 'секунд']);
    }
    const $minutes = document.querySelector('.timer__minutes');// получаем элементы, содержащие компоненты даты
    const $seconds = document.querySelector('.timer__seconds');// получаем элементы, содержащие компоненты даты
    countdownTimer();
    timerId = setInterval(countdownTimer, 1000);

    // скролл
    $('a[href^="#"]').on('click', function () {
        let href = $(this).attr('href');
        if (href.length === 1) return false;
        $('html, body').animate({
            scrollTop: $(href).offset().top
        }, {
            duration: 800,   // по умолчанию «400»
            easing: "linear" // по умолчанию «swing»
        });
        return false;
    });

    // меню бургер
    let menu = $('#header__menu');
    $('#burger').on('click', function () { // открываем меню
        menu.addClass('open');
    });
    $.each(menu.find('*'), (index, value) => { // закрытие при нажатии на любой из элементов
        value.onclick = () => {
            menu.removeClass('open');
        }
    })

    // валидация формы
    let form = $("#basic-form");
    form.validate({
        rules: { // правила
            name: {
                required: true
            },
            tel: {
                required: true,
            }
        },
        messages: { // сообщения об ошибках
            name: {
                required: 'Введите имя'
            },
            tel: {
                required: 'Введите телефон',
            }
        },
        submitHandler: function () { // функция при отправке валидной формы
            $.ajax({ // запрос на сервер
                url: 'https://testologia.site/checkout',
                method: 'post',
                dataType: 'html',
                data: $('#basic-form').serialize(),
                success: function (data) {
                    $('#message').html(data);
                    let result = JSON.parse(data);// из json в объект
                    // проверка ответа
                    if (result.success === 1) {
                        alert('Введено имя - itlogia. Попробуйте ввести настоящее имя!')
                        $('#basic-form')[0].reset();
                    } else {
                        popup.css('display', 'block');
                        $('#popup__close').on('click', function () {
                            popup.css('display', 'none');
                            $('#basic-form')[0].reset();
                        });
                    }
                }
            });
            return false // не перезагружаем страницу
        }
    });

    //выбор категории
    items.eq(0).css({'opacity':'1','z-index':'5'});
    $('.categories__item').on('click', function () {
        let id = $(this).attr('id');
        if (id === 'chicken' || id === 'cow' || id === 'duck' || id === 'crab') {
            for (let i = 0; i < items.length; i++) {
                items.eq(i).css({'opacity':'0','z-index':'1'});
            }
            if (id === 'chicken') {
                items.eq(0).css({'opacity':'1','z-index':'5'});
            } else if (id === 'cow') {
                items.eq(1).css({'opacity':'1','z-index':'5'});
            } else if (id === 'duck') {
                items.eq(2).css({'opacity':'1','z-index':'5'});
            } else if (id === 'crab') {
                items.eq(3).css({'opacity':'1','z-index':'5'});
            }
        }
    });
});