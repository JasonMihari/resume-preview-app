document.addEventListener('DOMContentLoaded', () => {
    const darkModeBtn = document.getElementById('toggle-darkmode');
    darkModeBtn.onclick = () => document.body.classList.toggle('dark-mode');

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.tab-btn.active').classList.remove('active');
            btn.classList.add('active');

            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });
});

function updateStatus(status) {
    fetch('/update_status', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({awarded: status})
    }).then(response => response.json())
    .then(data => {
        document.getElementById('status-result').innerText = `Status updated: ${status}`;
    });
}
