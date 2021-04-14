import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotoService } from './photo.service';
import { Photo } from '../../entities/photo.entity';
import { PhotoController } from '../photo/photo.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Photo])
  ],
  controllers: [PhotoController],
  providers: [PhotoService]
})
export class PhotoModule {}
