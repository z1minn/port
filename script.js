document.addEventListener('DOMContentLoaded', function() {
    function updateTime() {
        const timeElement = document.getElementById('time');
        if (timeElement) {
            const now = new Date();
            // 한국 시간(KST)은 UTC+9
            const kstOffset = 9 * 60 * 60 * 1000;
            const kstTime = new Date(now.getTime() + kstOffset);

            // 한국 시간으로 변환
            const utcHours = kstTime.getUTCHours();
            const utcMinutes = kstTime.getUTCMinutes();
            
            let hours = utcHours;
            let ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12; // 0시는 12시로 표시
            
            const minutes = utcMinutes < 10 ? '0' + utcMinutes : utcMinutes;
            
            const timeString = `${hours}:${minutes} ${ampm}`;
            timeElement.textContent = timeString;
        }
    }

    // 1초마다 시간을 업데이트
    setInterval(updateTime, 1000);
    // 페이지 로드 시 즉시 시간을 표시
    updateTime();
});
// ... (기존의 시간 업데이트 코드 등은 그대로 둡니다) ...

// 이 아래부터 새로 추가
const cursor = document.querySelector('.custom-cursor');

window.addEventListener('mousemove', e => {
    // 원의 중심이 마우스 포인터의 좌측 상단에 오도록 좌표를 보정
    const offsetX = -15; // 왼쪽으로 15px
    const offsetY = -15; // 위로 15px

    const newX = e.clientX + offsetX;
    const newY = e.clientY + offsetY;

    cursor.style.transform = `translate(${newX}px, ${newY}px)`;
});