// pages/CreateEditProductPage.js
import { SemesterFormComponent } from '../../components/form/index.js';
import { BackButtonComponent } from '../../components/back-button/index.js';
import { DeleteButtonComponent } from '../../components/delete-button/index.js';
import { MainPage } from '../main/index.js';
import { semestersUrls } from "../../modules/semesterUrls.js";


export class CreateEditSemesterPage {
    constructor(parent, semId = null) {
        this.parent = parent;
        this.semId = semId;
    }

    get pageRoot() {
        return document.getElementById('edit-page');
    }

    getHTML() {
        return `
            <div id="edit-page" class="container mt-5">
                <h2 class="text-center mb-4">${this.semId ? 'Редактировать семестр' : 'Создать семестр'}</h1>
                <div class="form-container"></div>
                <div class="buttons-container"></div>
            </div>
        `;
    }

    async addSemester(semester) {
        try {
            const response = await fetch(semestersUrls.createSemester(), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(semester)
            });
    
            if (response.status === 201) {
                this.goBack();
            } else {
                console.error('Ошибка при создании семестра:', response.status);
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
        }
    }
    
    async updateSemester(updatedSemester) {
        try {
            const response = await fetch(semestersUrls.updateSemesterById(this.semId), {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedSemester)
            });
    
            if (response.status === 200) {
                this.goBack();
            } else {
                console.error('Ошибка при обновлении семестра:', response.status);
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
        }
    }
    
    async render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        
        await new Promise(resolve => setTimeout(resolve, 0));
        
        const formContainer = this.pageRoot.querySelector('.form-container');
        const form = new SemesterFormComponent(formContainer);
        
        if (this.semId) {
            try {
                const response = await fetch(semestersUrls.getSemesterById(this.semId));
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                
                const data = await response.json();
                form.render(this.updateSemester.bind(this), data);
                
                const deleteButton = new DeleteButtonComponent(
                    this.pageRoot.querySelector('.buttons-container')
                );
                deleteButton.render(this.onClickDelete.bind(this));
            } catch (error) {
                console.error('Ошибка при загрузке семестра:', error);
            }
        } else {
            form.render(this.addSemester.bind(this));
        }
    
        const backButtonContainer = this.pageRoot.querySelector('.buttons-container');
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(this.goBack.bind(this));
    }
    
    async onClickDelete() {
        try {
            const response = await fetch(semestersUrls.removeSemesterById(this.semId), {
                method: 'DELETE'
            });
    
            if (response.status === 200) {
                this.goBack();
            } else {
                console.error('Ошибка при удалении семестра:', response.status);
            }
        } catch (error) {
            console.error('Ошибка сети:', error);
        }
    }

    goBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }  
}