# dropstack CLI

> Continuous Deployment fast and easy!

## Usage

__Install__ the package globally:

```bash
$ npm install -g dropstack-cli
```
__Help__
```bash
$ dropstack --help
```

Just enter `dropstack` in the folder you want to deploy.

__Docker__
```bash
$ my-app/ ls
Dockerfile  server.go
$ my-app/ dropstack
```

__Node.JS__
```bash
$ my-api/ ls
package.json  index.js
$ my-api/ dropstack
```

__Static Websites__
```bash
$ my-site/ ls
index.html  logo.png
$ my-site/ dropstack
```

## What dropstack is?

DropStack takes your Docker-, NodeJS- or static Website-Applications and Services to the cloud with ease, speed and reliability. In practical terms, any directory that contains a package.json or Dockerfile can be transported to the cloud with the single CLI command: `dropstack`.

First time you __deploy your project__, dropstack will provide you with a unique __project specific URL__ (e.g. `erkgfjtrna.dropstack.run`). When it's time to take your deployment to production, you simply pick an appropriate alias (a __custom domain__).

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
$ dropstack
```

The first time you run `dropstack`, it'll ask for your email address in order to identify you. Simply click on the email you've received, and you'll be logged in automatically.


## Features

* doesn't require you to install certain applications in order to get started
* Traffic is only served over secure connections
* Custom domains and own SSL Certificate support
* No need to install git or source control
* No need to setup keys/tokens
* No complicated cloud provider setup or registration
* No setup of applications or projects
* Unlimited
