
   
        // ===== NAVIGATION =====
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.getElementById('navMenu');
        const menuOverlay = document.getElementById('menuOverlay');
        const navLinks = document.querySelectorAll('.nav-link');

        // Scroll effect for navbar
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile menu toggle
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
        });

        menuOverlay.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
            });
        });

        // ===== COUNTDOWN TIMER =====
        const weddingDate = new Date('May 23, 2026 15:00:00').getTime();

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = weddingDate - now;

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

            if (distance < 0) {
                document.getElementById('days').textContent = '00';
                document.getElementById('hours').textContent = '00';
                document.getElementById('minutes').textContent = '00';
                document.getElementById('seconds').textContent = '00';
            }
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);

        // ===== CALENDAR =====
        let currentMonth = 4; // May (0-indexed)
        let currentYear = 2026;

        function renderCalendar() {
            const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'];
            
            document.getElementById('calendarMonth').textContent = `${monthNames[currentMonth]} ${currentYear}`;
            
            const firstDay = new Date(currentYear, currentMonth, 1).getDay();
            const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
            const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();
            
            const calendarDays = document.getElementById('calendarDays');
            calendarDays.innerHTML = '';
            
            // Previous month days
            for (let i = firstDay - 1; i >= 0; i--) {
                const day = document.createElement('div');
                day.className = 'calendar-day other-month';
                day.textContent = daysInPrevMonth - i;
                calendarDays.appendChild(day);
            }
            
            // Current month days
            for (let i = 1; i <= daysInMonth; i++) {
                const day = document.createElement('div');
                day.className = 'calendar-day';
                day.textContent = i;
                
                // Highlight wedding day
                if (i === 23 && currentMonth === 4 && currentYear === 2026) {
                    day.classList.add('wedding-day');
                    day.title = 'Our Wedding Day! 💍';
                }
                
                calendarDays.appendChild(day);
            }
            
            // Next month days
            const totalCells = firstDay + daysInMonth;
            const remainingCells = 42 - totalCells;
            for (let i = 1; i <= remainingCells && totalCells < 42; i++) {
                const day = document.createElement('div');
                day.className = 'calendar-day other-month';
                day.textContent = i;
                calendarDays.appendChild(day);
            }
        }

        function changeMonth(delta) {
            currentMonth += delta;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            } else if (currentMonth < 0) {
                currentMonth = 11;
                currentYear--;
            }
            renderCalendar();
        }

        renderCalendar();

        // ===== SCROLL REVEAL ANIMATION =====
        function revealOnScroll() {
            const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
            
            reveals.forEach(element => {
                const windowHeight = window.innerHeight;
                const elementTop = element.getBoundingClientRect().top;
                const revealPoint = 150;
                
                if (elementTop < windowHeight - revealPoint) {
                    element.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', revealOnScroll);
        window.addEventListener('load', revealOnScroll);

        // ===== LIGHTBOX =====
        function openLightbox(element) {
            const lightbox = document.getElementById('lightbox');
            const content = document.getElementById('lightboxContent');
            const placeholder = element.querySelector('.gallery-placeholder');
            
            content.innerHTML = `<div style="font-size: 8rem; background: linear-gradient(135deg, var(--color-rose), var(--color-gold-light)); width: 400px; height: 400px; border-radius: 20px; display: flex; align-items: center; justify-content: center;">${placeholder.textContent}</div>`;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            const lightbox = document.getElementById('lightbox');
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }

        // Close lightbox with escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
            }
        });

        // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
   