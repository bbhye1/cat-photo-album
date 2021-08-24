export default class Node extends HTMLElement {
    constructor({ id, type, name = '', onclick }) {
        super();
        this.id = id;
        this.type = type;
        this.name = name;
        this.onclick = onclick;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="Node">
                <img src="./assets/${this.type}.png">
                ${this.name}
            </div>
        `;
    }
}

customElements.define('cat-node', Node);
