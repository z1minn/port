document.addEventListener('DOMContentLoaded', function() {
    
    // ===============================================
    // 상단 시간 업데이트 기능
    // ===============================================
    function updateTime() {
        const timeElement = document.getElementById('time');
        if (timeElement) {
            const now = new Date();
            const kstOffset = 9 * 60 * 60 * 1000;
            const kstTime = new Date(now.getTime() + kstOffset);
            const utcHours = kstTime.getUTCHours();
            const utcMinutes = kstTime.getUTCMinutes();
            
            let hours = utcHours;
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            
            const minutes = utcMinutes < 10 ? '0' + utcMinutes : utcMinutes;
            const timeString = `${hours}:${minutes} ${ampm}`;
            timeElement.textContent = timeString;
        }
    }
    setInterval(updateTime, 1000);
    updateTime();

    // ===============================================
    // 커서 이동 효과
    // ===============================================
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        window.addEventListener('mousemove', e => {
            const offsetX = -15;
            const offsetY = -15;
            const newX = e.clientX + offsetX;
            const newY = e.clientY + offsetY;
            cursor.style.transform = `translate(${newX}px, ${newY}px)`;
        });
    }

    // ===============================================
    // 헤더 높이 자동 계산으로 스크롤 스냅 위치 보정
    // ===============================================
    function setScrollPadding() {
        const header = document.querySelector('header');
        if (header) {
            const headerHeight = header.offsetHeight;
            document.documentElement.style.scrollPaddingTop = `${headerHeight}px`;
        }
    }
    setScrollPadding();
    window.addEventListener('resize', setScrollPadding);

    // ===============================================
    // ABOUT 섹션 스크롤 시 효과 (배경 반전, 애니메이션)
    // ===============================================
    const aboutSection = document.querySelector('#about');
    if (aboutSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.body.classList.add('invert-background');
                    aboutSection.classList.add('visible');
                } else {
                    document.body.classList.remove('invert-background');
                    aboutSection.classList.remove('visible');
                }
            });
        }, {
            root: document.querySelector('.scroll-container'),
            threshold: 0.5
        });
        observer.observe(aboutSection);
    }
    
    // ===============================================
    // DESIGN 섹션 비디오 클릭 시 라이트박스 기능
    // ===============================================
    const videoBoxes = document.querySelectorAll('.video-box');
    const lightbox = document.querySelector('.lightbox');
    const lightboxVideo = lightbox.querySelector('.lightbox-video-wrapper video');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxBody = lightbox.querySelector('.lightbox-body');
    const lightboxClose = lightbox.querySelector('.lightbox-close');

    if (videoBoxes.length > 0 && lightbox && lightboxVideo && lightboxClose) {
        
        videoBoxes.forEach(box => {
            box.addEventListener('click', () => {
                const video = box.querySelector('video');
                const title = box.dataset.title;
                const body = box.dataset.body;

                if (video && lightboxTitle && lightboxBody) {
                    lightboxVideo.src = video.src;
                    lightboxTitle.textContent = title || '';
                    lightboxBody.textContent = body || '';
                    lightbox.classList.add('show');
                }
            });
        });

        function closeLightbox() {
            lightbox.classList.remove('show');
            lightboxVideo.pause();
            // 비디오 소스를 비워 다음 로딩을 빠르게 합니다.
            setTimeout(() => {
                lightboxVideo.src = "";
            }, 400); // transition 시간과 맞춤
        }

        lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            // 검은 배경 클릭 시 닫기 (내용물 제외)
            if (e.target === lightbox) {
                closeLightbox();
            }
        });
    }

    // ===============================================
    // CONTACT 섹션 - 커서 확대 효과
    // ===============================================
    const contactSection = document.querySelector('.contact-section');
    const customCursor = document.querySelector('.custom-cursor');

    if (contactSection && customCursor) {
        contactSection.addEventListener('mouseenter', () => {
            customCursor.style.width = '90px';
            customCursor.style.height = '90px';
        });

        contactSection.addEventListener('mouseleave', () => {
            customCursor.style.width = '20px';
            customCursor.style.height = '20px';
        });
    }

    // ===============================================
    // CONTACT 섹션 - 텍스트 등장 애니메이션
    // ===============================================
    const contactTitle = document.querySelector('.contact-section h2');
    if (contactTitle) {
        const text = contactTitle.textContent;
        const chars = text.split('');
        contactTitle.innerHTML = '';
        
        chars.forEach((char, i) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.transitionDelay = `${i * 50}ms`;
            contactTitle.appendChild(span);
        });

        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    contactTitle.classList.add('letters-visible');
                } else {
                    contactTitle.classList.remove('letters-visible');
                }
            });
        }, {
            root: document.querySelector('.scroll-container'),
            threshold: 0.2
        });
        
        if (contactSection) {
           contactObserver.observe(contactSection);
        }
    }

    /* ===============================================
     * CONTACT 섹션 - 파티클 효과 실행
     * =============================================== */
    particlesJS("particles-js", {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle"
        },
        "opacity": {
          "value": 0.5,
          "random": false
        },
        "size": {
          "value": 3,
          "random": true
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          "color": "#ffffff",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 1,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false
        }
      },
      "interactivity": {
        "detect_on": "canvas",
        "events": {
          "onhover": {
            "enable": true,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "repulse": {
            "distance": 100,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          }
        }
      },
      "retina_detect": true
    });

});