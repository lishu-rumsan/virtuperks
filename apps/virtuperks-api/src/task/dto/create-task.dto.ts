import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '@rumsan/virtuperks';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @ApiProperty({
    description: 'managerCuid',
    example: 'cm5ccg23alep05y8yw8fyu9nn',
  })
  managerCuid: string;

  @IsString()
  @ApiProperty({
    description: 'Title of the task',
    example: 'abc',
  })
  title: string;

  @IsString()
  @ApiProperty({
    description: 'Description of the task',
    example: 'abc',
  })
  description;

  @IsString()
  @ApiProperty({
    description: 'Status of the task',
    example: 'open/closed',
  })
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiProperty({
    example: '2025-01-08T09:50:59.336Z',
  })
  @IsOptional()
  deletedAt: Date;

  @IsString()
  @IsOptional()
  createdBy: string;

  @IsString()
  @IsOptional()
  updatedBy: string;
}
