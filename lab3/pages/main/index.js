import { SemesterCardComponent } from "../../components/semester-card/index.js";
import { SemesterPage } from "../semester-page/index.js";
import { FilterButtonsComponent } from "../../components/filter-buttons/index.js";
import { AddButtonComponent} from "../../components/add-button/index.js";
import { DeleteButtonComponent} from "../../components/delete-button/index.js";


export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.data = [
            {
                id: 1,
                src: "https://cache3.youla.io/files/images/720_720_out/5a/8a/5a8a9ad665bcf13b5c762e94.jpg",
                title: "2 семестр",
                text: "Механика и термодинамика",
                course: "1"
            },
            {
                id: 2,
                src: "https://staticgeopop.akamaized.net/wp-content/uploads/sites/32/2021/09/iStock-157642745.jpg",
                title: "3 семестр",
                text: "Электромагнетизм",
                course: "2"
            },
            {
                id: 3,
                src: "https://i.pinimg.com/736x/14/ae/66/14ae66e8d1ad5b8f342404c2cb175e62.jpg",
                title: "4 семестр",
                text: "Квантовая физика",
                course: "2"
            }
        ];
    }

    getData() {
        return this.data
    }

    setData(data) {
        this.data = data
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
        
        const data = this.getData();

        const filters = ["Все", "1 курс", "2 курс"];
        const filterButtons = new FilterButtonsComponent(this.pageRoot.querySelector('.filter-buttons'));
        filterButtons.render(filters, this.onFilterChange.bind(this));

        this.showFilteredSemesters(data, "all");

        const addButton = new AddButtonComponent(this.pageRoot.querySelector('.add-delete-buttons'));
        const deleteButton = new DeleteButtonComponent(this.pageRoot.querySelector('.add-delete-buttons'));
        addButton.render(this.onClickAdd.bind(this));
        deleteButton.render(this.onClickDelete.bind(this));
    }

    onClickAdd() {
        const semesters = this.getData();
        semesters.push({
            id: 1,
            src: "https://cache3.youla.io/files/images/720_720_out/5a/8a/5a8a9ad665bcf13b5c762e94.jpg",
            title: "2 семестр",
            text: "Механика и термодинамика",
            course: "1"
        });
        this.setData(semesters);
        this.render();
    }

    onClickDelete() {
        const semesters = this.getData();
        semesters.pop();
        this.setData(semesters);
        this.render();
    }

    onClickCard(e) {
        const id = e.target.dataset.id
        const semesterPage = new SemesterPage(this.parent, id);
        semesterPage.render();
    }

    onFilterChange(filter) {
        const data = this.getData();
        this.showFilteredSemesters(data, filter);
    }

    showFilteredSemesters(semesters, filter) {
        const gallery = this.pageRoot.querySelector('.gallery');
        gallery.innerHTML = ''; // Очистка галереи
        
        semesters.forEach(sem => {
            if (sem.course === filter || filter === "all") {
                const card = new SemesterCardComponent(gallery);
                card.render(sem, this.onClickCard.bind(this));
            }
        });
    }
}