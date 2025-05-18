export class SemesterFormComponent {
    constructor(parent) {
        this.parent = parent;
    }

    render(submitCallback, semester = null) {
        // Заполняем форму данными продукта, если они есть
        const titleValue = semester ? semester.title : '';
        const srcValue = semester ? semester.src : '';
        const textValue = semester ?  semester.text : '';
        const courseValue = semester ? semester.course : '';
        const lecturesValue = semester ? semester.lectures : '';
        const seminarsValue = semester ? semester.seminars : '';
        const labWorksValue = semester ? semester.labWorks : '';

        const html = `
            <form id="SemesterForm" class="container mt-5 form">
                <input type="text" id="title" placeholder="Title" value="${titleValue}" required>
                <input type="text" id="src" placeholder="Image URL" value="${srcValue}" required>
                <textarea id="text" placeholder="Text" required>${textValue}</textarea>
                <input type="number" id="course" placeholder="Course" value="${courseValue}" required>
                <textarea id="lectures" placeholder="Lectures" required>${semester ? lecturesValue.join("; ") : ''}</textarea>
                <textarea id="seminars" placeholder="Seminars" required>${semester ? seminarsValue.join("; ") : ''}</textarea>
                <textarea id="labWorks" placeholder="LabWorks" required>${semester ? labWorksValue.join("; ") : ''}</textarea>
                <button class="btn btn-primary details" type="submit">${semester ? 'Обновить' : 'Добавить'} семестр</button>
            </form>
        `;
        this.parent.insertAdjacentHTML('beforeend', html);

        const form = this.parent.querySelector('#SemesterForm');
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const title = form.querySelector('#title').value;
            const src = form.querySelector('#src').value;
            const text = form.querySelector('#text').value;
            const course = parseInt(form.querySelector('#course').value);
            const lectures = form.querySelector('#lectures').value
            .split(';').join('; ').split('; ');
            const seminars = form.querySelector('#seminars').value
            .split(';').join('; ').split('; ');
            const labWorks = form.querySelector('#labWorks').value
            .split(';').join('; ').split('; ');

            const semesterData = { title, src, text, course, lectures, seminars, labWorks };
            submitCallback(semesterData);
        });
    }
}