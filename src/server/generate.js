const faker = require('faker');

const database = {
  users: []
};

for (let i = 1; i <= 10; i++) {
  database.users.push({
    id: i,
    username: faker.internet.userName(),
    name: faker.name.firstName(),
    surname: faker.name.lastName(),
    email: faker.internet.email(),
    role: faker.random.arrayElement(['admin', 'moderator', 'user']),
    registrationDate: faker.date.past(),
    enabled: faker.random.boolean()
  });
}

console.log(JSON.stringify(database));
