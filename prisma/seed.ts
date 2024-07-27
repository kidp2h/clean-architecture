import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const createUser = () => {
  return {
    id: faker.string.uuid(),
    username: faker.internet.userName(),
    password: bcrypt.hashSync(faker.internet.password(), 10),
  };
};
const createUsers = (length) => {
  return Array.from({ length }, createUser);
};
(async () => {
  const prisma = new PrismaClient();
  await prisma.user.createMany({
    data: createUsers(10),
  });
})();
