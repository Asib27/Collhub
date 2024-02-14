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
        "team_id": 1,
        "name": "qwerty"
    },
    {
        "team_id": 2,
        "name": "my group"
    },
    {
        "team_id": 7,
        "name": "test team"
    }
]
```

- [x] list of repos of an user

route: http://localhost:3000/api/user/:user_id/repos
```
[
    {
        "id": 1,
        "name": "myrepo",
        "type": "code",
        "lastUpdated": "2024-02-14T20:04:19.430Z",
        "owner": {
            "id": 1,
            "name": "john_dow"
        }
    },
    {
        "id": 2,
        "name": "myproject",
        "type": "design",
        "lastUpdated": "2024-02-14T20:04:20.001Z",
        "owner": {
            "id": 2,
            "name": "avi_dewan"
        }
    }
]
```

- [x] create team

```
{
    name: "team name",
    user_id: "1",
}
```

- [x] create repo

```
{
    name: "repo name",
    type: "coding",
    isPrivate: true,
    user_id: "1"
}
```

- [x] get a team by teamId

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

- [x] add member to a team

```
{
    userId: "1",
    teamId: "1"
}
```

- team, repo -> create, put/patch, delete, get
- auth, user
- messages

#### Not sure

- [ ] how to handle each repo?
