export default class Breadcrumb extends HTMLElement {
    constructor({ history, onclickPath }) {
        super();
        this.history = history;
        this.onclick = (e) => onclickPath(e.target.id);
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <nav class="Breadcrumb">
                ${this.history
                    .map(({ id, name }) => `
                        <div id="${id}">${name}</div>
                    `).join('')}
            </nav>
        `;
    }
}

customElements.define('cat-breadcrumb', Breadcrumb);
