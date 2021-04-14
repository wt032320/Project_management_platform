import { Column, Entity, PrimaryColumn } from "typeorm";
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Photo {
  @PrimaryColumn()
  @ApiProperty({
    description: 'id',
    example: '15'
  })
  id: string;

  @Column()
  @ApiProperty({
    description: '用户头像'
  })
  photo: string;
}