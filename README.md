# Lab using node, typescript to create REST API

Making this project I discovered VScode [**tasks**](https://code.visualstudio.com/docs/editor/tasks) and [**REST Client**](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) module, awesome tools :heartpulse:

To run this crazy code you will mandatory need [node.js](https://nodejs.org/en/). I wrote some tasks for [VScode IDE](https://code.visualstudio.com/), then I advise you try use it, this is very good and light IDE, but you can use another IDE if you want.

1. Install all modules needed running command above

```shell
  npm install
```

2. To run app just run command above, the **npm start** script will check if database (sqlite local file) exists, if there is no will create it.

```shell
  npm start
```

3. Optional you can run npm **knex:seed** to fill database with sample data, by default the data base is empty. *It's necessary run **npm start** before for create tables*.

## VSCode IDE

If you are using VScode IDE, you can use F5 to up application in debug mode, you can see scripts tasks in .vscode folder.

## REST Client VSCode module

There is a file called testing-request.http with examples of requests for the endpoints. Use te module REST Client for VSCode for optimize use to this file. :D
