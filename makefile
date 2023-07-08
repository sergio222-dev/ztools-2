.PHONY: build update deploy docker cleanup setup

# PROJECTS DATA
## BUDGET
BUDGET_PROJECT_NAME = budget-servers
DOCKER_PROFILE_BUDGET = budget-server

BASE_DEPLOY_CONTAINER = .\common\deploy\containers
BUDGET_SERVER_CONTAINER = budget-servers

RM = pwsh -command Get-ChildItem $(BUDGET_SERVER_CONTAINER) | pwsh -command Remove-Item .\common\deploy\containers\budget-servers -D -Force -Confirm:$false -Recurse

#check if the directory $(BASE_DEPLOY_CONTAINER)\$(BUDGET_SERVER_CONTAINER) exists
setup-budget:
	if not exist $(BASE_DEPLOY_CONTAINER)\$(BUDGET_SERVER_CONTAINER) mkdir $(BASE_DEPLOY_CONTAINER)\$(BUDGET_SERVER_CONTAINER)

update:
	rush update

build-budget: update
	rush build --to $(BUDGET_PROJECT_NAME)

deploy-budget:
	rush deploy --project $(BUDGET_PROJECT_NAME) --target-folder ./common/deploy/containers/$(BUDGET_PROJECT_NAME) --overwrite

docker-budget:
	docker-compose --profile $(DOCKER_PROFILE_BUDGET) up -d --build
