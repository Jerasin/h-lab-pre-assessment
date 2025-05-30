dev: destroy build up logs

format:
	 npx eslint . --fix

build:
	@COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build $(c)
destroy:
	@docker-compose down -v $(c)
up:
	@docker-compose up -d $(c)

logs:
	@docker-compose logs --tail=100 -f $(c)
down:
	@docker-compose down $(c)

