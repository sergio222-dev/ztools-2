.PHONY: build update deploy docker cleanup setup

# PROJECTS DATA
BASE_DEPLOY_CONTAINER = .\common\deploy\containers

## BUDGET
BUDGET_PROJECT_NAME = @ztools/budget-servers
BUDGET_PROJECT_NAME_PATH = budget-servers
BUDGET_DEPLOY_CONTAINER = '$(BASE_DEPLOY_CONTAINER)\$(BUDGET_PROJECT_NAME_PATH)'
DOCKER_PROFILE_BUDGET = budget-server
ENV_CONFIG_PATH = .\configs\budget\.env

## ZDM
ZDM_DOCKER_PROFILE = zdm

update:
	@rush update

build-budget: update
	@rush build --to $(BUDGET_PROJECT_NAME)

deploy-budget: build-budget
	@if [ -d $(BUDGET_DEPLOY_CONTAINER) ]; then \
		rush deploy --project $(BUDGET_PROJECT_NAME) --target-folder $(BUDGET_DEPLOY_CONTAINER) --overwrite; \
	else \
		mkdir -p $(BUDGET_DEPLOY_CONTAINER); \
		rush deploy --project $(BUDGET_PROJECT_NAME) --target-folder $(BUDGET_DEPLOY_CONTAINER) --overwrite; \
	fi

docker-budget:
	@if [ -d $(BUDGET_DEPLOY_CONTAINER) ]; then \
		docker-compose --profile $(DOCKER_PROFILE_BUDGET) --env-file $(ENV_CONFIG_PATH) up -d --build; \
	else \
	  echo 'You should run make deploy-budget before make docker-budget'; \
	fi

docker-zdm-server:
	make -C ./apps/zdm-servers docker
