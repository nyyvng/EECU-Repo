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