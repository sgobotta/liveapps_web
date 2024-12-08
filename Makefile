.PHONY: build setup test

ENV_FILE ?= .env

# add env variables if needed
ifneq (,$(wildcard ${ENV_FILE}))
	include ${ENV_FILE}
    export
endif

export GREEN=\033[0;32m
export NOFORMAT=\033[0m

# ------------------------------------------------------------------------------
# Commands
#

default: help

#💻 build: @ Build the nodejs application
build: SHELL:=/bin/bash
build:
	@yarn build

#❓ help: @ Displays this message
help: SHELL:=/bin/bash
help:
	@grep -E '[a-zA-Z\.\-]+:.*?@ .*$$' $(firstword $(MAKEFILE_LIST))| tr -d '#'  | awk 'BEGIN {FS = ":.*?@ "}; {printf "${GREEN}%-30s${NOFORMAT} %s\n", $$1, $$2}'

#💻 lint: @ Runs lint fixes and formatter
.PHONY: lint
lint:
	@npm run lint

#💻 check: @ Runs all linting checks
check:
	@npm run lint:check

#💻 server: @ Starts the nodejs development server
server: SHELL:=/bin/bash
server:
	@yarn start

#📦 setup: @ Installs node dependencies
setup: SHELL:=/bin/bash
setup:
	@yarn install

#🧪 test: @ Runs all test suites
test: SHELL:=/bin/bash
test:
	@yarn test -- --watchAll=false --passWithNoTests
