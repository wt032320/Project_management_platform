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

  @Column({nullable: true})
  date?: string;

  @Column()
  @ApiProperty({
    description: '项目名称',
    example: '实验小学改造',
  })
  name: string;

  @Column()
  @ApiProperty({
    description: '项目地址',
    example: 'xx路1号',
  })
  address: string;

  @Column()
  @ApiProperty({
    description: '项目阶段',
    example: '正在施工中',
  })
  stage: string;

  @Column("text")
  @ApiProperty({
    description: '项目简介',
    example: '实验小学简介',
  })
  description: string;

  @Column()
  @ApiProperty({
    description: '项目创建者Id',
    example: 'aa',
  })
  creatorId: string;
}
