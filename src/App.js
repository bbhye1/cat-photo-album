import roots from '../assets/api/root.js';
import cats from '../assets/api/Cats.js';

import Breadcrumb from "./Breadcrumb.js";
import Nodes from "./Nodes.js";
import ImageViewer from "./ImageViewer.js";

export default class App extends HTMLElement {
    constructor() {
        super();
        this.state = {
            nodes: roots,
            history: [{
                id: null,
                name: 'root',
            }],
            modal: null,
        };
    }

    connectedCallback() {
        this.render();
    }

    setState(key, value) {
        this.state = {
            ...this.state,
            [key]: value,
        };

        this.render();
    }

    onclickDirectory(id, name) {
        const { history } = this.state;

        this.setState('nodes', cats[id] || []);
        this.setState('history', [...history, { id, name }]);
    }

    onclickFile(filePath) {
        this.setState('modal', { filePath });
    }

    onHistoryBack() {
        const { history } = this.state;

        this.setState('history', history.slice(0, history.length - 1));

        if(history.length === 1) {
            this.setState('nodes', roots);
            return;
        }

        const lastHistoryId = history[history.length - 1].id;

        this.setState('nodes', cats[lastHistoryId]);
    }

    onclickPath(pathId) {
        const { history } = this.state;

        const currentPathIndex = pathId !== 'null' 
            ? history.findIndex(({id}) => id === pathId) 
            : 0;
        
        this.setState('history', history.slice(0, currentPathIndex + 1));

        if(history.length === 1) {
            this.setState('nodes', roots);
            return;
        }

        const lastHistoryId = history[history.length-1].id;

        this.setState('nodes', cats[lastHistoryId]);
    }

    onclickOutside() {
        this.setState('modal', null);
    }

    onkeydownEscape(e) {
        if(e.key === 'Escape') {
            this.setState('modal', null);
        }
    }

    appendChild(...elements) {
        [...elements].forEach((element) => {
            this.querySelector('.App').appendChild(element);
        });
    }

    render() {
        this.innerHTML = `
            <main class="App">
            </main>
        `;

        const { nodes, history, modal } = this.state;
        
        const $breadcrumb = new Breadcrumb({
            history,
            onclickPath: this.onclickPath.bind(this),
        });
        
        const $nodes = new Nodes({
            nodes,
            history,
            onclickDirectory: this.onclickDirectory.bind(this),
            onclickFile: this.onclickFile.bind(this),
            onHistoryBack: this.onHistoryBack.bind(this),
        });
        
        this.appendChild( $breadcrumb, $nodes );
        
        
        if(modal) {
            const $modal = new ImageViewer({ 
                filePath: modal.filePath,
                onclickOutside: this.onclickOutside.bind(this),
             });

            this.appendChild( $modal );

            document.addEventListener('keydown', (e) => this.onkeydownEscape(e));
        }
    }
} 

customElements.define('cat-app', App);
