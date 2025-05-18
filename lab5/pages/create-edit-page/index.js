// pages/CreateEditProductPage.js
import { SemesterFormComponent } from '../../components/form/index.js';
import { BackButtonComponent } from '../../components/back-button/index.js';
import { DeleteButtonComponent } from '../../components/delete-button/index.js';
import { ajax } from '../../modules/ajax.js';
import { semestersUrls } from '../../modules/semesterUrls.js';
import { MainPage } from '../main/index.js';


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

    addSemester(semester) {
        ajax.post(semestersUrls.createSemester(), semester, (data, status) => {
            if (status === 201) {
                this.goBack()
            }
        });
    }

    updateSemester(updatedSemester) {
        ajax.patch(semestersUrls.updateSemesterById(this.semId), updatedSemester, (data, status) => {
            if (status === 200) {
                this.goBack()
            }
        });
    }

    render() {
        this.parent.innerHTML = '';
        this.parent.insertAdjacentHTML('beforeend', this.getHTML());
        const formContainer = this.pageRoot.querySelector('.form-container');
        const form = new SemesterFormComponent(formContainer);
        
        if (this.semId) {
            ajax.get(semestersUrls.getSemesterById(this.semId), (data) => {
                form.render(this.updateSemester.bind(this), data);
            });
            const deleteButton = new DeleteButtonComponent(this.pageRoot.querySelector('.buttons-container'));
            deleteButton.render(this.onClickDelete.bind(this));
        } 
        else {
            form.render(this.addSemester.bind(this));
        }

        const backButtonContainer = this.pageRoot.querySelector('.buttons-container');
        const backButton = new BackButtonComponent(backButtonContainer);
        backButton.render(this.goBack.bind(this));
    }

    goBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
    }

    onClickDelete() {
        ajax.delete(semestersUrls.removeSemesterById(this.semId), (data, status) => {
            if (status === 200) {
                this.goBack();
            }
        });
    }
}