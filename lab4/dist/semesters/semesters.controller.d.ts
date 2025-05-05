import { SemestersService } from './semesters.service';
import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';
import { Semester } from './entities/semester.entity';
export declare class SemestersController {
    private readonly semestersService;
    constructor(semestersService: SemestersService);
    create(createSemesterDto: CreateSemesterDto): void;
    findAll(title?: string): Semester[];
    findOne(id: string): Semester | null;
    update(id: string, updateSemesterDto: UpdateSemesterDto): void;
    remove(id: string): void;
}
