export class SemesterCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="card my_card" style="width: 300px;">
                <img src="${data.src}" class="card-img-top my_img" alt="${data.title}">
                <div class="card-body">
                    <h5 class="card-title">${data.title}</h5>
                    <p class="card-text">${data.text}</p>
                    <button class="btn btn-primary details" id="click-card-${data.id}" data-id="${data.id}">Подробнее</button>
                    <button class="btn btn-primary details" id="edit-card-${data.id}" data-id="${data.id}">Редактировать</button>
                </div>
            </div>
        `;
    }

    addListeners(data, detailsListener, editListener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", detailsListener);
        document
            .getElementById(`edit-card-${data.id}`)
            .addEventListener("click", editListener);
    }

    render(data, detailsListener, editListener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, detailsListener, editListener);
    }
}