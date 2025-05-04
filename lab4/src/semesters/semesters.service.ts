import { Injectable } from '@nestjs/common';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';
import { Semester } from './entities/semester.entity';
import { FileService } from 'src/file.service';

@Injectable()
export class SemestersService {
  constructor(private fileService: FileService<Semester[]>) {}

  create(createSemesterDto: CreateSemesterDto) {
    const semesters = this.fileService.read();

    const semester = { ...createSemesterDto, id: semesters.length + 1};
    this.fileService.add(semester)
  }

  findAll(title?: string): Semester[] {
    const semesters = this.fileService.read();

    return title ?
      semesters.filter(sem =>
        sem.title.toLowerCase().includes(title.toLowerCase())
      ) : 
      semesters;
  }

  findOne(id: number): Semester | null {
    const semesters = this.fileService.read();

    return semesters.find(sem => sem.id == id) ?? null;
  }

  update(id: number, updateSemesterDto: UpdateSemesterDto) {
    const semesters = this.fileService.read();

    const updatedSemesters = semesters.map(sem =>
      sem.id == id ? { ...sem, ...updateSemesterDto} : sem
    );
    this.fileService.write(updatedSemesters);
  }

  remove(id: number) {
    const semesters = this.fileService.read();

    const updatedSemesters = semesters.filter(sem =>
      sem.id != id
    );
    this.fileService.write(updatedSemesters);
  }
}
