import { Test, TestingModule } from '@nestjs/testing';
import { TaskService } from './task.service';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from '@rumsan/virtuperks';
import { expectedTaskData } from './testFixtureData';

describe('TaskService', () => {
  let service: TaskService;
  const result = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  const taskId = expectedTaskData[0].cuid;

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a newly created task when a task is created', () => {
    expect(result as Task).toEqual(expectedTaskData[0]);
  });

  it('should return all the tasks', () => {
    expect(result as Task[]).toEqual(expectedTaskData);
  });

  it('should return a task by id', () => {
    expect(result as Task).toEqual(taskId);
  });

  it('should update a task by id', () => {
    const updateTaskDto: UpdateTaskDto = {
      title: 'Updated',
    };
    expect(result as Task).toEqual(updateTaskDto);
  });

  it('should delete a task by id', () => {
    expect(result as Task).toEqual('Deleted successfully');
  });
});
