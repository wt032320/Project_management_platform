import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Profile {
  @PrimaryColumn()
  @ApiProperty({
    description: '用户昵称',
    example: '_小右'
  })
  nickname: string;

  @Column()
  @ApiProperty({
    description: '所属公司',
    example: 'A公司'
  })
  company: string;

  
}
