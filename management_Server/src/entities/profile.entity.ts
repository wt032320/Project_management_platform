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

  @Column()
  @ApiProperty({
    description: '用户id',
    example: '15'
  })
  id: string;

  @Column()
  @ApiProperty({
    description: '个性签名',
    example: '等风也等你'
  })
  sign?: string; // 个性签名

  @Column()
  @ApiProperty({
    description: '地区',
    example: '陕西,西安'
  })
  area?: string; // 地区
}
