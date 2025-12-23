// Función para cambiar entre pestañas
function openTab(evt, tabName) {
    // Ocultar todo el contenido de las pestañas
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }
    
    // Remover la clase active de todos los botones
    const tabButtons = document.getElementsByClassName("tab-button");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }
    
    // Mostrar la pestaña seleccionada y marcar el botón como activo
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Función para el acordeón
function toggleAccordion(contentId) {
    const content = document.getElementById(contentId);
    const header = content.previousElementSibling;
    const icon = header.querySelector('.accordion-icon');
    
    // Cerrar todos los otros acordeones
    const allContents = document.querySelectorAll('.accordion-content');
    const allIcons = document.querySelectorAll('.accordion-icon');
    
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
    }
}

// Función para buscar contenido (opcional - para futuras mejoras)
function searchContent(searchTerm) {
    const allContent = document.querySelectorAll('.tab-content p, .tab-content li, .tab-content td');
    const searchTermLower = searchTerm.toLowerCase();
    
    allContent.forEach(element => {
        const text = element.textContent.toLowerCase();
        if (text.includes(searchTermLower)) {
            element.style.backgroundColor = '#fff3cd';
        } else {
            element.style.backgroundColor = '';
        }
    });
}

// Función para imprimir la pestaña activa
function printActiveTab() {
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab) {
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Convenio Estatal de Jardinería 2021-2024</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h2, h3, h4 { color: #2c5530; }
                    table { border-collapse: collapse; width: 100%; margin: 20px 0; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #4a7c59; color: white; }
                    .permiso-item { margin: 15px 0; padding: 10px; border-left: 3px solid #4a7c59; }
                    @media print { body { margin: 0; } }
                </style>
            </head>
            <body>
                <h1>Convenio Colectivo Estatal de Jardinería 2021-2024</h1>
                ${activeTab.innerHTML}
            </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    }
}

// Función para calcular salario con complementos
function calculateSalary(baseSalary, transport = 120, antiquity = 0, nightShift = false, holiday = false, danger = false) {
    let totalSalary = baseSalary;
    
    // Plus de transporte
    totalSalary += transport;
    
    // Antigüedad (porcentaje sobre salario base)
    totalSalary += baseSalary * (antiquity / 100);
    
    // Plus de nocturnidad (25% sobre salario base)
    if (nightShift) {
        totalSalary += baseSalary * 0.25;
    }
    
    // Plus de festividad (50% sobre salario base)
    if (holiday) {
        totalSalary += baseSalary * 0.50;
    }
    
    // Plus de peligrosidad
    if (danger) {
        totalSalary += 180;
    }
    
    return totalSalary;
}

// Función para mostrar calculadora de salario (opcional)
function showSalaryCalculator() {
    const calculator = document.createElement('div');
    calculator.innerHTML = `
        <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                    background: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); 
                    z-index: 1000; max-width: 400px; width: 90%;">
            <h3>Calculadora de Salario</h3>
            <label>Salario Base: <input type="number" id="baseSalary" placeholder="1500"></label><br><br>
            <label>Antigüedad (%): <input type="number" id="antiquity" placeholder="0" max="35"></label><br><br>
            <label><input type="checkbox" id="nightShift"> Plus Nocturnidad</label><br>
            <label><input type="checkbox" id="holiday"> Plus Festividad</label><br>
            <label><input type="checkbox" id="danger"> Plus Peligrosidad</label><br><br>
            <button onclick="calculateAndShow()">Calcular</button>
            <button onclick="closeCalculator()">Cerrar</button>
            <div id="result" style="margin-top: 15px; font-weight: bold; color: #2c5530;"></div>
        </div>
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                    background: rgba(0,0,0,0.5); z-index: 999;" onclick="closeCalculator()"></div>
    `;
    document.body.appendChild(calculator);
}

function calculateAndShow() {
    const baseSalary = parseFloat(document.getElementById('baseSalary').value) || 0;
    const antiquity = parseFloat(document.getElementById('antiquity').value) || 0;
    const nightShift = document.getElementById('nightShift').checked;
    const holiday = document.getElementById('holiday').checked;
    const danger = document.getElementById('danger').checked;
    
    const total = calculateSalary(baseSalary, 120, antiquity, nightShift, holiday, danger);
    
    document.getElementById('result').innerHTML = `
        <p>Salario Total: <strong>${total.toFixed(2)}€</strong></p>
        <small>Incluye plus de transporte (120€)</small>
    `;
}

function closeCalculator() {
    const calculator = document.querySelector('div[style*="position: fixed"]').parentElement;
    if (calculator) {
        calculator.remove();
    }
}

// Event listeners para mejorar la experiencia
document.addEventListener('DOMContentLoaded', function() {
    // Agregar funcionalidad de búsqueda rápida con Ctrl+F
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 'f') {
            e.preventDefault();
            const searchTerm = prompt('Buscar en el contenido:');
            if (searchTerm) {
                searchContent(searchTerm);
            }
        }
        
        // Atajos de teclado para cambiar pestañas
        if (e.ctrlKey && e.key >= '1' && e.key <= '3') {
            e.preventDefault();
            const tabIndex = parseInt(e.key) - 1;
            const tabButtons = document.querySelectorAll('.tab-button');
            if (tabButtons[tabIndex]) {
                tabButtons[tabIndex].click();
            }
        }
    });
    
    // Agregar tooltips a las tablas salariales
    const salaryRows = document.querySelectorAll('.salary-table tbody tr');
    salaryRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            const category = this.cells[1].textContent;
            const salary = this.cells[2].textContent;
            this.title = `${category}: ${salary} (más complementos aplicables)`;
        });
    });
    
    // Smooth scroll para navegación interna
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
});

// Función para exportar datos a CSV (opcional)
function exportTableToCSV(tableId, filename) {
    const table = document.getElementById(tableId);
    if (!table) return;
    
    let csv = [];
    const rows = table.querySelectorAll('tr');
    
    for (let i = 0; i < rows.length; i++) {
        const row = [];
        const cols = rows[i].querySelectorAll('td, th');
        
        for (let j = 0; j < cols.length; j++) {
            row.push(cols[j].innerText);
        }
        csv.push(row.join(','));
    }
    
    const csvFile = new Blob([csv.join('\n')], { type: 'text/csv' });
    const downloadLink = document.createElement('a');
    downloadLink.download = filename;
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = 'none';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}