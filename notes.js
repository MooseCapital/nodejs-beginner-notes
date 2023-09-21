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
*  */

























