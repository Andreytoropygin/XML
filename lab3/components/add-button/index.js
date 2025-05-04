export class AddButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML() {
        return `
            <button id="add-button" class="btn btn-primary mt-3 my_btn" type="button">
                Добавить
            </button>
        `;
    }

    addListeners(listener) {
        document.getElementById("add-button").addEventListener("click", listener);
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener);
    }
}