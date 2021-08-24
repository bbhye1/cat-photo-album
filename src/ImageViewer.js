export default class ImageViewer extends HTMLElement {
    constructor({ filePath, onclickOutside }) {
        super();
        this.filePath = filePath;
        this.onclick = (e) => {
            const { nodeName } = e.target;

            if(nodeName === 'IMG') {
                return;
            }

            onclickOutside();
        };
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML=`
            <div class="ImageViewer Modal">
                <div class="content">
                    <img class="cat-img" src="${
                    'https://fe-dev-matching-2021-03-'
                    + 'serverlessdeploymentbuck-t3kpj3way537'
                    + '.s3.ap-northeast-2.amazonaws.com/public' 
                    + this.filePath
                }">
                </div>
            </div>
        `;
    }
}

customElements.define('cat-imageviewer', ImageViewer);
