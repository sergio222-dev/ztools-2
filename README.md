# ztools-2 monorepo
this monorepo contains general purpose projects

## Folder structure
- 📁 apps/
    - 📁 [budget-servers/](#budget-servers)
    - 📁 zdm/
- 📁 tools/
  - 📁 [ztemplates/](#z-templates)
- 📁 configs/
  - 📁 budget/
- 📁 z-economy/

### Requirements
- Node 19.5.0
- [Rush.js](https://rushjs.io)
- Docker

## Installation
To install all dependencies you can use the update target
```shell
make update
```
---
## Budget Servers
Project for tracking personal finances, made with Vite(react) in frontend and Nestjs in backend

### Build
To build budget server project you should run this command
```shell
make build-budget
```

### Docker
To install docker you can use the docker target (only windows)
```shell
make docker-budget
```
these are the current available docker profiles

- budget-server
  : set up the server and all the databases:

- budget-server-mongo
  : only set up the mongo database

### TODOS
- [ ] Refactor the all account page table
- [ ] Migrate to tailwind with modules
- [x] Add coding guidelines
- [ ] Add styles guidelines
- [ ] Add test
- [x] Add makefile

---
## Z-Templates
Tools to bootstrap ztools projects

### Usage
Initialize a new project in the current directory
```shell
init <template> <name>
```
these are the current available templates

- nest_ddd
: A simple nestjs DDD structure

