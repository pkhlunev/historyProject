document.addEventListener('DOMContentLoaded', function() {
    // Изображения для слайдера и фона (обновленные с учетом поиска)
    const sliderImages = [
   
       'https://cdn.culture.ru/images/48e42e3e-a8b9-5615-bc34-4031f39265c6',
       'https://cdn.culture.ru/images/6163d78d-0a23-515e-bde7-878709d58cfb',
      'https://upload.wikimedia.org/wikipedia/commons/f/ff/S._V._Ivanov._Time_of_Troubles._Moscow_region._Impostor%27s_army._%281908%29.jpg'
    ];

    const headerImages = [
          'https://avatars.mds.yandex.net/i?id=f5cec94dbf3514c42547cfebe83ce6a1_l-7882711-images-thumbs&n=13',
    ];

    // Инициализация слайдера
   function initSlider() {
    const container = document.querySelector('.slider-container');
    let currentIndex = 0;
    let images = [];

    // Создаем изображения
    sliderImages.forEach((src, idx) => {
        const img = document.createElement('img');
        img.src = src;
        if (idx === 0) img.classList.add('active');
        container.appendChild(img);
        images.push(img);
    });

    function showImage(index) {
        images.forEach((img, i) => {
            if (i === index) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
    }

    let sliderInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }, 3000);

    document.querySelector('.slider-prev').addEventListener('click', () => {
        clearInterval(sliderInterval);
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
        sliderInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }, 3000);
    });
    document.querySelector('.slider-next').addEventListener('click', () => {
        clearInterval(sliderInterval);
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
        sliderInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        }, 3000);
    });
}

    // Анимация смены фона в шапке
    function initHeaderBackground() {
        const header = document.querySelector('.header');
        let currentIndex = 0;
        
        // Устанавливаем первое изображение
        header.style.backgroundImage = `url(${headerImages[0]})`;
        
        // Меняем изображения каждые 6 секунд
        setInterval(() => {
            currentIndex = (currentIndex + 1) % headerImages.length;
            header.style.backgroundImage = `url(${headerImages[currentIndex]})`;
        }, 6000);
    }

    // Навигация по разделам
    function initNavigation() {
        const navLinks = document.querySelectorAll('.nav a');
        const sections = document.querySelectorAll('.section');
        const scrollDown = document.querySelector('.scroll-down');
        
        // Прокрутка вниз по клику на стрелку
        scrollDown.addEventListener('click', () => {
            window.scrollTo({
                top: document.querySelector('.header').offsetHeight,
                behavior: 'smooth'
            });
        });
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Удаляем активный класс у всех ссылок
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Добавляем активный класс к текущей ссылке
                this.classList.add('active');
                
                // Получаем ID раздела из атрибута data-section
                const sectionId = this.getAttribute('data-section');
                
                // Скрываем все разделы
                sections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Показываем выбранный раздел
                document.getElementById(sectionId).classList.add('active');
                
                // Плавная прокрутка к началу раздела
                window.scrollTo({
                    top: document.querySelector('.header').offsetHeight,
                    behavior: 'smooth'
                });
            });
        });
        
        // Кнопки "Далее"
        document.querySelectorAll('.next-section').forEach(button => {
            button.addEventListener('click', function() {
                const nextSection = this.getAttribute('data-next');
                
                // Удаляем активный класс у всех ссылок
                navLinks.forEach(l => l.classList.remove('active'));
                
                // Добавляем активный класс к соответствующей ссылке
                document.querySelector(`[data-section="${nextSection}"]`).classList.add('active');
                
                // Скрываем все разделы
                sections.forEach(section => {
                    section.classList.remove('active');
                });
                
                // Показываем следующий раздел
                document.getElementById(nextSection).classList.add('active');
                
                // Плавная прокрутка к началу раздела
                window.scrollTo({
                    top: document.querySelector('.header').offsetHeight,
                    behavior: 'smooth'
                });
            });
        });
    }

    function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.timeline-item, .person-card, .consequence-card, .timeline-item-preview');

    function checkVisibility() {
        animateElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                element.classList.add('show');
            }
        });
    }

    // Изначально скрытые
    animateElements.forEach(el => el.classList.remove('show'));

    // Проверка при загрузке
    checkVisibility();

    window.addEventListener('scroll', checkVisibility);
}

    // Инициализация всех функций
    initSlider();
    initHeaderBackground();
    initNavigation();
    initScrollAnimations();
});
