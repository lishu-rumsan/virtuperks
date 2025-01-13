import { faker } from '@faker-js/faker';
import { TaskStatus } from '@rumsan/virtuperks';

export const expectedTaskData = [
  {
    cuid: 'cgfw28ejd93nd',
    managerCuid: 'cgs9303hd02mdd',
    title: faker.word.words(2),
    description: faker.lorem.lines(),
    status: faker.helpers.enumValue(TaskStatus),
    assignments: [],
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  },
  {
    cuid: 'chd83dc9jndjnc',
    managerCuid: 'cbshd983bdjd2nc',
    title: faker.word.words(2),
    description: faker.lorem.lines(),
    status: faker.helpers.enumValue(TaskStatus),
    assignments: [],
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
  },
];
