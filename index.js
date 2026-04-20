// Глобальные переменные
let currentUser = null;

// Функция для отображения меню в зависимости от состояния авторизации
function renderMenu() {
    const menuContainer = document.getElementById('mainMenu');
    
    if (currentUser) {
        menuContainer.innerHTML = `
            <a href="#top">Главное</a>
            <a href="#about">О нас</a>
            <a href="#contact">Контакты</a>
            <div class="user-profile">
                <div class="user-avatar">${currentUser.username.charAt(0).toUpperCase()}</div>
                <div class="user-name">${currentUser.username}</div>
                <button class="logout-btn" onclick="logoutUser()">Выйти</button>
            </div>
        `;
    } else {
        menuContainer.innerHTML = `
            <a href="#top">Главное</a>
            <a href="#about">О нас</a>
            <a href="#contact">Контакты</a>
            <button class="register-btn" onclick="openRegistration()">Регистрация</button>
        `;
    }
    
    renderSidebar();
    
    document.querySelectorAll('.menu a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            let targetPosition;
            if (targetId === '#about') {
                targetPosition = document.body.scrollHeight - window.innerHeight;
            } else if (targetId === '#contact') {
                const targetElement = document.querySelector('footer');
                const headerHeight = document.querySelector('header').offsetHeight;
                targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            } else {
                const targetElement = document.querySelector(targetId);
                const headerHeight = document.querySelector('header').offsetHeight;
                targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
            }
            
            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
            history.pushState(null, null, targetId);
        });
    });
}

function renderSidebar() {
    const sidebarMenu = document.getElementById('sidebarMenu');
    const sidebarUserStatus = document.getElementById('sidebarUserStatus');
    
    if (currentUser) {
        sidebarUserStatus.innerHTML = `✅ Добро пожаловать, ${currentUser.username}!`;
        sidebarUserStatus.style.color = "#4ecdc4";
        
        sidebarMenu.innerHTML = `
            <li><a href="#" onclick="showToast('🛠️ Крафт верстак - скоро будет доступен!'); return false;">
                <span class="emoji">🛠️</span>
                <span class="text">Крафт верстак</span>
            </a></li>
            <li><a href="#" onclick="showToast('🧪 Зельеварка - скоро будет доступна!'); return false;">
                <span class="emoji">🧪</span>
                <span class="text">Зельеварка</span>
            </a></li>
            <li><a href="#" onclick="showToast('⌨️ Консольные команды - скоро будут доступны!'); return false;">
                <span class="emoji">⌨️</span>
                <span class="text">Консольные команды</span>
            </a></li>
            <li><a href="#" onclick="showToast('📖 Гайды - скоро будут доступны!'); return false;">
                <span class="emoji">📖</span>
                <span class="text">Гайды для новичков</span>
            </a></li>
            <li><a href="#" onclick="showToast('🏆 Достижения - скоро будут доступны!'); return false;">
                <span class="emoji">🏆</span>
                <span class="text">Достижения</span>
            </a></li>
        `;
    } else {
        sidebarUserStatus.innerHTML = `🔒 Зарегистрируйтесь, чтобы открыть меню!`;
        sidebarUserStatus.style.color = "#ff6b6b";
        
        sidebarMenu.innerHTML = `
            <li style="list-style: none; margin-bottom: 15px;">
                <div style="background: rgba(255, 107, 107, 0.1); border-radius: 15px; border: 2px dashed rgba(255, 107, 107, 0.5); text-align: center; padding: 15px;">
                    <p style="font-size: 12px; color: #ff6b6b; margin-bottom: 10px;">🔒 Этот раздел доступен только зарегистрированным пользователям</p>
                    <div style="background: linear-gradient(45deg, #4ecdc4, #45b7d1); padding: 8px 15px; border-radius: 8px; font-size: 10px; font-family: 'Press Start 2P', cursive; cursor: pointer; display: inline-block;" onclick="openRegistration()">📝 Зарегистрироваться →</div>
                </div>
            </li>
            <li><a href="#" onclick="showLockedToast(); return false;">
                <span class="emoji">🛠️</span>
                <span class="text">Крафт верстак (🔒)</span>
            </a></li>
            <li><a href="#" onclick="showLockedToast(); return false;">
                <span class="emoji">🧪</span>
                <span class="text">Зельеварка (🔒)</span>
            </a></li>
            <li><a href="#" onclick="showLockedToast(); return false;">
                <span class="emoji">⌨️</span>
                <span class="text">Консольные команды (🔒)</span>
            </a></li>
            <li><a href="#" onclick="showLockedToast(); return false;">
                <span class="emoji">📖</span>
                <span class="text">Гайды (🔒)</span>
            </a></li>
        `;
    }
}

function showLockedToast() {
    showToast('⚠️ Зарегистрируйтесь, чтобы разблокировать этот раздел!');
}

function showToast(message) {
    const toast = document.getElementById('toastNotification');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const burger = document.getElementById('burgerMenu');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    burger.classList.toggle('open');
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const burger = document.getElementById('burgerMenu');
    
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    burger.classList.remove('open');
}

function checkSavedUser() {
    const savedUser = localStorage.getItem('minecraftUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        renderMenu();
    } else {
        renderSidebar();
    }
}

function openRegistration() {
    closeSidebar();
    document.getElementById('registrationModal').style.display = 'flex';
}

function closeRegistration() {
    document.getElementById('registrationModal').style.display = 'none';
    document.getElementById('message').style.display = 'none';
    document.getElementById('registrationForm').reset();
}

function registerUser(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');
    
    message.style.display = 'none';
    message.className = 'message';
    
    if (!username || !email || !password) {
        showMessage('Заполните все поля!', 'error');
        return false;
    }
    
    if (password.length < 6) {
        showMessage('Пароль должен быть минимум 6 символов', 'error');
        return false;
    }
    
    if (!isValidEmail(email)) {
        showMessage('Введите корректный email', 'error');
        return false;
    }
    
    currentUser = {
        username: username,
        email: email,
        registeredAt: new Date().toLocaleString()
    };
    
    localStorage.setItem('minecraftUser', JSON.stringify(currentUser));
    
    showMessage(`Добро пожаловать, ${username}! Регистрация успешна.`, 'success');
    renderMenu();
    
    setTimeout(() => {
        closeRegistration();
        showToast(`🎉 Добро пожаловать в мир Minecraft, ${username}! Теперь вам доступно боковое меню! 🎉`);
    }, 1500);
    
    return false;
}

function logoutUser() {
    if (confirm('Вы уверены, что хотите выйти из аккаунта?')) {
        currentUser = null;
        localStorage.removeItem('minecraftUser');
        renderMenu();
        closeSidebar();
        showToast('👋 Вы вышли из аккаунта! Зарегистрируйтесь снова, чтобы получить доступ к меню.');
    }
}

function showMessage(text, type) {
    const message = document.getElementById('message');
    message.textContent = text;
    message.className = `message ${type}`;
    message.style.display = 'block';
}

function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

document.getElementById('registrationModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeRegistration();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    checkSavedUser();
    renderMenu();
});
