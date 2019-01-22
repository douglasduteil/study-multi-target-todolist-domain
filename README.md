# study-multi-target-todolist-domain

> :microscope: Studying the reuse of core todolist domain functions in multiple "end" targets

<br>
<br>
<br>
<br>

## Architecture

```
├── packages
│   │ The main packages of the monorepo
│   │ Might be reusable outside of it, as they are used inside.
│   │
│   ├── core
│   │     The core todolist system
│   │     Host the common logic between all the targets
│   │     Should be "why" we are doing all this in the first place
│   │
│   ├── database
│   │   │ Databases layer for `@todolist/core`
│   │   │ <data> <=> `Todo`
│   │   │
│   │   ├── level
│   │   │     The Level todolist database
│   │   │
│   │   └── lowdb
│   │         The Lowdb todolist database
│   │
│   └── ui
│       │ UI layer for `@todolist/core`
│       │ <user> <=> `Todo`
│       │
│       └── yargs
│             The Yargs todolist ui
│
└── targets
    │ The launchers of the monorepo
    │ Host the end targets of the monorepo, merging all the layers
    │
    ├── api
    │   └── nestjs-rest
    │         A Rest todolist API made with Nest
    └── web
        ├── nextjs
        │     Todolist made with Next.js
        │
        └── vanilla
              Todolist made with just some javascript
```

<br>
<br>
<br>
<br>

Ports and adapters / hexagonal

## Install

`yarn`

<br>
<br>
<br>
<br>

## Usage

Run one of the targets.

<br>
<br>
<br>
<br>

## E2E

No installed by default !

```sh
$ cd targets/web/__e2e__
$ yarn
$ BASE_URL=http://localhost:XXXX yarn test
```

<br>
<br>
<br>
<br>

## Note :

- **Why fixing versions to `webpack@4.20.2` and `@babel/core@7.0.0`**

As this repo has already a lot of noe_modules, I try to limit duplication by unifying dependencies versions when possible.  
By manually running

```sh
$ yarn lerna exec --stream --parallel "ls -a node_modules | grep -v '^\.\.\?$'"
# [...]
lerna info Executing command in 7 packages: "ls -a node_modules | grep -v '^\\.\\.\\?$'"
@todolist/core: .bin
@todolist/databases.level: .bin
@todolist/databases.lowdb: .bin
@todolist/ui.yargs: .bin
@todolist/target.nestjs-rest: .bin
@todolist/target.nextjs: .bin
@todolist/target.vanilla: .bin
lerna success exec Executed command in 7 packages: "ls -a node_modules | grep -v '^\\.\\.\\?$'"
Done in 0.61s.

```

I can confirm that all the monorepo packages **only have a `.bin` folder in them node_modules**.  
If not, I run `yarn why <package_name>` to investigate and manually resolve conflict.  
It was the case for `webpack` and `@babel/core`.

As of today (2019-01-07) the latest `webpack` version is `webpack@4.28.3`. Yet `next@7.0.2` (latest) is using a `webpack@4.20.2` range. So I force downgrade `webpack` in the `vanilla` target.

Same for `@babel/core@7.2.2` (latest), while `next@7.0.2` is using a `@babel/core@7.0.0` range.
