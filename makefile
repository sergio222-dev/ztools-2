.PHONY: build update deploy docker cleanup setup
PROFILE = server

BASE_DEPLOY_CONTAINER = .\common\deploy\containers
BUDGET_SERVER_CONTAINER = budget-servers

RM = pwsh -command Get-ChildItem $(BUDGET_SERVER_CONTAINER) | pwsh -command Remove-Item .\common\deploy\containers\budget-servers -D -Force -Confirm:$false -Recurse

#check if the directory $(BASE_DEPLOY_CONTAINER)\$(BUDGET_SERVER_CONTAINER) exists
setup:
	if not exist $(BASE_DEPLOY_CONTAINER)\$(BUDGET_SERVER_CONTAINER) mkdir $(BASE_DEPLOY_CONTAINER)\$(BUDGET_SERVER_CONTAINER)

update:
	rush update

build: update
	rush build

deploy: build setup
	rush deploy --project budget-servers --target-folder ./common/deploy/containers/budget-servers --overwrite

docker: deploy
	docker-compose --profile $(PROFILE) up -d --build
