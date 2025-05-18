import { BackButtonComponent } from "../../components/back-button/index.js";
import { AccordionComponent } from "../../components/accordion/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { semestersUrls } from "../../modules/semesterUrls.js";

export class SemesterPage {
    constructor(parent, semId) {
        this.parent = parent;
        this.semId = semId;
    }

    get pageRoot() {
        return document.getElementById('sem-page');
    }

    getHTML(title) {
        return `
            <div id="sem-page" class="container mt-5 form-container">
                <h2 class="text-center mb-4">${title}</h2>
                <div class="accordion-container"></div>
                <div class="buttons-container"></div>
            </div>
        `;
    }

    render() {
        ajax.get(semestersUrls.getSemesterById(this.semId), (data) => {
            this.parent.innerHTML = ''; // Очистка текущего содержимого
            this.parent.insertAdjacentHTML('beforeend', this.getHTML(data.title));

            const accordionContainer = this.pageRoot.querySelector('.accordion-container');
            const accordion = new AccordionComponent(accordionContainer);
            accordion.render(data);
            
            // Добавляем кнопку "Назад"
            const backButtonContainer = this.pageRoot.querySelector('.buttons-container');
            const backButton = new BackButtonComponent(backButtonContainer);
            backButton.render(this.goBack.bind(this));
        });
    }

    goBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }  
}