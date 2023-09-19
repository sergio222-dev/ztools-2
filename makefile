.PHONY: all

update:
	@rush update

deploy-budget:
	make -C ./apps/budget-servers deploy

docker-budget:
	make -C ./apps/budget-servers docker

deploy-zdm-server:
	make -C ./apps/zdm-servers deploy

docker-zdm-server:
	make -C ./apps/zdm-servers docker
