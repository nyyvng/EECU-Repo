// @ts-check



//Career Select 
async function careerSelector() {
    const selectCareer = document.getElementById('careerOption');
    try {
        const reponse = await fetch("https://eecu-data-server.vercel.app/data");
        if (!reponse.ok) {
            throw new Error("Network response not ok");
        }

        const users = await reponse.json();

        console.log(users);

        /** @type {{ Occupation: string }} */
        users.forEach(/** @param {{ Occupation: string }} user */ user => {
            const option = document.createElement('option');
            option.text = user["Occupation"];
            option.value = user["Occupation"];

            selectCareer?.appendChild(option);

        });
    } catch (error) {
        console.error('Error fetching careers:', error);
    }
}
careerSelector();


//Dropdowns (dropCheck button was added to this section but unfortunately doesnt work for some reason)
const headers = document.querySelectorAll(".section-header");

headers.forEach(header => {
    header.addEventListener('click', () => {

        const panel = /** @type {HTMLElement} */ (
            header.parentElement?.querySelector(".panel")
        );
        const button = /** @type {HTMLButtonElement} */ (
            header.querySelector(".dropCheck")
        );

        panel?.classList.toggle("open");

        if (!panel) return;

        if (button) {
            button.classList.toggle("rotate");
        }

        const panelStyle = window.getComputedStyle(panel).display;

        if (panelStyle === "none") {
            panel.style.display = "grid";
        } else {
            panel.style.display = "none";
        }
    });
});



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
            (acc, curr) => acc + +(curr.textContent ?? '0'),
            0
        )
    );
    savings.textContent = format_money(
        +(income?.textContent?.replace(/[$,]/g, '') || '0') -
        +expenses.textContent.replace(/[$,]/g, '')
    );
    yearly_savings.textContent = format_money(
        +savings.textContent.replace(/[$,]/g, '') * 12
    );
});





//Tax calculation (unsure if this works)
const initialIncome = parseFloat((/** @type {HTMLInputElement|null} */(document.getElementById("incomeInput")))?.value || '0');

/**
 * @param {number} income
 */
function federalTax(income) {
    if (income <= 12400) {
        return income * 0.10;
    }
    if (income <= 50400) {
        return (12400 * 0.10) + ((income - 12400) * 0.12);
    }
    return (12400 * 0.10) + ((50400 - 12400) * 0.12) + ((income - 50400) * 0.22);
}

function calculateTaxesFromIncome() {


    const incomeInput = document.getElementById("incomeInput");
    if (!incomeInput) {
        return;
    }

    const income = parseFloat((/** @type {HTMLInputElement} */ (incomeInput)).value) || 0;

    const standardDeduction = 16100;

    const taxableIncome = Math.max(0, income - standardDeduction);

    const federal = federalTax(taxableIncome);
    const state = income * 0.04;
    const social = income * 0.062;
    const medicare = income * 0.0145;

    const federalInput = document.getElementById("federal-tax");
    const stateInput = document.getElementById("state-tax");
    const securityInput = document.getElementById("social-security-tax");
    const medicareInput = document.getElementById("medicare-tax");

    if (
        federalInput instanceof HTMLInputElement &&
        stateInput instanceof HTMLInputElement &&
        securityInput instanceof HTMLInputElement &&
        medicareInput instanceof HTMLInputElement
    ) {
        federalInput.value = (federal / 12).toFixed(2);
        stateInput.value = (state / 12).toFixed(2);
        securityInput.value = (social / 12).toFixed(2);
        medicareInput.value = (medicare / 12).toFixed(2);
    }

}