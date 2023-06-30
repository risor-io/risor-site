
.PHONY: deps
deps:
	npm install -g wrangler
	wrangler --version

.PHONY: login
login:
	wrangler login
	wrangler whoami
