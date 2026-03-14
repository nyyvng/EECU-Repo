// --- DOM Setup ---

const canvas = document.getElementById('chartCanvas');
const income = (parseFloat(document.getElementById("incomeInput").value) || 0) / 12;
const taxes = document.getElementById('total-income-tax');
const liabilities = document.getElementById('total-monthly-liabilities');
const essentials = document.getElementById('total-monthly-essentials');
const insurance = document.getElementById('total-monthly-insurance');
const other = document.getElementById('total-monthly-other');

const expenses = taxes + liabilities + essentials + insurance + other;
const remaining = income - expenses;

//Add in the other inputs that are needed for the chart *DON'T include income or tax*

let currentChart = null;

// Build chart config from current input values
function buildChartConfig() {
    const labels = ['Income Taxes', 'Monthly Liabilities', 'Foods & Essentials', 'Insurance', 'Other Expenses', "Reamaining Balance"];
    const data = [taxes, liabilities, essentials, insurance, other, remaining].map(
        el => parseFloat(el.textContent) || 0
    );
    //Add in data and labels for the inputs added
    return {
        type: 'doughnut',
        data: {
            labels,
            datasets: [
                {
                    label: 'Monthly (USD)',
                    data,
                    backgroundColor: [
                        '#1C4F91', // Income Taxes
                        '#007CB9', // Monthly Liabilities
                        '#00AAD0', // Foods & Essentials
                        '#00D6D5', // Insurance
                        '#AAFFFF', // Other Expenses
                        '#DBFFFF' // Remaining Balance
                    ]
                    // Change color according to palette and amount of inputs
                }
            ]
        },
        options: {
            plugins: {
                title: { display: false },
                legend: { display: false }
            },

        }
    };
}

// Initialize Chart.js chart if available
function initChart() {
    if (typeof Chart === 'undefined') {
        console.warn('Chart.js not found - include Chart.js to render charts.');
        return null;
    }

    const cfg = buildChartConfig();
    currentChart = new Chart(canvas, cfg);
    return currentChart;
}

// Update existing chart data in-place to keep animation smooth
function refreshChart() {
    const cfg = buildChartConfig();
    if (!currentChart) {
        currentChart = initChart();
        return;
    }

    currentChart.data.labels = cfg.data.labels;
    currentChart.data.datasets[0].data = cfg.data.datasets[0].data;
    currentChart.options.plugins = cfg.options.plugins;
    currentChart.update();
}
// Listener
document.body.addEventListener('input', () => {
    refreshChart();
});

initChart();

//Chart labels
const monthlyIncome = document.getElementById('monthly-income');
const monthlyExpenses = document.getElementById('monthly-expenses');
const monthlySavings = document.getElementById('monthly-savings');
const yearlySavings = document.getElementById('yearly-savings');
