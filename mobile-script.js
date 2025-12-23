// Variables globales
let currentSection = 'convenio-completo';

// Función para entrar a la aplicación desde la portada
function enterApp() {
    const splashScreen = document.getElementById('splash-screen');
    const mainApp = document.getElementById('main-app');
    
    splashScreen.classList.add('hidden');
    
    setTimeout(() => {
        splashScreen.style.display = 'none';
        mainApp.classList.add('active');
    }, 500);
}

// Función para mostrar secciones
function showSection(sectionId) {
    // Ocultar todas las secciones
    const sections = document.querySelectorAll('.mobile-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Remover clase active de todos los botones de navegación
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    document.getElementById(sectionId).classList.add('active');
    
    // Marcar el botón de navegación como activo
    event.target.closest('.nav-item').classList.add('active');
    
    // Actualizar sección actual
    currentSection = sectionId;
    
    // Cerrar menú si está abierto
    const nav = document.getElementById('mobile-nav');
    nav.classList.remove('open');
}

// Función para toggle del menú móvil
function toggleMenu() {
    const nav = document.getElementById('mobile-nav');
    nav.classList.toggle('open');
}

// Función para el acordeón móvil
function toggleMobileAccordion(contentId) {
    const content = document.getElementById(contentId);
    const header = content.previousElementSibling;
    const icon = header.querySelector('.mobile-accordion-icon');
    
    // Cerrar todos los otros acordeones en la misma sección
    const allContents = document.querySelectorAll('.mobile-accordion-content');
    const allIcons = document.querySelectorAll('.mobile-accordion-icon');
    
    allContents.forEach((item, index) => {
        if (item.id !== contentId) {
            item.classList.remove('active');
            allIcons[index].textContent = '+';
            allIcons[index].style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle del acordeón actual
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        icon.textContent = '+';
        icon.style.transform = 'rotate(0deg)';
    } else {
        content.classList.add('active');
        icon.textContent = '−';
        icon.style.transform = 'rotate(180deg)';
        
        // Scroll suave al contenido
        setTimeout(() => {
            content.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'nearest' 
            });
        }, 300);
    }
}

// Función para calcular salario móvil
function calculateMobileSalary() {
    // Crear modal de calculadora
    const modal = document.createElement('div');
    modal.className = 'mobile-calculator-modal';
    modal.innerHTML = `
        <div class="mobile-calculator-content">
            <div class="calculator-header">
                <h3>Calculadora de Salario</h3>
                <button onclick="closeMobileCalculator()" class="close-btn">×</button>
            </div>
            <div class="calculator-body">
                <div class="input-group">
                    <label>Salario Base (€)</label>
                    <input type="number" id="mobile-base-salary" placeholder="1500" />
                </div>
                <div class="input-group">
                    <label>Antigüedad (%)</label>
                    <input type="number" id="mobile-antiquity" placeholder="0" max="35" />
                </div>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="mobile-night-shift" />
                        Plus Nocturnidad (+25%)
                    </label>
                </div>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="mobile-holiday" />
                        Plus Festividad (+50%)
                    </label>
                </div>
                <div class="checkbox-group">
                    <label>
                        <input type="checkbox" id="mobile-danger" />
                        Plus Peligrosidad (+180€)
                    </label>
                </div>
                <button onclick="calculateMobileResult()" class="calculate-btn">Calcular</button>
                <div id="mobile-result" class="result-display"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Añadir estilos del modal
    const style = document.createElement('style');
    style.textContent = `
        .mobile-calculator-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            padding: 1rem;
        }
        .mobile-calculator-content {
            background: white;
            border-radius: 12px;
            width: 100%;
            max-width: 400px;
            max-height: 90vh;
            overflow-y: auto;
        }
        .calculator-header {
            background: #c41e3a;
            color: white;
            padding: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-radius: 12px 12px 0 0;
        }
        .close-btn {
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
        }
        .calculator-body {
            padding: 1.5rem;
        }
        .input-group {
            margin-bottom: 1rem;
        }
        .input-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: #c41e3a;
        }
        .input-group input {
            width: 100%;
            padding: 0.8rem;
            border: 2px solid #e9ecef;
            border-radius: 8px;
            font-size: 1rem;
        }
        .checkbox-group {
            margin-bottom: 1rem;
        }
        .checkbox-group label {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            cursor: pointer;
        }
        .calculate-btn {
            width: 100%;
            background: #c41e3a;
            color: white;
            border: none;
            padding: 1rem;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            margin-bottom: 1rem;
        }
        .result-display {
            background: #f8f9fa;
            padding: 1rem;
            border-radius: 8px;
            text-align: center;
            font-weight: 600;
            color: #c41e3a;
        }
    `;
    document.head.appendChild(style);
}

function calculateMobileResult() {
    const baseSalary = parseFloat(document.getElementById('mobile-base-salary').value) || 0;
    const antiquity = parseFloat(document.getElementById('mobile-antiquity').value) || 0;
    const nightShift = document.getElementById('mobile-night-shift').checked;
    const holiday = document.getElementById('mobile-holiday').checked;
    const danger = document.getElementById('mobile-danger').checked;
    
    let totalSalary = baseSalary;
    
    // Plus de transporte
    totalSalary += 120;
    
    // Antigüedad
    totalSalary += baseSalary * (antiquity / 100);
    
    // Plus de nocturnidad
    if (nightShift) {
        totalSalary += baseSalary * 0.25;
    }
    
    // Plus de festividad
    if (holiday) {
        totalSalary += baseSalary * 0.50;
    }
    
    // Plus de peligrosidad
    if (danger) {
        totalSalary += 180;
    }
    
    document.getElementById('mobile-result').innerHTML = `
        <div style="font-size: 1.2rem; margin-bottom: 0.5rem;">
            Salario Total: <strong>${totalSalary.toFixed(2)}€</strong>
        </div>
        <div style="font-size: 0.9rem; opacity: 0.8;">
            Incluye plus de transporte (120€)
        </div>
    `;
}

function closeMobileCalculator() {
    const modal = document.querySelector('.mobile-calculator-modal');
    if (modal) {
        modal.remove();
    }
}

// Función para compartir contenido
function shareContent() {
    if (navigator.share) {
        navigator.share({
            title: 'Convenio Estatal de Jardinería 2021-2024',
            text: 'Consulta el convenio colectivo de jardinería con UGT-SP',
            url: window.location.href
        });
    } else {
        // Fallback para navegadores que no soportan Web Share API
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            showToast('Enlace copiado al portapapeles');
        });
    }
}

// Función para mostrar notificaciones toast
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'mobile-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%);
        background: #c41e3a;
        color: white;
        padding: 1rem 2rem;
        border-radius: 25px;
        z-index: 1001;
        font-weight: 600;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Detectar si es móvil y mostrar la portada
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Auto-ocultar la portada después de 3 segundos si no se hace clic
        setTimeout(() => {
            const splashScreen = document.getElementById('splash-screen');
            if (splashScreen && !splashScreen.classList.contains('hidden')) {
                // Mostrar hint para hacer clic
                const hint = document.createElement('div');
                hint.textContent = 'Toca para continuar';
                hint.style.cssText = `
                    position: absolute;
                    bottom: 2rem;
                    left: 50%;
                    transform: translateX(-50%);
                    color: white;
                    font-size: 0.9rem;
                    opacity: 0.8;
                    animation: pulse 2s infinite;
                `;
                document.querySelector('.splash-content').appendChild(hint);
            }
        }, 3000);
    }
    
    // Manejar orientación del dispositivo
    window.addEventListener('orientationchange', function() {
        setTimeout(() => {
            // Reajustar altura de acordeones abiertos
            const activeAccordions = document.querySelectorAll('.mobile-accordion-content.active');
            activeAccordions.forEach(accordion => {
                accordion.style.maxHeight = 'none';
                const height = accordion.scrollHeight;
                accordion.style.maxHeight = height + 'px';
            });
        }, 100);
    });
    
    // Manejar swipe gestures
    let startX = 0;
    let startY = 0;
    
    document.addEventListener('touchstart', function(e) {
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    });
    
    document.addEventListener('touchend', function(e) {
        if (!startX || !startY) return;
        
        const endX = e.changedTouches[0].clientX;
        const endY = e.changedTouches[0].clientY;
        
        const diffX = startX - endX;
        const diffY = startY - endY;
        
        // Solo procesar swipes horizontales significativos
        if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
            const sections = ['convenio-completo', 'tablas-salariales', 'permisos-retribuidos'];
            const currentIndex = sections.indexOf(currentSection);
            
            if (diffX > 0 && currentIndex < sections.length - 1) {
                // Swipe izquierda - siguiente sección
                showSectionByIndex(currentIndex + 1);
            } else if (diffX < 0 && currentIndex > 0) {
                // Swipe derecha - sección anterior
                showSectionByIndex(currentIndex - 1);
            }
        }
        
        startX = 0;
        startY = 0;
    });
});

function showSectionByIndex(index) {
    const sections = ['convenio-completo', 'tablas-salariales', 'permisos-retribuidos'];
    const navItems = document.querySelectorAll('.nav-item');
    
    if (index >= 0 && index < sections.length) {
        // Ocultar todas las secciones
        document.querySelectorAll('.mobile-section').forEach(section => {
            section.classList.remove('active');
        });
        
        // Remover clase active de todos los botones
        navItems.forEach(item => {
            item.classList.remove('active');
        });
        
        // Mostrar la sección seleccionada
        document.getElementById(sections[index]).classList.add('active');
        navItems[index].classList.add('active');
        
        currentSection = sections[index];
    }
}

// Añadir estilos para animación pulse
const pulseStyle = document.createElement('style');
pulseStyle.textContent = `
    @keyframes pulse {
        0% { opacity: 0.8; }
        50% { opacity: 0.4; }
        100% { opacity: 0.8; }
    }
`;
document.head.appendChild(pulseStyle);