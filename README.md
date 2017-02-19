# DROPSTACK-CLI

> A CLI to simplify continuous deployments via Web-Service API and Docker Swarm with integrated SSL, DNS-Server and JWT authentification.

## Usage

__Install__ the package globally:

```bash
$ npm install -g dropstack-cli
```
__Help__
```bash
$ dropstack --help
```

Just enter `dropstack deploy` in the folder you want to deploy.

__Docker__
```bash
$ my-go-app/ ls
Dockerfile  server.go
$ my-go-app/ dropstack deploy
```

__Node.JS__
```bash
$ my-nodejs-api/ ls
package.json  index.js
$ my-nodejs-api/ dropstack deploy
```

__Static Websites__
```bash
$ my-web-site/ ls
index.html  logo.png
$ my-web-site/ dropstack deploy
```

__Single Page Applications__
```bash
$ my-spa-app/ ls
index.html  bundle.js
$ my-spa-app/ dropstack deploy
```

## What DROPSTACK is?

DROPSTACK CLI takes any of your Docker-, NodeJS- or static Web-Sites/Services to the DROPSTACK-Server with ease, speed and reliability. In practical terms, any directory that contains a package.json or Dockerfile can be transported to the DROPSTACK-Server with the single CLI command: `dropstack`.

First time you __deploy your project__, dropstack will provide you with a unique __project specific URL__ (e.g. `erkgfjtrna.domain.local`). When it's time to take your deployment to production, you simply pick an appropriate alias (a __custom domain__).

## Get Started

Let's demonstrate how easy deploying a project with dropstack actually is:

__Step 1__ Install dropstack globally with `npm install -g dropstack-cli`<br/>

__Step 2__ Create a new directory and switch to it:
```bash
$ mkdir my-webapp
$ cd my-webapp
```

__Step 3__ Write the app configuration into a __package.json__ file...
```bash
$ npm init
```

__Step 4__ Run `dropstack` to deploy. Every time you run `dropstack` in the same folder, you make an updated redeploy. You might see files uploading, and then we show you the progress of the commands executed for deploying your application.

```bash
$ dropstack deploy
```

The first time you run `dropstack`, it'll ask for your email address in order to identify you. Simply click on the email you've received, and you'll be logged in automatically.


## Features

* doesn't require you to install certain applications in order to get started
* No need to install git or source control
* No need to setup keys/tokens
* No complicated cloud provider setup or registration
* No setup of applications or projects
* Unlimited

## ASAP

* Display metrics as stream

## Contributors
Check them out [here](https://github.com/MikeBild/dropstack-cli/graphs/contributors)

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public [GitHub issue tracker](https://github.com/MikeBild/dropstack-cli/issues).

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE.md) file for more info.

## Thanks

You like DROPSTACK and you want to see what coming next? Follow me on Twitter [`@mikebild`](https://twitter.com/mikebild).

Enjoy!
