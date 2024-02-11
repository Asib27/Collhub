const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function addUser() {
  await prisma.user.createMany({
    data: [
      {
        name: 'john_dow',
        password: '123',
        email: 'johndoe@example.com',
      },
      {
        name: 'avi_dewan',
        password: '123',
        email: 'avidewan@gmail.com',
      }
    ]
  })
}

async function addData() {
  await addUser()
}

addData()