/*
    Project ideas: scrape the state lottery website and make a chart of how much it goes up,
        vs how many people are playing, and when do more people join in!


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

    dotenv - we put sensitive information like api keys, databse logins in the .env file where noone will see it and
        it is ignored, no github upload. we need a package

        npm i dotenv
        -> in the nodejs file write :  require('dotenv').config();
        -> access variables with process.env  process.env.DATABASE_URL
        -> if we see any .env.example files in github, it is a format to help us, we copy it and put our own info



    Package.json - we have experience with this, as each project needed to, npm i -y to download all packages
        these pages show much information about each dependency, the module creators, and versions.. etc
        https://github.com/nodejs/nodejs.dev/blob/aa4239e87a5adc992fdb709c20aebb5f6da77f86/content/learn/node-js-package-manager/package-json.en.md
            npm init -y -> to create package.json
        -> local packages are in our individual project node_modules folder where as -g global installs are in our
            -> entire computer folder
        -> in general we should use local packages because using global and updating could break other projects not ready for new version.



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
        -> in ever nodejs file we have access to __filename and __dirname
            -> __file gives the entire directory and current file, while __dirname just gives the directory
            -> the path module can take this and get certain parts out, such as
            __filename -> /home/moose/Desktop/WebstormProjects/nodejs-beginner-notes/app.js
            path.basename(__filename) -> app.js -> file name only
            path.extname(__filename) -> .js -> file extension name

            add paths together: path.join(__dirname, 'test')
            ** -> path will NOT create files, this simply adds the path format together to input in fs modules
                -> that will actually create the files, ALSO windows vs linux will use different slash \//\
                -> by using path.join, it automates picking the slashes for us, so no issues!


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
                -> fs.rename() - rename files

            fs open() - we have fs.readFile() and fs.writeFile() that automatically opens the file for us, BUT if we want to keep using a file
                -> we want to open the file ourselves to keep it open for performance and we can do more complicated editing to it.
                -> fs.readFile also closes it for us, so in case we forget to, most important, it reads the WHOLE file
                -> createReadStream is for processing the file in parts

            fs.readFile() - we can read file, but if we are reading big files this will impact memory and speed
                -> it is best to use read with streams for this.

            fs.writeFile() - we write a new file, or edit existing files, make sure to use the right flag to not overwrite file
                if that is what we want https://nodejs.dev/en/learn/writing-files-with-nodejs/
                we can either, overwite the entire file, append to the beginning or end. and open the file or reading/writing
               * -> we can also use .appendFile() to simply add text to the end same as writeFile, but no flags required

                    async function teststat() {
                      const fileName = './files/test.txt';
                      try {
                        const data = await fs.writeFile(fileName, "hello world", {flag: "a"})
                        console.log(data)
                      } catch (err) {
                        console.log(err);
                      }
                    }
                    teststat();

            fs.mkdir - create a folder, now add paths together easily with path.join
                    fs.mkdir(path.join(__dirname,'test1'), {}, (err) => {
                      if (err) {
                          throw err
                        console.log('folder created')
                      }
                    })

            URL class - when we want to use a url link and edit it by inputting different parts of the path, search terms hashes.
                or many other things.   https://nodejs.org/api/url.html#url_the_whatwg_url_api
                -> URL is global, we don't need to require it
                -> once the object has been created we can edit the properties on it directly or use template strings
                    const myURL = new URL('https://example.org');
                        myURL.pathname = '/a/b/c';
                        myURL.search = '?d=e';
                        myURL.hash = '#fgh';

                        const pathname = '/a/b/c';
                        const search = '?d=e';
                        const hash = '#fgh';
                    const myURL = new URL(`https://example.org${pathname}${search}${hash}`);
                -> all we need to remember is, once created a url or getting user input search terms, we can extract any parts of
                    -> that url from the object
                -> instead of putting together a url with search params and paths, we could enter one, then break it apart,
                        const myURL = new URL(`https://example.org?user=bob&age=30`);
                            myURL.host -> example.org -> simply log myURL to get all parts of the link
                -> add new search parameters to link
                    myURL.searchParams.append('name', 'gary');

        Event emitter - in javascript in the browser, we have event like onclick, but in node, it's a server with no interface. So we
            create an event, then make that happen when we decide. https://github.com/nodejs/nodejs.dev/blob/aa4239e87a5adc992fdb709c20aebb5f6da77f86/content/learn/node-js-modules/node-module-events.en.md
            const EventEmitter = require('events');
            const customEmitterName = new EventEmitter();
                -> we need to put our callback into a variable to make it be removed!!

            const logFunctionForEvent = () => {
                console.log("hello world" + param)
            }
            customEmitterName.on('customEventName', logFunctionForEvent)
                -> emit fires the event, we can pass in arguments through this for the 2nd arg.
            customEmitterName.emit("customEventName", "my name is bob") ->
                -> we see "hello world my name is bob" in the console now

            customEmitterName.eventNames() -> list all events on that emitter, current we have "customerEventName"
            customEmitterName.getMaxListeners() -> default to 10, we set higher with customEmitterName.setMaxListeners(99);

            -> to remove the event, its the opposite of how we created it with on.. off
                customEmitterName.off('customEventName', logFunctionForEvent)

            -> make event that is only ever called one time
                customEmitterName.once('newEventName', () => {
                    console.log('the pain of only getting to run once.. is so sad')
                })

            -> instead of .on() to add event, we can use prependListener() to make an event first in line,
                -> new events get added to the end of the line

            we saw how to remove a single listener above with .off(), now to remove every event of the same name..
                -> customEmitterName.removeAllListeners('customEvent') -> we can still emit customEmitterName.emit('cat')
                -> because this emitter is still active, and we can have multiple of the same event name. so cat event is still there
                -> again .off() is simply alias for .removeListener() since we can have much different code for the same event name many times..
                    -> this is why the cb must be in a variable to remove a specific event, shown above

        os - get all information about computer system and software
            os.cpus() - get array of all cpu cores and cpu model name
            os.platform() - windows, linux..
            os.freemem() - free memory/ram
            os.totalmem() - total ram - free ram = used ram
            os.uptime() - seconds system has been on

        debugging - we can simply watch our file with nodemon and use console.log() for everything.. but eventually we get hundreds of logs
            -> AND the most important part, the data can change after we have logged it, so we miss that error! this is where breakpoints come in
            go to about:inspect  in chrome
            All we have to do to set it up is a few commands
            1) node --inspect --watch filename.js -> we combined --watch and --inspect, it seems to be working
            2) in our console, we get a link like 127.0.0.1:9229 -> put that into chrome search
            3) go to chrome browser and inspect -> click the node green logo by the arrow near top bar.
                -> this opens dedicated dev tools for node
            4) we may not get normal console logs in chrome tool, so we may want to pop out our terminal that is watching logs as well, under
                -> the nodejs inspector, while the inspector is for our breakpoints in webstorm

            so tldr: run debug script, open chrome, we need to pop out debug tab because the chrome node debugger is slow to log our stuff
            so we have the chrome window on the left side, and nodejs devtools on top right, and jetbrains debug logger on bottom right.


    http -


        SQL testing in node -
            we used peoplehalf1 sql file with 200 rows. to select an id in node goes from 33.08 thousand request units to 33.16 out of 50 million
                -> we go through the setup guide and initially can run our sql file to make the table and stuff
                        (async () => {
                          await client.connect();
                          try {
                            const peoplehalf1 = FS.readFileSync(path.join(__dirname, './peoplehalf1.sql')).toString();
                            const results = await client.query(peoplehalf1);
                            console.log(results);
                          } catch (err) {
                            console.error("error executing query:", err);
                          } finally {
                            client.end();
                          }
                        })();
                -> after the table is created, re running that code gives error, so not again. now we can run querys like this
                        async function testDB() {
                          try {
                            await client.connect()
                            const results = await client.query('SELECT * FROM peoplehalf1 WHERE id = 7');
                            console.log(results.rows)
                          } catch (err) {
                            console.error("error executing query:", err);
                          }
                        }
                        testDB();




        Passwords - we can NOT store plaintext passwords in our database, we should offer 2fa for customers but
            -> also have good cryptography, this is made easy with hashing packages https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html



        NOSQL - Mongodb is typically the most popular nosql database. There are 4 broad categories of nosql
                Document stores - most popular type of nosql, looks like traditional sql but no scheme no normalization.
                graph databases - niche type of nosql, most common use is face people you may know
                key-value stores - most straightforward, holds collections of key-value pairs, perfect for caching or storing session data
                wide-column data stores - similar to key-value but a key holds access to columns. such as time series db.
                new sql - like snowflake that combines normal sql with nosql speeds

                normally we will need a combination of each and shouldn't try to make a nosql or sql db work when we need the other.
                    -> sql can now hold json data, but, mongodb is much cheaper in storage being a normal document store unlike sql that's using json
                    -> so our storage cost on a serverless sql like cockroachlabs or planetscale will be MUCH higher than on mongodb, if we just want documents
                    -> and lots of text, so use a combination!!




*  */

























