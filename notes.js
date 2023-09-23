/*

    The "frontend" part of web development We have learned so far is made up of
      ->  HTML for markup, CSS for presentation, and JavaScript for scripting. Since we added react and can use other frameworks it seems complicated
        ,but they always spit out and compile into those 3 files, even if we're writing in JSX.
      -> user-facing aspect of web dev

    The backend part is more complicated since it can be completely different languages such as, PHP, C#, Ruby, Python and Java.
      ->  the browser does not care as long as we give it html, css and javascript for the page.
        Now we are learning nodejs because it is simply javascript outside of the browser, then nodejs will interact with an sql like database
        when we learn that in the future.
      -> handles logic and data. what the users do NOT see
      -> dynamic, webpage is generated on the fly


    Frameworks - to save us from re-writing the same code over and over, preventing repetition
        -> They provide great organization, force you to organize files and code to keep it highly modular and clean
        -> when starting a new app, you're given dozens of files already organized in a hierarchy

    Node - javascript was first designed to run in the browser only, node brought that to servers
        -> developers no longer had to use php, python, ruby, c#..
        -> node has the ability javascript does not, it can read/write local files, create http connections, and listen to network request.
        -> asynchronous, event driven runtime. Means we do NOT try to predict when things will get done, we start multiple processes/functions
            ->when those are done, it goes on to the next step, nothing ever blocks the "stack" that would only let us do one thing at a time vs starting many

    Non blocking I/O - nodejs can run task in parallel, which eliminates the need for multi threaded.


    Event loops - js in browser is the same as nodejs https://www.youtube.com/watch?v=8aGhZQkoFbQ
        ->  first is the "call stack" when running any code it starts off here, stackoverflow is when too many things have run and are added to the stack
            -> such as a scroll or move event listener, this runs the callback many times!
        -> code will go on the "call stack" then pop off as it is run like console.log("hi"), synchronous code will block the "call stack" as it prevents
            -> new code from running, if it synchronously takes a long time..
        ->so we make things asynchronous like setTimeout(run, 5000) -> this then gets removed from the "call stack" , then the timer
            -> goes in the "webapis", so we run the 5 sec timer above, after 5 secs it moves to the task queue
            -> the event loop checks the "call stack" to make sure it's empty, if it is, it moves items from the task queue onto the "call stack"
                -> * the great part about this, is while our async request like setTimeout is waiting on the webapis list, the callstack is now empty for other code to run

        -> * using synchronous code is called blocking because it runs on the call stack and nothing else can go until it is done, which means
            -> no buttons or interface on the web page works, the "render queue" renders the page every 16ms which would be blocked by this.
            -> by using asynchronous code, we give the render queue time to re-render between the event loop checking the task queue and running.
            ->the "render queue" can not re-render while code is running, so long synchronous code that effectively pauses our website, makes it look frozen as well.

     NPM - to download, update all and specific package read this link https://nodejs.dev/en/learn/an-introduction-to-the-npm-package-manager/
            -> this is why we include package.json in github, the user can simple, NPM install, to download all required packages easily

        when using our app in production vs development, we must remember to use an environment variable on start or edit bash files
            -> frameworks do this for us.


        Running nodejs scripts from command
            -> node (app name here) --watch(to watch it)
            -> the node --watch itself might not be as good as other modules, so we can try nodemon, to prevent re-running the app on each change
            npm i -g nodemon
            -> nodemon app.js

     Environment variables - uses the process core module, provides the env property, process does NOT need a "require"
        **-> these will be VERY important in the future when we need databases and sensitive credentials
        -> instead of creating env variables in tht terminal on run USER_ID=239482 USER_KEY=foobar node app.js
                process.env.USER_ID; // "239482"
                process.env.USER_KEY; // "foobar"
        -> we can create a .env file in the root directory of project, then use dotenv package to load them during runtime
                    # .env file
                    USER_ID="239482"
                    USER_KEY="foobar"
                    NODE_ENV="development"

        -> in the js file -> npm i dotenv
                require('dotenv').config();
                process.env.USER_ID; // "239482"

      HTTP request - The simplest way is with axios library -  https://github.com/nodejs/nodejs.dev/blob/aa4239e87a5adc992fdb709c20aebb5f6da77f86/content/learn/node-js-web-server/node-make-http-requests.en.md
        ->  npm install axios
            const axios = require('axios');
        GET Request ->

            axios.get('https://jsonplaceholder.typicode.com/posts/2')
              .then(res => {
                console.log(`statusCode: ${res.status}`);
                console.log(res);
                console.log(res.data);
              })
              .catch(error => {
                console.error(error);
              });
        POST request ->

            axios.post('https://whatever.com/todos', {
                todo: 'Buy the milk',
              })
              .then(res => {
                console.log(`statusCode: ${res.status}`);
                console.log(res);
              })
              .catch(error => {
                console.error(error);
              });

        PUT and DELETE request use the same POST request format, we only need to change the method value

      Path - we must be careful to have the right path to files, path overall is not too useful, it will simply put data we give
        it, into file path formats https://nodejs.dev/en/learn/nodejs-file-paths/
            const path = require('path');

      fs module - interacts with nodejs file system, no need to install, it's part of node.js core
            -> we can also run fs functions in a synchronous way to stop the thread from running, (we will probably never use)
            -> https://github.com/nodejs/nodejs.dev/blob/aa4239e87a5adc992fdb709c20aebb5f6da77f86/content/learn/node-js-modules/node-module-fs.en.md
            -> const fs = require('fs/promises'); -> only use fs/promises if using async and NOT callbacks
            -> to prevent callback hell ( many nested callbacks) we use async for promise based over callback based
                    async function example() {
                      const fileName = '/Users/joe/test.txt';
                      try {
                        const data = await fs.readFile(fileName, { encoding: 'utf8' });
                        console.log(data);
                        const content = 'Some content!';
                        await fs.writeFile(fileName, content);
                        console.log('Wrote some content!');
                        const newData = await fs.readFile(fileName, 'utf8');
                        console.log(newData);
                      } catch (err) {
                        console.log(err);
                      }
                    }
                    example();

            popular fs functions we will likely use
                -> fs.stat() - gives data on the file such as creation time, byte size(kb), isfile() t/f, isDirectory()
                ->

            fs open() - we have fs.readFile() and fs.writeFile() that automatically opens the file for us, BUT if we want to keep using a file
                -> we want to open the file ourselves to keep it open for performance and we can do more complicated editing to it.
                -> fs.readFile also closes it for us, so in case we forget to, most important, it reads the WHOLE file
                -> createReadStream is for processing the file in parts

            fs.readFile() - we can read file, but if we are reading big files this will impact memory and speed
                -> it is best to use read with streams for this.

            fs.writeFile() - we write a new file, or edit existing files, make sure to use the right flag to not overwrite file
                if that is what we want https://nodejs.dev/en/learn/writing-files-with-nodejs/

*  */

























