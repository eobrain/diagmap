.SUFFIXES: .js .ok

.js.ok:
	standard $<
	touch $@

public/main.js: src/index.ok src/data.ok webpack.config.ok
	node_modules/webpack/bin/webpack.js

src/data.js: data.csv csv2js.ok
	node csv2js.js > $@
	standard --fix $@

serve: public/main.js
	cd public && python -m SimpleHTTPServer

deploy: public/main.js
	firebase deploy
