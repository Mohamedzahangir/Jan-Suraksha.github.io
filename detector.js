// Page Navigation
function navigateTo(page) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.classList.remove('active'));

    // Show selected page
    const selectedPage = document.getElementById(page + 'Page');
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Update navigation buttons
    const navButtons = document.querySelectorAll('.nav-item');
    navButtons.forEach(btn => btn.classList.remove('active'));
    
    // Find and activate the clicked nav button
    const clickedButton = Array.from(navButtons).find(
        btn => btn.getAttribute('onclick').includes(page)
    );
    if (clickedButton) {
        clickedButton.classList.add('active');
    }
}

// Popup Functions
function openPopup() {
    const input = document.getElementById('searchInput').value;
    if (!input.trim()) {
        alert('Please enter a URL, UPI ID, or text to scan');
        return;
    }
    document.getElementById('scanInput').textContent = input;
    document.getElementById('scanPopup').classList.remove('hidden');
}

function closePopup(popupId = 'scanPopup') {
    document.getElementById(popupId).classList.add('hidden');
}

function startScan() {
    const input = document.getElementById('searchInput').value;
    // Simulate scanning process
    closePopup('scanPopup');
    
    // Random result for demonstration
    const isScam = Math.random() > 0.5;
    
    if (isScam) {
        showScamResult(input);
    } else {
        showSafeResult(input);
    }
}

function showSafeResult(content) {
    document.getElementById('safeContent').textContent = content;
    document.getElementById('safePopup').classList.remove('hidden');
    updateStats('safe');
}

function showScamResult(content) {
    document.getElementById('scamContent').textContent = content;
    document.getElementById('scamPopup').classList.remove('hidden');
    updateStats('scam');
}

function blockContent() {
    closePopup('scamPopup');
    alert('Content has been blocked');
}

function reportScam() {
    alert('Scam reported to our database');
}

function proceedAnyway() {
    if (confirm('Are you sure? This content may be dangerous.')) {
        closePopup('scamPopup');
    }
}

function updateStats(type) {
    const safeCount = document.getElementById('safeCount');
    const scamCount = document.getElementById('scamCount');
    
    if (type === 'safe') {
        safeCount.textContent = parseInt(safeCount.textContent) + 1;
    } else {
        scamCount.textContent = parseInt(scamCount.textContent) + 1;
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    const scanBtn = document.getElementById('scanBtn');
    if (scanBtn) {
        scanBtn.addEventListener('click', openPopup);
    }

    const toggleBtn = document.getElementById('toggleExtension');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isEnabled = toggleBtn.classList.contains('enabled');
            const extensionCard = document.getElementById('extensionCard');
            const statusDot = document.getElementById('statusDot');
            const statusIndicator = document.getElementById('statusIndicator');
            const statusText = document.getElementById('statusText');
            const statusDescription = document.getElementById('statusDescription');

            if (isEnabled) {
                toggleBtn.classList.remove('enabled');
                toggleBtn.classList.add('disabled');
                toggleBtn.textContent = 'OFF';
                extensionCard.classList.remove('enabled');
                extensionCard.classList.add('disabled');
                statusDot.classList.remove('active');
                statusDot.classList.add('inactive');
                statusIndicator.classList.remove('active');
                statusIndicator.classList.add('inactive');
                statusText.textContent = 'OFF';
                statusDescription.textContent = 'Protection is disabled';
            } else {
                toggleBtn.classList.remove('disabled');
                toggleBtn.classList.add('enabled');
                toggleBtn.textContent = 'ON';
                extensionCard.classList.remove('disabled');
                extensionCard.classList.add('enabled');
                statusDot.classList.remove('inactive');
                statusDot.classList.add('active');
                statusIndicator.classList.remove('inactive');
                statusIndicator.classList.add('active');
                statusText.textContent = 'ON';
                statusDescription.textContent = 'Actively monitoring apps';
            }
        });
    }
});