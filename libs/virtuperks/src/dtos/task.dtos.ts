import { TaskBase } from "../types";


export type CreateTaskDto = TaskBase
export type EditTaskDto = Partial<CreateTaskDto>