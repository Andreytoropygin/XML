import { BackButtonComponent } from "../../components/back-button/index.js";
import { AccordionComponent } from "../../components/accordion/index.js";
import { MainPage } from "../main/index.js";
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

    async render() {
        try {
            const response = await fetch(semestersUrls.getSemesterById(this.semId));
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            
            // Очистка и рендеринг
            this.parent.innerHTML = '';
            this.parent.insertAdjacentHTML('beforeend', this.getHTML(data.title));
    
            // Поиск элементов после добавления в DOM
            const accordionContainer = this.pageRoot.querySelector('.accordion-container');
            const accordion = new AccordionComponent(accordionContainer);
            accordion.render(data);
            
            // Добавление кнопки "Назад"
            const backButtonContainer = this.pageRoot.querySelector('.buttons-container');
            const backButton = new BackButtonComponent(backButtonContainer);
            backButton.render(this.goBack.bind(this));
            
        } catch (error) {
            console.error('Ошибка при загрузке данных семестра:', error);
            // Можно добавить обработку ошибки (например, показать сообщение пользователю)
            this.parent.innerHTML = '<p class="error">Не удалось загрузить данные семестра</p>';
            
            // Добавляем кнопку "Назад" даже при ошибке
            const backButtonContainer = document.createElement('div');
            this.parent.appendChild(backButtonContainer);
            const backButton = new BackButtonComponent(backButtonContainer);
            backButton.render(this.goBack.bind(this));
        }
    }

    goBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }  
}