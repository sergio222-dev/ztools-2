.PHONY: build update deploy docker cleanup setup

# PROJECTS DATA
BASE_DEPLOY_CONTAINER = .\common\deploy\containers

## BUDGET
BUDGET_PROJECT_NAME = budget-servers
DOCKER_PROFILE_BUDGET = budget-server
ENV_CONFIG_PATH = .\configs\budget\.env
BUDGET_SERVER_CONTAINER = budget-servers

#RM = pwsh -command Get-ChildItem $(BUDGET_SERVER_CONTAINER) | pwsh -command Remove-Item .\common\deploy\containers\budget-servers -D -Force -Confirm:$false -Recurse
update:
	rush update

build-budget: update
	rush build --to $(BUDGET_PROJECT_NAME)

deploy-budget:
	rush deploy --project $(BUDGET_PROJECT_NAME) --target-folder $(BASE_DEPLOY_CONTAINER)/$(BUDGET_PROJECT_NAME) --overwrite

docker-budget: deploy-budget
	docker-compose --profile $(DOCKER_PROFILE_BUDGET) --env-file $(ENV_CONFIG_PATH) up -d --build
