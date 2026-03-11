// @ts-check

const template = /** @type {HTMLTemplateElement} */ (
    document.getElementById('cost-input')
); //Grabs the template from HTML
customElements.define(
    'cost-inputs',
    class extends HTMLElement {
        //Defines a custom element called "cost-inputs"
        static get observedAttributes() {
            return ['name'];
        }
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.shadowRoot?.appendChild(template.content.cloneNode(true));
        }
        connectedCallback() {
            /** @type {HTMLLabelElement} */ (
                this.shadowRoot?.querySelector('label')
            ).textContent = this.getAttribute('name');
        }
    }
);

const headers = document.querySelectorAll('.section-header');

for (let header of headers) {
    header.addEventListener('click', e => {
        // add event listener to each, when it click change the panel class display
        // if display == block set to none, else set to block
        // this will hopefully allow the dropdowns to work 😁
    });
}

//Total Tax Calculator
const taxTotal = /** @type {HTMLSpanElement} */ (
    document.getElementById('total-income-tax')
);
const federalInput = /** @type {HTMLInputElement} */ (
    document.getElementById('federal-tax')
);
const stateInput = /** @type {HTMLInputElement} */ (
    document.getElementById('state-tax')
);
const securityInput = /** @type {HTMLInputElement} */ (
    document.getElementById('social-security-tax')
);
const medicareInput = /** @type {HTMLInputElement} */ (
    document.getElementById('medicare-tax')
);

function calculateTaxes() {
    let payingTaxTotal =
        parseFloat(federalInput.value || '0') +
        parseFloat(stateInput.value || '0') +
        parseFloat(securityInput.value || '0') +
        parseFloat(medicareInput.value || '0');
    return payingTaxTotal.toFixed(2);
}

addEventListener('input', () => {
    taxTotal.textContent = calculateTaxes();
});

//Total Monthy Liabilities Calculator
const liabilitiesTotal = /** @type {HTMLSpanElement} */ (
    document.getElementById('total-monthly-liabilities')
);
const housingInput = /** @type {HTMLInputElement} */ (
    document.getElementById('house')
);
const carLoanInput = /** @type {HTMLInputElement} */ (
    document.getElementById('car')
);
const creditInput = /** @type {HTMLInputElement} */ (
    document.getElementById('credit')
);
const debtsInput = /** @type {HTMLInputElement} */ (
    document.getElementById('debts')
);

function monthlyLiabilities() {
    let payingLiabilitiesTotal =
        parseFloat(housingInput.value || '0') +
        parseFloat(carLoanInput.value || '0') +
        parseFloat(creditInput.value || '0') +
        parseFloat(debtsInput.value || '0');
    return payingLiabilitiesTotal.toFixed(2);
}

addEventListener('input', () => {
    liabilitiesTotal.textContent = monthlyLiabilities();
});

//Total Monthly Essentials Calculator
const essentialsTotal = /** @type {HTMLSpanElement} */ (
    document.getElementById('total-monthly-essentials')
);
const groceriesInput = /** @type {HTMLInputElement} */ (
    document.getElementById('groceries')
);
const travelInput = /** @type {HTMLInputElement} */ (
    document.getElementById('travel')
);
const childCareInput = /** @type {HTMLInputElement} */ (
    document.getElementById('child-care')
);
const medicalInput = /** @type {HTMLInputElement} */ (
    document.getElementById('medical')
);

function monthlyEssentials() {
    let payingMonthlyEssentialsTotal =
        parseFloat(groceriesInput.value || '0') +
        parseFloat(travelInput.value || '0') +
        parseFloat(childCareInput.value || '0') +
        parseFloat(medicalInput.value || '0');
    return payingMonthlyEssentialsTotal.toFixed(2);
}

addEventListener('input', () => {
    essentialsTotal.textContent = monthlyEssentials();
});

//Total Monthly Insurance Calculator
const insuranceTotal = /** @type {HTMLInputElement} */ (
    document.getElementById('total-monthly-insurance')
);
const autoInsureInput = /** @type {HTMLInputElement} */ (
    document.getElementById('autoInsure')
);
const homeInsureInput = /** @type {HTMLInputElement} */ (
    document.getElementById('homeInsure')
);
const healthInsureInput = /** @type {HTMLInputElement} */ (
    document.getElementById('healthInsure')
);
const lifeInsureInput = /** @type {HTMLInputElement} */ (
    document.getElementById('lifeInsure')
);

function monthlyInsurance() {
    let payingMonthlyInsuranceTotal =
        parseFloat(autoInsureInput.value || '0') +
        parseFloat(homeInsureInput.value || '0') +
        parseFloat(healthInsureInput.value || '0') +
        parseFloat(lifeInsureInput.value || '0');
    return payingMonthlyInsuranceTotal.toFixed(2);
}

addEventListener('input', () => {
    insuranceTotal.textContent = monthlyInsurance();
});

//Total Monthly Other Calculator
const otherTotal = /** @type {HTMLSpanElement} */ (
    document.getElementById('total-monthly-other')
);
const otherInput = /** @type {HTMLInputElement} */ (
    document.getElementById('other')
);

addEventListener('input', () => {
    otherTotal.textContent = parseFloat(otherInput.value || '0').toFixed(2);
});

/**
 * @param {number} money
 */
function format_money(money, omit_dollar_sign = false) {
    let res = money.toFixed(2);
    do {
        res = res.replace(
            /([0-9]+)([0-9]{3})((([0-9]{3})*))/g,
            (_, a, b, c) => `${a},${b}${c}`
        );
    } while (res.match(/[0-9]{4}/));
    if (omit_dollar_sign) {
        return res;
    }
    if (res.startsWith('-')) {
        return `-$${res.slice(1)}`;
    }
    return `$${res}`;
}

document.querySelector('#incomeInput')?.addEventListener('input', event => {
    /** @type {HTMLSpanElement} */ (
        document.querySelector(
            'section > section > .monthlyStats > section > #monthly-income'
        )
    ).textContent = format_money(
        +(/** @type {HTMLInputElement} */ (event.target).value) / 12
    );
});

addEventListener('input', () => {
    const [income, expenses, savings, yearly_savings] =
        document.querySelectorAll(
            'section > section > .monthlyStats > section > span'
        );
    expenses.textContent = format_money(
        [...document.querySelectorAll('span[id^=total-]').values()].reduce(
            (acc, curr) => acc + +curr.textContent,
            0
        )
    );
    savings.textContent = format_money(
        +income.textContent.replace(/[$,]/g, '') -
            +expenses.textContent.replace(/[$,]/g, '')
    );
    yearly_savings.textContent = format_money(
        +savings.textContent.replace(/[$,]/g, '') * 12
    );
});
