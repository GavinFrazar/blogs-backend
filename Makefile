rebuild-ui: clean build-ui
	cp -r ../blogs/build .

clean:
	rm -rf build

build-ui:
	cd ../blogs && npm run build --prod

test:
	npm run test

deploy: rebuild-ui test
	git add . && git commit -m "Deploy build" --allow-empty && git push heroku HEAD:master --force && git reset HEAD~1 --soft && git restore --staged .

.PHONY: rebuild-ui clean build-ui deploy
