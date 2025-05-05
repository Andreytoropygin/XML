import { CreateSemesterDto } from './dto/create-semester.dto';
import { UpdateSemesterDto } from './dto/update-semester.dto';
import { Semester } from './entities/semester.entity';
import { FileService } from 'src/file.service';
export declare class SemestersService {
    private fileService;
    constructor(fileService: FileService<Semester[]>);
    create(createSemesterDto: CreateSemesterDto): void;
    findAll(title?: string): Semester[];
    findOne(id: number): Semester | null;
    update(id: number, updateSemesterDto: UpdateSemesterDto): void;
    remove(id: number): void;
}
