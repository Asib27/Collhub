const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

async function addUser() {
  await prisma.user.upsert({
    where: { user_id: 1},
    create: {
      name: 'john_dow',
      password: '123',
      email: 'johndoe@example.com',
    },
    update: {}
  })

  await prisma.user.upsert({
    where: { user_id: 2},
    create: {
      name: 'avi_dewan',
      password: '123',
      email: 'avidewan@gmail.com',
    },
    update: {}
  })
}

async function addRepo() {
  await prisma.repo.upsert({
    where: { repo_id: 1},
    create: {
      name: 'myrepo'
    },
    update: {}
  })

  await prisma.repo.upsert({
    where: { repo_id: 2},
    create: {
      name: 'myproject',
      type: "design"
    },
    update: {}
  })

  await prisma.repo.upsert({
    where: { repo_id: 3},
    create: {
      name: 'collhub'
    },
    update: {}
  })
}

async function addRepoUser() {
  try{
    await prisma.repo_user.createMany({
      data: [
        {
          user_id: 1,
          repo_id: 1,
          role: 'author'
        },
        {
          user_id: 1,
          repo_id: 2,
          role: 'contributor'
        },
        {
          user_id: 2,
          repo_id: 2,
          role: 'author'
        }
      ]
    })
  }catch(err){
    console.log(err)
  }
}


async function addTeam() {
  await prisma.team.upsert({
    where: { team_id: 1},
    create: {
      name: 'qwerty'
    },
    update: {}
  })

  await prisma.team.upsert({
    where: { team_id: 2},
    create: {
      name: 'my group'
    },
    update: {}
  })

  await prisma.team.upsert({
    where: { team_id: 3},
    create: {
      name: 'asdfg'
    },
    update: {}
  })
}

async function addData() {
  await addUser()
  await addRepo()
  await addRepoUser()
  await addTeam()
}

addData()