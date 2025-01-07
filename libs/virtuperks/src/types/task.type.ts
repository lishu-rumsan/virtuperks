import { CommonFields } from './common.type';
import { TaskStatus } from './enums';
import { TaskAssigment } from './taskAssignment.type';

export type TaskBase = {
  managerCuid: string;

  title: string;
  description: string;
  status: TaskStatus;
  assignments: TaskAssigment[];
};

export type Task = TaskBase & CommonFields & { cuid?: string };
