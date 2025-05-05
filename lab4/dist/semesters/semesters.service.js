"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SemestersService = void 0;
const common_1 = require("@nestjs/common");
const file_service_1 = require("../file.service");
let SemestersService = class SemestersService {
    fileService;
    constructor(fileService) {
        this.fileService = fileService;
    }
    create(createSemesterDto) {
        const semesters = this.fileService.read();
        const semester = { ...createSemesterDto, id: semesters.length + 1 };
        this.fileService.add(semester);
    }
    findAll(title) {
        const semesters = this.fileService.read();
        return title ?
            semesters.filter(sem => sem.title.toLowerCase().includes(title.toLowerCase())) :
            semesters;
    }
    findOne(id) {
        const semesters = this.fileService.read();
        return semesters.find(sem => sem.id == id) ?? null;
    }
    update(id, updateSemesterDto) {
        const semesters = this.fileService.read();
        const updatedSemesters = semesters.map(sem => sem.id == id ? { ...sem, ...updateSemesterDto } : sem);
        this.fileService.write(updatedSemesters);
    }
    remove(id) {
        const semesters = this.fileService.read();
        const updatedSemesters = semesters.filter(sem => sem.id != id);
        this.fileService.write(updatedSemesters);
    }
};
exports.SemestersService = SemestersService;
exports.SemestersService = SemestersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [file_service_1.FileService])
], SemestersService);
//# sourceMappingURL=semesters.service.js.map