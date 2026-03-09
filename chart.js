// --- DOM Setup ---

const canvas = document.getElementById('chart');
const incomeInput = document.getElementById('incomeInput');
const housingInput = document.getElementById('house');
const carLoanInput = document.getElementById('car');
const creditInput = document.getElementById('credit');
const debtsInput = document.getElementById('debts')
//Add in the other inputs that are needed for the chart *DON'T include income or tax*

let currentChart = null;

// Build chart config from current input values
function buildChartConfig() {

  const labels = ['Housing', 'Car Loans', 'Credit Cards', 'Other Debts'];
  const data = [housingInput, carLoanInput, creditInput, debtsInput];
    //Add in data and labels for the inputs added
  return {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        label: 'Monthly (USD)',
        data,
        backgroundColor: [
          '#8979FF', '#FF928A', '#3CC3DF', '#FFAE4C', '#537FF1'
        ]
        // Change color according to palette and amount of inputs
      }]
    },
    options: {
      plugins: {
        title: { display: true, text: "Expenses Pie Chart" }
      }
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
