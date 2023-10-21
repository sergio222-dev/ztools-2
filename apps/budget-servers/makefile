.PHONY: build deploy docker cleanup setup

# Project Data
BASE_PROJECT_CONTAINER = ..\..\common\deploy\containers
PROJECT_NAME = @ztools/budget-servers
PROJECT_NAME_PATH = budget-servers
DEPLOY_CONTAINER = '$(BASE_PROJECT_CONTAINER)\$(PROJECT_NAME_PATH)'

# CI
RUSH_INSTALL_SCRIPT = ../../common/scripts/install-run-rush.js

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

ci-install:
	@node $(RUSH_INSTALL_SCRIPT) install --to $(PROJECT_NAME)

ci-build:
	@node $(RUSH_INSTALL_SCRIPT) rebuild --verbose --to $(PROJECT_NAME)

docker:
	docker compose --profile $(DOCKER_PROFILE) --env-file $(ENV_CONFIG_FILE) up -d --build
