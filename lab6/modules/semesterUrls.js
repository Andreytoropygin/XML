class SemestersUrls {
    constructor() {
        this.baseUrl = 'http://localhost:3000';
    }

    getSemesters() {
        return `${this.baseUrl}/semesters`;
    }

    getSemesterById(id) {
        return `${this.baseUrl}/semesters/${id}`;
    }

    createSemester() {
        return `${this.baseUrl}/semesters`;
    }

    removeSemesterById(id) {
        return `${this.baseUrl}/semesters/${id}`;
    }

    updateSemesterById(id) {
        return `${this.baseUrl}/semesters/${id}`;
    }
}

export const semestersUrls = new SemestersUrls();