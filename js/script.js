// Савченко Максим
document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let slideInterval;
    let autoSlideEnabled = true;
    let isTransitioning = false;

    function showSlide(n) {
        if (isTransitioning) return;
        isTransitioning = true;

        slides.forEach(slide => slide.classList.remove('active'));

        if (n >= totalSlides) currentSlide = 0;
        else if (n < 0) currentSlide = totalSlides - 1;
        else currentSlide = n;

        slides[currentSlide].classList.add('active');

        setTimeout(() => {
            isTransitioning = false;
        }, 800);
    }

    function nextSlide() { showSlide(currentSlide + 1); }
    function prevSlide() { showSlide(currentSlide - 1); }

    function startAutoSlide() {
        if (autoSlideEnabled) {
            slideInterval = setInterval(nextSlide, 5000);
        }
    }
    function stopAutoSlide() { clearInterval(slideInterval); }
    function disableAutoSlide() {
        autoSlideEnabled = false;
        stopAutoSlide();
    }

    showSlide(0);
    startAutoSlide();

    const slider = document.querySelector('.hero-slider');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (!isTransitioning) {
                nextSlide();
                disableAutoSlide();
            }
        });
        prevBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (!isTransitioning) {
                prevSlide();
                disableAutoSlide();
            }
        });
    }

    if (slider) {
        slider.addEventListener('mouseenter', stopAutoSlide);
        slider.addEventListener('mouseleave', function() {
            if (autoSlideEnabled) startAutoSlide();
        });
        slider.addEventListener('touchstart', stopAutoSlide);
        slider.addEventListener('touchend', function() {
            if (autoSlideEnabled) startAutoSlide();
        });
    }

    document.addEventListener('visibilitychange', function() {
        if (document.hidden) stopAutoSlide();
        else if (autoSlideEnabled) startAutoSlide();
    });

    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const modalId = this.dataset.modal;
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    document.querySelectorAll('.btn-register').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const eventName = this.dataset.event;
            const eventDate = this.dataset.date;

            const modalTitle = document.getElementById('modalEventTitle');
            if (modalTitle && eventName) {
                modalTitle.textContent = `Регистрация на «${eventName}»`;
            }

            const dateInput = document.getElementById('date');
            if (dateInput && eventDate) {
                dateInput.value = eventDate;
            }

            const regModal = document.getElementById('registrationModal');
            if (regModal) {
                regModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            }
        });
    });

    function closeModal(modal) {
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }

    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', function() {
            closeModal(this.closest('.modal'));
        });
    });

    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal').forEach(closeModal);
        }
    });

    const clearBtn = document.getElementById('clearForm');
    if (clearBtn) {
        clearBtn.addEventListener('click', function(e) {
            e.preventDefault();
                const form = document.getElementById('registrationForm');
                const dateInput = document.getElementById('date');
                const currentDate = dateInput.value;
                form.reset();
                dateInput.value = currentDate;
        });
    }

    const regForm = document.getElementById('registrationForm');
    if (regForm) {
        regForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const participation = document.querySelector('input[name="participation"]:checked');

            if (!name || !email || !phone || !participation) {
                alert('Пожалуйста, заполните все обязательные поля (отмечены *).');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Введите корректный email адрес.');
                return;
            }

            alert('Регистрация прошла успешно! Мы свяжемся с вами.');
            closeModal(document.getElementById('registrationModal'));
            this.reset();
        });
    }

    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPos = target.offsetTop - headerHeight - 15;
                window.scrollTo({ top: targetPos, behavior: 'smooth' });
            }
        });
    });

    console.log('Сайт «Год семьи 2024» успешно загружен.');
});
