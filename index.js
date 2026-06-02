// index.js - Interactive features for index.html (Homepage)

document.addEventListener('DOMContentLoaded', () => {
    // 1. Dynamic Personalized Greeting based on Time of Day
    const heroBanner = document.querySelector('.hero-banner');
    if (heroBanner) {
        const greetingDiv = document.createElement('div');
        greetingDiv.className = 'dynamic-greeting';
        greetingDiv.style.fontSize = '1.1rem';
        greetingDiv.style.fontWeight = '500';
        greetingDiv.style.marginTop = '1rem';
        greetingDiv.style.color = '#cbd5e1';
        greetingDiv.style.opacity = '0';
        greetingDiv.style.transition = 'opacity 1s ease-in-out';
        
        const hour = new Date().getHours();
        let greetingText = '';
        
        if (hour < 12) {
            greetingText = '🌅 Good Morning! Start your campus day with new opportunities.';
        } else if (hour < 18) {
            greetingText = '☀️ Good Afternoon! Stay active and check out the latest events.';
        } else {
            greetingText = '🌙 Good Evening! Relax and plan your schedule for tomorrow.';
        }
        
        greetingDiv.textContent = greetingText;
        heroBanner.appendChild(greetingDiv);
        
        // Trigger fade-in
        setTimeout(() => {
            greetingDiv.style.opacity = '1';
        }, 300);
    }

    // 2. Tech Symposium Live Countdown Timer
    const countdownContainer = document.getElementById('tech-symposium-countdown');
    if (countdownContainer) {
        // Set date to 45 days from today
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 45);
        targetDate.setHours(9, 0, 0, 0); // 9:00 AM

        function updateCountdown() {
            const now = new Date().getTime();
            const difference = targetDate.getTime() - now;

            if (difference < 0) {
                countdownContainer.textContent = "Symposium has started!";
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((difference % (1000 * 60)) / 1000);

            // Access span nodes to update values securely
            const dNode = document.getElementById('cd-days');
            const hNode = document.getElementById('cd-hours');
            const mNode = document.getElementById('cd-mins');
            const sNode = document.getElementById('cd-secs');

            if (dNode && hNode && mNode && sNode) {
                dNode.textContent = days.toString().padStart(2, '0');
                hNode.textContent = hours.toString().padStart(2, '0');
                mNode.textContent = minutes.toString().padStart(2, '0');
                sNode.textContent = seconds.toString().padStart(2, '0');
            }
        }

        // Run once immediately, then interval
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
});
