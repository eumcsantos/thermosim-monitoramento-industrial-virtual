// Configuração do Gráfico (Chart.js)
const ctx = document.getElementById('tempChart').getContext('2d');
const tempChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Eixo X: Tempo
        datasets: [{
            label: 'Temperatura (°C)',
            data: [], // Eixo Y: Temperatura
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderWidth: 2,
            fill: true,
            tension: 0.4 // Suavização da curva
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: { beginAtZero: false, suggestMin: 20, suggestMax: 100 }
        },
        animation: false // Desativa animação para performance em tempo real
    }
});

// Variável de controle
let monitoringInterval = null;

// Função para ligar/desligar simulação
async function toggleMachine() {
    const response = await fetch('/api/toggle', { method: 'POST' });
    const data = await response.json();
    
    const btn = document.getElementById('toggle-btn');
    const statusLabel = document.getElementById('machine-status');

    if (data.running) {
        btn.innerText = "DESLIGAR MÁQUINA";
        btn.classList.replace('btn-primary', 'btn-danger');
        statusLabel.innerText = "EM OPERAÇÃO";
        statusLabel.classList.replace('text-danger', 'text-success');
    } else {
        btn.innerText = "LIGAR MÁQUINA";
        btn.classList.replace('btn-danger', 'btn-primary');
        statusLabel.innerText = "PARADO";
        statusLabel.classList.replace('text-success', 'text-danger');
    }
}

// Função principal de atualização (Loop)
async function updateDashboard() {
    try {
        const response = await fetch('/api/readings');
        const data = await response.json();

        // Atualiza Display Numérico
        document.getElementById('current-temp').innerText = data.temperature.toFixed(1);

        // Atualiza Gráfico (Mantém apenas os últimos 20 pontos - Janela Deslizante)
        if (tempChart.data.labels.length > 20) {
            tempChart.data.labels.shift();
            tempChart.data.datasets[0].data.shift();
        }
        tempChart.data.labels.push(data.timestamp);
        tempChart.data.datasets[0].data.push(data.temperature);
        tempChart.update();

        // Atualiza Tabela de Logs
        const tableBody = document.getElementById('log-table-body');
        const row = `<tr>
                        <td>${data.timestamp}</td>
                        <td>${data.temperature} °C</td>
                        <td>${data.status}</td>
                     </tr>`;
        tableBody.insertAdjacentHTML('afterbegin', row); // Adiciona no topo

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}

// Inicia o polling a cada 1 segundo (1000ms)
setInterval(updateDashboard, 1000);