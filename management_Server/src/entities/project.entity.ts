import { ApiProperty } from "@nestjs/swagger";
import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Project {
  @PrimaryColumn()
  @ApiProperty({
    description: '项目编号',
    example: '01',
  })
  id: string;

  @Column()
  @ApiProperty({
    description: '项目名称',
    example: '项目简介',
  })
  name: string;

  @Column("text")
  @ApiProperty({
    description: '项目简介',
    example: '实验小学简介',
  })
  description: string;

  @Column()
  @ApiProperty({
    description: '项目创建者',
    example: '王老五',
  })
  creator: string;

}
