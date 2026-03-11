const template = document.getElementById("cost-input"); //Grabs the template from HTML
customElements.define("cost-inputs", class extends HTMLElement { //Defines a custom element called "cost-inputs"
    static get observedAttributes() { return ["name"]; }
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
    connectedCallback() {
        this.shadowRoot.querySelector("label").textContent = this.getAttribute("name");
    }
});

const headers = document.querySelectorAll(".section-header");

for (let header of headers) {
    header.addEventListener("click", (e) => {
        // add event listener to each, when it click change the panel class display
        // if display == block set to none, else set to block
        // this will hopefully allow the dropdowns to work 😁
    })
}


//Total Tax Calculator
const taxTotal = document.getElementById("total-income-tax");
const federalInput = document.getElementById("federal-tax");
const stateInput = document.getElementById("state-tax");
const securityInput = document.getElementById("social-security-tax");
const medicareInput = document.getElementById("medicare-tax");

function calculateTaxes() {
    let payingTaxTotal =
        parseFloat(federalInput.value || 0) +
        parseFloat(stateInput.value || 0) +
        parseFloat(securityInput.value || 0) +
        parseFloat(medicareInput.value || 0);
    return payingTaxTotal;
}

addEventListener("input", () => {
    taxTotal.textContent = calculateTaxes();
});

//Total Monthy Liabilities Calculator
const liabilitiesTotal = document.getElementById("total-monthly-liabilities");
const housingInput = document.getElementById("house");
const carLoanInput = document.getElementById("car");
const creditInput = document.getElementById("credit");
const debtsInput = document.getElementById("debts");

function monthlyLiabilities() {
    let payingLiabilitiesTotal =
        parseFloat(housingInput.value || 0) +
        parseFloat(carLoanInput.value || 0) +
        parseFloat(creditInput.value || 0) +
        parseFloat(debtsInput.value || 0);
    return payingLiabilitiesTotal;
}

addEventListener("input", () => {
    liabilitiesTotal.textContent = monthlyLiabilities();
});

//Total Monthly Essentials Calculator
const essentialsTotal = document.getElementById("total-monthly-essentials");
const groceriesInput = document.getElementById("groceries");
const travelInput = document.getElementById("travel");
const childCareInput = document.getElementById("child-care");
const medicalInput = document.getElementById("medical");

function monthlyEssentials() {
    let payingMonthlyEssentialsTotal =
        parseFloat(groceriesInput.value || 0) +
        parseFloat(travelInput.value || 0) +
        parseFloat(childCareInput.value || 0) +
        parseFloat(medicalInput.value || 0);
    return payingMonthlyEssentialsTotal;
}

addEventListener("input", () => {
    essentialsTotal.textContent = monthlyEssentials();
});

//Total Monthly Insurance Calculator
const insuranceTotal = document.getElementById("total-monthly-insurance");
const autoInsureInput = document.getElementById("autoInsure");
const homeInsureInput = document.getElementById("homeInsure");
const healthInsureInput = document.getElementById("healthInsure");
const lifeInsureInput = document.getElementById("lifeInsure");

function monthlyInsurance() {
    let payingMonthlyInsuranceTotal =
        parseFloat(autoInsureInput.value || 0) +
        parseFloat(homeInsureInput.value || 0) +
        parseFloat(healthInsureInput.value || 0) +
        parseFloat(lifeInsureInput.value || 0);
    return payingMonthlyInsuranceTotal;
}

addEventListener("input", () => {
    insuranceTotal.textContent = monthlyInsurance();
});

//Total Monthly Other Calculator
const otherTotal = document.getElementById("total-monthly-other");
const otherInput = document.getElementById("other");

addEventListener("input", () => {
    otherTotal.textContent = parseFloat(otherInput.value || 0);
});