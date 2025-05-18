import { SemesterCardComponent } from "../../components/semester-card/index.js";
import { SemesterPage } from "../semester-page/index.js";
import { FilterButtonsComponent } from "../../components/filter-buttons/index.js";
import { AddButtonComponent} from "../../components/add-button/index.js";
import { ajax } from "../../modules/ajax.js";
import { semestersUrls } from "../../modules/semesterUrls.js";
import { CreateEditSemesterPage } from "../create-edit-page/index.js";


export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = [];
    }

    getData() {
        ajax.get(semestersUrls.getSemesters(), (data) => {
            this.data = data;
            this.showFilteredSemesters(data, "all");
        })
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    getHTML() {
        return `
            <div id="main-page" class="container mt-5">
                <div class="filter-buttons"></div>
                <div class="gallery-container">
                    <div class="gallery"></div>
                </div>
                <div class="add-delete-btns-container">
                    <div class="add-delete-buttons"></div>
                </div>
            </div>
        `
    }

    render() {
        this.parent.innerHTML = ''; // Очистка текущего содержимого
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        this.getData();

        const filters = ["Все", "1 курс", "2 курс"];
        const filterButtons = new FilterButtonsComponent(this.pageRoot.querySelector('.filter-buttons'));
        filterButtons.render(filters, this.onFilterChange.bind(this));

        const addButton = new AddButtonComponent(this.pageRoot.querySelector('.add-delete-buttons'));
        addButton.render(this.onClickAdd.bind(this));
    }

    onClickAdd() {
        const createPage = new CreateEditSemesterPage(this.parent);
        createPage.render();
    }

    onClickUpdate(e) {
        const id = e.target.dataset.id
        const editPage = new CreateEditSemesterPage(this.parent, id);
        editPage.render();
    }

    onClickCard(e) {
        const id = e.target.dataset.id
        const semesterPage = new SemesterPage(this.parent, id);
        semesterPage.render();
    }

    onFilterChange(filter) {
        this.showFilteredSemesters(this.data, filter);
    }

    showFilteredSemesters(semesters, filter) {
        const gallery = this.pageRoot.querySelector('.gallery');
        gallery.innerHTML = ''; // Очистка галереи
        
        semesters.forEach(sem => {
            if (sem.course == filter || filter === "all") {
                const card = new SemesterCardComponent(gallery);
                card.render(sem, this.onClickCard.bind(this), this.onClickUpdate.bind(this));
            }
        });
    }
}