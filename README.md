## Database

```
yarn prisma migrate dev --name init
yarn prisma db seed

```

## Run

```
yarn run dev
```

### TODO

##### DESIGN

- [x] explore page
- [ ] single repo page

##### API INTEGRATION

- [ ] everything

#### API needed

- [ ] list of teams of an user

```
[
    {
        id: "1",
        name: "team 1",
    },
]
```

- [ ] list of repos of an user

```
[
    {
        id: "1",
        name: "repo 1",
        type: "coding",
        isPrivate: true,
        lastUpdated: "2-1-24",
        isStared: true,
        teamName: "team 1",
        owner:
        {
            id: "1",
            name: "owner name"
        }
    }
]
```

- [ ] create team

```
{
    name: "team name",
    userId: "1",
}
```

- create repo

```
{
    name: "repo name",
    type: "coding",
    isPrivate: true,
    userId: "1"
}
```

- [ ] get a team by teamId

```
{
    id: "1",
    name: "team name",
    members: [
        {
            id: "1",
            name: "user name"
        }
    ],
    ownerId: "1",
    repos: [
        {
            id: "1",
            name: "repo 1",
            type: "coding",
            isPrivate: true,
            lastUpdated: "2-1-24",
            isStared: true,
            teamName: "team 1",
            owner:
            {
                id: "1",
                name: "owner name"
            }
        }
    ]
}
```

- [ ] recommended teams and repos by userId (response same as repo list and team list)
- [ ] get repos by type, get teams that contain a repo with type (response same as repo list and team list)
- [ ] star a repo

```
{
    userId: "1",
    teamId: "1"
}
```

- [ ] add member to a team

```
{
    userId: "1",
    teamId: "1"
}
```

- team, repo -> create, put/patch, delete, get
- auth, user

#### Not sure

- [ ] how to handle each repo?
