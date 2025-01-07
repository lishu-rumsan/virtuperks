import { TaskAssigmentBase } from '../types';

export type CreateTaskAssigmentDto = TaskAssigmentBase;
export type EditTaskAssimentDto = Partial<CreateTaskAssigmentDto>;
