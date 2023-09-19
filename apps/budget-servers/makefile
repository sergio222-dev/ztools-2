.PHONY: build deploy docker cleanup setup

# Project Data
BASE_PROJECT_CONTAINER = ..\..\common\deploy\containers
PROJECT_NAME = @ztools/budget-servers
PROJECT_NAME_PATH = budget-servers
DEPLOY_CONTAINER = '$(BASE_PROJECT_CONTAINER)\$(PROJECT_NAME_PATH)'

# Docker
DOCKER_PROFILE = budget-server

# Configs
ENV_CONFIG_FILE = .env.docker

update:
	@rush update

build: update
	@rush build --to $(PROJECT_NAME)

deploy: build
	@if [ -d $(DEPLOY_CONTAINER) ]; then \
		rush deploy --project $(PROJECT_NAME) --target-folder $(DEPLOY_CONTAINER) --overwrite; \
	else \
		mkdir -p $(DEPLOY_CONTAINER); \
		rush deploy --project $(PROJECT_NAME) --target-folder $(DEPLOY_CONTAINER) --overwrite; \
	fi

docker:
	docker compose --profile $(DOCKER_PROFILE) --env-file $(ENV_CONFIG_FILE) up -d --build
