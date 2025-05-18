export class DeleteButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <button id="delete-button" class="btn btn-primary mt-3 my_btn" type="button">
                Удалить
            </button>
        `;
    }

    addListeners(listener) {
        document.getElementById("delete-button").addEventListener("click", listener);
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}