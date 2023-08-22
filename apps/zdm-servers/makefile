.PHONY: build deploy docker cleanup setup

# Project Data
BASE_PROJECT_CONTAINER = ..\..\common\deploy\containers
PROJECT_NAME = @ztools/zdm-servers
PROJECT_NAME_PATH = zdm-servers
DEPLOY_CONTAINER = '$(BASE_PROJECT_CONTAINER)\$(PROJECT_NAME_PATH)'

# Docker
DOCKER_PROFILE = zdm

# Configs
ENV_CONFIG_FILE = .env.development

update:
	@rush update

build: update
	@rush build --to $(PROJECT_NAME)

deploy:
	@if [ -d $(DEPLOY_CONTAINER) ]; then \
		rush deploy --project $(PROJECT_NAME) --target-folder $(DEPLOY_CONTAINER) --overwrite; \
	else \
		mkdir -p $(DEPLOY_CONTAINER); \
		rush deploy --project $(PROJECT_NAME) --target-folder $(DEPLOY_CONTAINER) --overwrite; \
	fi

docker:
	docker compose --profile $(DOCKER_PROFILE) --env-file $(ENV_CONFIG_FILE) up -d --build
