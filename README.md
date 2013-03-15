This illustrates how to hit the Rackspace cloud monitoring API to load real metric data and graph it using [glimpse.js](https://github.com/racker/glimpse.js).


## Setup
- clone this repo
- run `scripts/web-server.js`
- `git clone git://github.com/sym3tri/monprox.git` (a simple pass-thru proxy that does auth for you)
- from `monprox/` run `npm install`
- put your creds into `monprox/config.json`
- run `node monprox.js`
- point your browser to `http://localhost:8000`
