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

