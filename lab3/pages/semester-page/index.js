import { BackButtonComponent } from "../../components/back-button/index.js";
import { AccordionComponent } from "../../components/accordion/index.js";
import { MainPage } from "../main/index.js";

export class SemesterPage {
    constructor(parent, semId) {
        this.parent = parent;
        this.semId = semId;
    }

    getData() {
        return [
            {
                id: 1,
                title: "2 семестр",
                lectures: [
                    "Законы Ньютона",
                    "Колебания",
                    "Специальная теория относительности"
                ],
                seminars: [
                    "Задачи на законы соохранения энергии и импульса ",
                    "Задачи на расчет момента инерции"
                ],
                labWorks: [
                    "Погрешности изммерений",
                    "Определение периода колебаний маятника",
                    "Наблюдение стоячей волны"
                ]
            },
            {
                id: 2,
                title: "3 семестр",
                lectures: [
                    "Электростатика",
                    "Магнетизм",
                    "Электромагнетизм",
                    "Интерференция и дифракция"
                ],
                seminars: [
                    "Закон Кулона",
                    "Закон Ома",
                    "Поляразация электромагнитной волны"
                ],
                labWorks: [
                    "Изучение процесса зарядки и разрядки конденсатора",
                    "Изучение законов постоянного тока",
                    "Изучение затухающих колебаний в колебательном контуре"
                ]
            },
            {
                id: 3,
                title: "4 семестр",
                lectures: [
                    "Квантовые свойства излучения",
                    "Волновые свойства микрочастиц",
                    "Стационарные задачи квантовой механики"
                ],
                seminars: [
                    "Квантовые свойства света",
                    "Волновые свойства микрочастиц",
                    "Движение микрочастиц в стационарных полях"
                ],
                labWorks: [
                    "Изучение эффекта Холла",
                    "Изучение электронно-дырочного перехода",
                    "Изучение поглощения гамма-излучения в веществе"
                ]
            }
        ];
    }

    get pageRoot() {
        return document.getElementById('sem-page');
    }

    getHTML() {
        let titles = {};
        this.getData().forEach(sem => { titles[sem.id] = sem.title});
        return `
            <div id="sem-page" class="container mt-5">
                <h2 class="text-center mb-4">${titles[this.semId]}</h2>
                <div class="accordion-container"></div>
                <div class="back-button-container"></div>
            </div>
        `;
    }

    render() {
        this.parent.innerHTML = ''; // Очистка текущего содержимого
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());

        const data = this.getData();
        const accordionContainer = this.pageRoot.querySelector('.accordion-container');
        const accordion = new AccordionComponent(accordionContainer);
        accordion.render(data, this.semId);
        
        // Добавляем кнопку "Назад"
        const backButtonContainer = this.pageRoot.querySelector('.back-button-container');
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(this.goBack.bind(this));
    }

    goBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }  
}