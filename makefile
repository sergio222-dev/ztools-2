.PHONY: all

update:
	@rush update

deploy-budget:
	make -C ./apps/budget-servers deploy

docker-budget: deploy-budget
	make -C ./apps/budget-servers docker

docker-zdm-server:
	make -C ./apps/zdm-servers docker
