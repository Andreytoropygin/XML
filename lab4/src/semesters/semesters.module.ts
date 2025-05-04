import { Module } from '@nestjs/common';
import { SemestersService } from './semesters.service';
import { SemestersController } from './semesters.controller';
import { FileService } from 'src/file.service';
import { Semester } from './entities/semester.entity';

@Module({
  controllers: [SemestersController],
  providers: [SemestersService,
    {
      provide: FileService,
      useFactory: () => new FileService<Semester[]>('assets/semesters.json')
    },
  ],
})
export class SemestersModule {}
