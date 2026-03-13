document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash');
    const home = document.getElementById('home');

    // 0. Image Randomization Setup (Total 60 Unique Images)
    const imagePool = [];
    for(let i=1; i<=30; i++) imagePool.push(`images/네웹${i}.${i===1||i===2||i===4||i===6||i===7||i===9||i===24?'jpg':'JPG'}`);
    for(let i=1; i<=30; i++) imagePool.push(`images/카웹${i}.${i===21||i===22||i===23?'jpg':'JPG'}`);

    // Robust extension handling (Normalizing to actual file names from list_dir)
    const normalizedPool = imagePool.map(path => {
        // Some were jpg, some were JPG, some were PNG in the previous list_dir
        if (path === 'images/네웹3.JPG') return 'images/네웹3.JPG'; 
        if (path === 'images/네웹3.PNG') return 'images/네웹3.PNG'; // Handling the special case
        return path;
    });
    
    // Shuffle the global pool once
    let globalPool = [...normalizedPool].sort(() => Math.random() - 0.5);
    let poolIndex = 0;

    function getNextUniqueImage() {
        if (poolIndex >= globalPool.length) {
            console.warn('Image pool exhausted, recycling images.');
            poolIndex = 0;
            globalPool = [...globalPool].sort(() => Math.random() - 0.5);
        }
        return globalPool[poolIndex++];
    }

    function randomizeStaticImages() {
        // Rank List (5 items)
        document.querySelectorAll('.rank-item__thumb').forEach(img => {
            img.src = getNextUniqueImage();
        });

        // Unread Modal (7 items)
        document.querySelectorAll('.unread-card__thumb').forEach(img => {
            img.src = getNextUniqueImage();
        });
    }

    randomizeStaticImages();

    // 1. Splash Screen Transition & Initial Animations
    setTimeout(() => {
        splash.style.opacity = '0';
        setTimeout(() => {
            splash.classList.add('hidden');
            home.classList.remove('hidden');
            if (window.lucide) window.lucide.createIcons();
            
            // Trigger Goal Progress Animation
            animateGoalProgress();
        }, 1000);
    }, 2500);

    function animateGoalProgress() {
        const fill = document.getElementById('goal-progress-fill');
        if (fill) {
            setTimeout(() => {
                fill.style.width = '72%';
            }, 300);
        }
    }

    // 2. Simple Filter Logic (Only Active state)
    const chipsContainer = document.querySelector('.chips');
    if (chipsContainer) {
        chipsContainer.addEventListener('click', (e) => {
            const chip = e.target.closest('.chip');
            if (!chip) return;

            chipsContainer.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
        });
    }

    // 3. Persistent Bookmark Toggle
    document.addEventListener('click', (e) => {
        const bookmark = e.target.closest('.card__bookmark');
        if (bookmark) {
            bookmark.classList.toggle('active');
        }
    });

    // 4. Default Interactive Color Feedback
    document.addEventListener('mousedown', (e) => {
        const icon = e.target.closest('.icon-btn, .card__bookmark'); // Removed .nav-item
        if (icon) {
            icon.style.color = '#BE0B0B';
            icon.style.transition = 'none';
        }
    });

    document.addEventListener('mouseup', (e) => {
        const icon = e.target.closest('.icon-btn, .card__bookmark'); // Removed .nav-item
        if (icon) {
            setTimeout(() => {
                if (icon.classList.contains('card__bookmark')) {
                    if (!icon.classList.contains('active')) icon.style.color = '';
                } else {
                    icon.style.color = '';
                }
                icon.style.transition = 'color 0.2s ease-out';
            }, 100);
        }
    });

    // 5. Activity Summary Arc & Weekly Habit Tracker
    const habitTabsContainer = document.getElementById('calendar-tabs');
    const particleContainer = document.getElementById('particles');

    // Ambient Rising Particles
    if (particleContainer) {
        particleContainer.innerHTML = '';
        const particleCount = 20;
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = (Math.random() * 6) + 's';
            particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
            particleContainer.appendChild(particle);
        }
    }

    const weeklyDataMap = {
        mon: { time: 180, toons: 5, avg: 6.0, items: [ { title: '어둠의 군주' }, { title: '블루 시티' }, { title: '참교육' }, { title: '퀘스트지상주의' }, { title: '창천의 궤적' }, { title: '사이버 노이드' } ] },
        tue: { time: 120, toons: 3, avg: 4.5, items: [ { title: '네온 시티' }, { title: '퀘스트지상주의' }, { title: '하이스쿨 히어로' }, { title: '블레이드 소울' }, { title: '미드나잇 알리바이' } ] },
        wed: { time: 210, toons: 7, avg: 7.2, items: [ { title: '창천의 궤적' }, { title: '사이버 노이드' }, { title: '블레이드 소울' }, { title: '미드나잇 알리바이' }, { title: '어둠의 군주' }, { title: '블루 시티' }, { title: '참교육' } ] },
        thu: { time: 155, toons: 4, avg: 5.1, items: [ { title: '어둠의 군주' }, { title: '하이스쿨 히어로' }, { title: '네온 시티' }, { title: '퀘스트지상주의' }, { title: '참교육' } ] },
        fri: { time: 245, toons: 8, avg: 8.4, items: [ { title: '블루 시티' }, { title: '네온 시티' }, { title: '참교육' }, { title: '창천의 궤적' }, { title: '어둠의 군주' }, { title: '블레이드 소울' }, { title: '미드나잇 알리바이' }, { title: '하이스쿨 히어로' } ] },
        sat: { time: 90, toons: 6, avg: 3.0, items: [ { title: '퀘스트지상주의' }, { title: '하이스쿨 히어로' }, { title: '사이버 노이드' }, { title: '어둠의 군주' }, { title: '블루 시티' }, { title: '네온 시티' } ] },
        sun: { time: 140, toons: 9, avg: 5.5, items: [ { title: '창천의 궤적' }, { title: '사이버 노이드' }, { title: '블레이드 소울' }, { title: '미드나잇 알리바이' }, { title: '어둠의 군주' }, { title: '블루 시티' }, { title: '참교육' }, { title: '퀘스트지상주의' }, { title: '네온 시티' } ] }
    };

    // Initialize random metadata for weekly items
    Object.keys(weeklyDataMap).forEach(day => {
        const items = weeklyDataMap[day].items;
        items.forEach((item, i) => {
            item.img = getNextUniqueImage();
            item.status = Math.random() > 0.4 ? 'active' : '';
            item.meta = item.status === 'active' ? '기록 완료' : '미열람';
            item.icon = 'check-circle-2';
        });
    });

    const updateHabitList = (dayKey = 'mon', isInitial = false) => {
        const habitList = document.querySelector('.habit-series-list');
        const totalTimeEl = document.querySelector('.total-time');
        const statsRowEl = document.querySelector('.stats-row');
        const ringActive = document.querySelector('.ring-active');

        const data = weeklyDataMap[dayKey] || weeklyDataMap.mon;

        if (!habitList) return;
        
        // 1. Update Arc Stats
        if (totalTimeEl) totalTimeEl.innerHTML = `${data.time}<small>시간</small>`;
        if (statsRowEl) statsRowEl.innerHTML = `<span>${data.toons} 작품</span><span class="divider">|</span><span>평균 ${data.avg}시간</span>`;
        
        if (ringActive) {
            // For animation, we ensure a transition from empty to full
            if (isInitial) {
                ringActive.style.transition = 'none';
                ringActive.style.strokeDashoffset = '534';
                // Trigger reflow
                ringActive.getBoundingClientRect();
                ringActive.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
            }
            
            setTimeout(() => {
                const progress = Math.min(100, (data.time / 300) * 100);
                const offset = 534 - (534 * progress / 100);
                ringActive.style.strokeDashoffset = offset;
            }, isInitial ? 100 : 0);
        }

        // 2. Update Series List
        const triggerUpdate = () => {
            habitList.innerHTML = '';
            
            // Sort: Unread first, Completed (active) last
            const sortedItems = [...data.items].sort((a, b) => {
                if (a.status === 'active' && b.status !== 'active') return 1;
                if (a.status !== 'active' && b.status === 'active') return -1;
                return 0;
            });

            sortedItems.forEach(item => {
                const card = document.createElement('div');
                card.className = 'habit-series-card btn-tactile';
                card.innerHTML = `
                    <img src="${item.img}" alt="thumb" class="hs-thumb">
                    <div class="hs-info">
                        <h4 class="hs-title">${item.title}</h4>
                        <p class="hs-meta">${item.meta}</p>
                    </div>
                    <div class="hs-indicator ${item.status}">
                        <i data-lucide="${item.icon}"></i>
                    </div>
                `;
                habitList.appendChild(card);
            });

            if (window.lucide) lucide.createIcons();
            
            habitList.style.opacity = '1';
            habitList.style.transform = 'translateY(0)';
            habitList.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
        };

        if (isInitial) {
            triggerUpdate();
        } else {
            habitList.style.opacity = '0';
            habitList.style.transform = 'translateY(8px)';
            setTimeout(triggerUpdate, 200);
        }
    };

    if (habitTabsContainer) {
        const tabs = habitTabsContainer.querySelectorAll('.habit-tab');
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const day = tab.getAttribute('data-day');
                tabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                updateHabitList(day);
            });
        });
    }

    // Initial Trigger
    const activeTab = habitTabsContainer ? habitTabsContainer.querySelector('.habit-tab.active') : null;
    const initialDay = activeTab ? activeTab.getAttribute('data-day') : 'mon';
    updateHabitList(initialDay, true);

    if (window.lucide) {
        lucide.createIcons();
    }

    // 6. Page Switching Logic
    const navItems = document.querySelectorAll('.nav-item');
    const pages = {
        home: document.getElementById('home'),
        calendar: document.getElementById('calendar'),
        my: document.getElementById('my')
    };

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const pageId = item.getAttribute('data-page');
            
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            Object.keys(pages).forEach(key => {
                if (pages[key]) {
                    if (key === pageId) {
                        pages[key].classList.remove('hidden');
                        pages[key].scrollTo(0, 0);
                        // Trigger animations with a small delay for visibility
                        if (key === 'calendar') {
                            const activeTab = habitTabsContainer ? habitTabsContainer.querySelector('.habit-tab.active') : null;
                            const currentDay = activeTab ? activeTab.getAttribute('data-day') : 'mon';
                            setTimeout(() => updateHabitList(currentDay, true), 50);
                        }
                    } else {
                        pages[key].classList.add('hidden');
                    }
                }
            });

            if (pageId === 'home' && typeof animateGoalProgress === 'function') {
                animateGoalProgress();
            }
        });
    });

    // 7. Unread Modal Logic
    const unreadModal = document.getElementById('unread-modal');
    const openModalBtn = document.getElementById('open-unread-modal');
    const closeModalBtn = document.getElementById('close-unread-modal');

    if (openModalBtn && unreadModal) {
        openModalBtn.addEventListener('click', () => {
            unreadModal.classList.remove('hidden');
        });
    }

    if (closeModalBtn && unreadModal) {
        closeModalBtn.addEventListener('click', () => {
            unreadModal.classList.add('hidden');
        });
    }

    // Close on overlay click
    // 8. MY Page Archive Tabs
    const archiveTabs = document.querySelectorAll('.archive-tab');
    const archiveList = document.querySelector('.archive-list-container');

    const archiveData = {
        completed: [ { title: '어둠의 군주', progress: 100 }, { title: '창천의 궤적', progress: 100 }, { title: '네온 시티: 리로드', progress: 100 } ],
        reading: [ { title: '블루 시티', progress: 85 }, { title: '퀘스트지상주의', progress: 40 }, { title: '하이스쿨 히어로', progress: 12 } ]
    };

    // Initialize random images for archive
    Object.keys(archiveData).forEach(key => {
        archiveData[key].forEach((item, i) => { 
            item.img = getNextUniqueImage(); 
        });
    });

    function renderArchive(tab) {
        if (!archiveList) return;
        archiveList.innerHTML = '';
        archiveData[tab].forEach(item => {
            const card = document.createElement('div');
            card.className = 'archive-card-slim';
            card.innerHTML = `
                <img src="${item.img}" alt="thumb" class="ac-thumb">
                <div class="ac-info">
                    <h5 class="ac-title">${item.title}</h5>
                    <div class="ac-progress-bar"><div class="ac-fill" style="width: ${item.progress}%"></div></div>
                </div>
                <div class="ac-percent">${item.progress}%</div>
            `;
            archiveList.appendChild(card);
        });
    }

    archiveTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            archiveTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            renderArchive(tab.dataset.tab);
        });
    });

    // 9. Heatmap Randomizer
    function randomizeHeatmap() {
        const cells = document.querySelectorAll('.h-cell');
        cells.forEach(cell => {
            const intensity = Math.floor(Math.random() * 5); // 0-4
            cell.className = `h-cell intensity-${intensity}`;
        });
    }

    // 10. Account Sync Logic
    const btnSync = document.getElementById('btn-sync');
    const syncModal = document.getElementById('sync-modal');
    const syncLoadingState = document.getElementById('sync-loading-state');
    const syncSuccessState = document.getElementById('sync-success-state');
    const syncProgressFill = document.getElementById('sync-progress-fill');
    const btnSyncConfirm = document.getElementById('btn-sync-confirm');

    if (btnSync && syncModal) {
        btnSync.addEventListener('click', () => {
            console.log('Sync Button Clicked');
            // Reset and Show Modal
            syncModal.classList.remove('hidden');
            syncLoadingState.classList.remove('hidden');
            syncSuccessState.classList.add('hidden');
            syncProgressFill.style.width = '0%';

            // Start Progress Animation
            let progress = 0;
            const interval = setInterval(() => {
                progress += Math.random() * 15;
                if (progress >= 100) {
                    progress = 100;
                    clearInterval(interval);
                    
                    // Switch to Success State after a short delay
                    setTimeout(() => {
                        syncLoadingState.classList.add('hidden');
                        syncSuccessState.classList.remove('hidden');
                    }, 500);
                }
                syncProgressFill.style.width = progress + '%';
            }, 200);
        });
    }

    if (btnSyncConfirm && syncModal) {
        btnSyncConfirm.addEventListener('click', () => {
            syncModal.classList.add('hidden');
        });
    }
});
