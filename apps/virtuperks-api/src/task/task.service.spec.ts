import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from '@rumsan/virtuperks';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TaskService', () => {
  let service: TaskService;
  const result = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a newly created task when a task is created', () => {
    const createTaskDto: CreateTaskDto = {};
    expect(result as Task).toEqual(createTaskDto);
  });

  it('should return all the tasks', () => {
    expect(result as Task[]).toBeDefined();
  });

  it('should return a task by id', () => {
    expect(result as Task).toBeDefined();
  });

  it('should update a task by id', () => {
    const updateTaskDto: UpdateTaskDto = {};
    expect(result as Task).toEqual(updateTaskDto);
  });

  it('should delete a task by id', () => {
    expect(result as Task).toEqual('Deleted successfully');
  });
});
