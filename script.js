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
});