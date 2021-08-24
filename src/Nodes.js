import Node from './Node.js';

export default class Nodes extends HTMLElement {
    constructor({ 
        nodes, history,
        onclickDirectory, onclickFile, onHistoryBack,
     }) {
        super();
        this.nodes = nodes;
        this.history = history;
        this.onclickDirectory = onclickDirectory;
        this.onclickFile = onclickFile;
        this.onHistoryBack = onHistoryBack;
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = `
            <div class="Nodes"></div>
        `;

        if(this.history.length > 1) {
            const prevButton = new Node({
                id: 'prev-button', 
                type: 'prev', 
                onclick: () => this.onHistoryBack(), 
            });

            this.querySelector('.Nodes').appendChild(prevButton);
        }

        this.nodes.forEach(({id, type, name, filePath}) => {
            const node = new Node({
                id,
                type: type.toLowerCase(), 
                name,
                onclick: type === 'DIRECTORY' 
                    ? () => this.onclickDirectory(id, name)
                    : () => this.onclickFile(filePath),
             });

            this.querySelector('.Nodes').appendChild(node);
        });
    }
} 

customElements.define('cat-nodes', Nodes);
