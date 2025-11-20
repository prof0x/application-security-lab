# Intro to Authentication Based Web Application Attacks

According to the OWASP Top-10 list of Web Application Vulnerabilitites, *Broken Access Controls* were the most common vulnerability found in 94% of applications, followed by *Encryption Failure* and *Injection* vulnerabilities. Given this fact, as developers and users of software that holds our Personally Identifiable Information (PII), our first concern should be the integrity of our authentication systems. 

For this project I've created a repository for you that implements a simple website with authentication. You will 1. run and inspect the code, then 2. create a new branch and update the code to fix a few common authentication issues.  Finally, you will merge your branch back into the main one.

# 🤓 SWBAT 
- Students will be able to describe the NodeJS ecosystem and the benefits of using NodeJS as a developer.
- Students will demonstrate an understanding of the structure of a NodeJS web application.
- Students will make code changes to update a web application and fix common authentication vulnerabilities.
- Students will use Git to organize their code by creating a new feature branch, making code changes, and merging that new branch into the main branch.
- Students will be able to describe the GitHub ecosystem and the benefits fo using GitHub as a developer. 

# 📋 Project Requirements 

## 🔮 Part 1. Getting to know your project
1. **Nodejs** is a, cross-platform, **runtime environment for executing JavaScript code** that enables developers to build scalable, fast, and efficient applications that can run **on any device**. For example, you could write a program in JavaScript that:
    - runs as a **background process** (script or utility) that doesn't require user input.
    - runs **in your terminal** and accepts user input through the command prompt.
    - runs as a **desktop application** with a fully functional GUI.
    - runs as an **API server** accepting network requests and returning data.
    - runs as a **web server** accepting network requests and returning web pages.
    - runs natively on mobile as an app device 
```
Start-ups and large companies (ie., PayPal, Uber, Netflix, Walmart) alike build software with Node bcs:
    - it allows them to build twice as fast with fewer developers.
    - results, on average, in 33% fewer lines of code and 40% fewer files.
    - handles 100% more requests per second compared to other platforms like Java.
    - decreases the average response time for requests by 35% compared to other platforms.
```
2. **NPM**, or Node Package Manager, is a **command-line utility** that comes pre-installed with Nodejs, and **used to manage and execute** your node projects. NPM is **also a Registry** of open-source projects that you are **free to use in your own projects**. There are over 1.3 projects on NPM that can be used in your project **with a single command** `npm install <package-name>`. But **be careful** because anyone can post their projects on NPM without validation and it is **often a source of vulnerabilities**. Check out https://www.npmjs.com/package/express to explore a popular package called **Express** that we depend on in this project **to implement our HTTP server**.
3. **Explorer** or File Explorer lets you **visualize and navigate your project** file structure easily. Below is a description of each folder and file. 
```
server/
├── helpers/
│   ├── auth.js     // createUser, login, and logout helper functions
│   └── setup.js   // code to setup and configure our server
├── images/
│   └── haxxor-matrix.gif   // lol
├── node_modules/          // created by 'npm install' includes dependencies (ie., express)
├── pages/
│   ├── createUser.html   // page with component to create user
│   ├── dashboard.html   // only accessible after login
│   └── homepage.html   // homepage with login component
├── routes/
│   ├── createUser.js   // http POST route to create user
│   ├── login.js       // http POST route to log user in
│   ├── logout.js     // http POST route to log user out
│   └── pages.js     // http GET route for .html pages
├── styles/
│   └── matrix.css         // global stylesheet
├── .gitignore            // list of files to ignore when commiting
├── index.js             // entry point for running the project
├── package.lock.json   // dont worry about this for now
├── package.json       // your project definition file
└── README.md         // this file
```
```Note: organization of the folder structure in this project is arbitrary and solely for your ease of readability. This project works the same if all the files were in the root folder (or any folder for that matter.) However, for other platforms (ie., React or Nextjs) the folder structure matters and requires that files go in their appropriate folders.```

## 🦿 Part 2. Setting up and running your project
0. Create an account at github.com/signup and login for the next steps.
1. Copy this repository by clicking the '`Fork`' button at the Top Right of this repository. You will be taken to another screen and can accept the default form field values. Click Create Fork You just created your own copy of this entire project. From now on make sure you are referencing your version of the project by verifying the repo name is <your-username>/application-security-lab.

``` 
Deliverable #1: Submit a screenshot of your Codespace and your running web application in a separate tab.
```

2. Open your repo in a new **codespace** by clicking on the green `< > Code` button (above) then selecting the **Codespaces** tab and clicking on **Create codespace on main**. This will start your codespace.
3. Inside your codespace, open your **Terminal** in your codespace by clicking on the ☰ **hamburger icon** at the top-left, then clicking on **View** then **Terminal**. ```Note: Your terminal may already be open by default.```
4. Your **Explorer** (on the left side of your codespace) lists all of your project files and directories. You can also type `ls -al` into your terminal to see your file structure at any time. In your Explorer, **right-click** README.md and click **Open Preview**. That will open these directions in your codespace so you can continue in the same window.
5. In your **Terminal**, run your project code by typing the following command: `npm start` into your terminal. The `start` script is defined in line 7 of your **package.json** file and runs the command 'node ./index.js' for you. This will begin the execution of your program.
6. In your **Terminal**, inspect the output of the program and make sure you see the text '**Server listening on Port 3000**' as the last line of output.
7. If your project ran successfully, you should also **see a popup** in the bottom-right of your terminal with the options *Make Public* and *Open in Browser*. **Click** the **Make Public** button then **click** the **Ports (1)** tab next to *Terminal*, **right-click** the url listed under *Forwarded Addresses* and click **Copy Local Address**
8. **Paste** the address that you just copied ***into a different tab or window*** and you should see a website with the title "Welcome to Cybersecurity..." and a form to login. If you do not see the website at this point **please ask for help as you will not be able to continue**.


## 🧪 Part 3. Interactive Application Testing
Performing interactive testing means trying trying to find flaws in a running application by testing its GUI and API endpoints. An application can exhibit 3 types of flaws: 1. Broken feature: not doing something it's supposed to do; 2. Bugs: doing something it's not supposed to do; 3. Unhandled Exception: doing something completely unexpected. 1 & 2 are very similar but meant to distinguish errors in features and other system errors. By the end of this exercise your project will be flawless.
### The Happy Path 😎 - To get started, let's explore the 'Happy Path' and make sure there are no broken features.
1. You can use the username '`Student`' and the password '`Poptart`' to log in on the homepage, which should redirect you to '`dashboard.html`'
2. Right-click anywhere on the page and select "Inspect" or "Inspect elements" to open your web developer tools. You will see several tabs in your developer tools and depending on what browser your are using, you will either see a '`Storage`' or an '`Application`' tab, click on the one that you see in your tools, Click on '`Cookies`' and look for '`webAppCookie`'. The value of this cookie should be '`Student`'.

``` 
Deliverable #2: Submit a Screenshot of your cookie data in the ‘Storage” or “Application” tab of your Developer tools.
```

3. Click logout which should redirect you to the homepage and delete the '`webAppCookie`' from your browser.
4. Next, test the Create User form, which should log you in automatically and forward you to the dashboard. Check cookie.
5. Go ahead and log out checking that cookies were deleted again. 
### The Not-So-Happy Path 🙃 - Let's poke around and see if we can make the app do something it's not supposed to.
1. Logging in takes us to '`/pages/dashboard.html`' which gives us the impression that it's secured but what happens if you try to navigate to '`/pages/dashboard.html`' directly?
2. Wow.. who needs a backdoor when the developer left the front one wide open!? Let's see if the app is only serving up web files or if we have access to system files as well. Navigate to the `/package.json` path in the url.
3. Every NodeJS project has a `package.json` file that tells us everything about the project. Inspect the file and determine what dependencies the project has (that can later be targeted) and determine the projects start file.
4. Navigate to the `/index.js` path in the url and inspect the file for potential next steps.
5. Navigate to the `/helpers/setup.js` path in the url and inspect the file for potential next steps.
6. Bingo! `/routes/login.js` should have something interesting lets take a look. Go ahead and navigate to that path.
7. Hmm seems like if a user fails authentication the logic redirects them with an error message in the url. We might be able to exploit this for some good old-fashioned **exfiltration**. Let's navigate to the `/helpers/auth.js` path and see how that error message is set.
8. This program must have been written by a really bad AI because not only are passwords stored in plain-text, but they are using a very insecure compare function that allows us to inject any code that we want. The `eval()` function interprets its string parameter as code and executes it as a function. This allows us to inject any function we want in the '`username`' field. 
9. Navigate back to `/pages/homepage.html` and paste the following string into the username field:
```
" === "") && (() => {throw new Error(users.reduce((users, user) => users+="user: " + user.username + " pass: " + user.password + "<br/>",""))})() && ("
```
this string will get interpreted as code and everything outside the &&'s will preserve our syntax so we can do what we really want which is throw an error that prints out all of the usernames and passwords to the error message we found in step 7. Enter any random text into the password field and hit enter.

``` 
Deliverable #3: Submit a screenshot of the exfiltrated usernames and passwords.
```

### The Devious Path ☠️ - Let's see if we can take the site down all together
10. Great! We've got our usernames and passwords, let's crash this sucker and get out of here. Paste the following string into the username field:
```
" === "") && (() => { console.log("all your base are belong to us"); process.exit()})() && ("
```
Again, everything outside of the &&'s will preserve our sytax so we can force the application to exit via `process.exit()`

11. Refresh the page and confirm that the site is no longer available. Go back to your github codespace and confirm that the messages "`all your base are belong to us`" and "`Server was forced to exit.`" appear in your terminal.

```
Deliverable #4: Submit a screenshot of the terminal window in your codespace.
```

### Congrats you just hacked yourself! 🐱‍👤

## 🔓 Bonus: Takeover any account with the insecure password reset feature
To make the lab even juicier, the app now ships with a "Reset Password" page that blindly trusts whatever username you provide. The handler never verifies ownership of the account—it simply overwrites the stored password and logs you in automatically. That makes it trivial to seize any account (including the seeded `Student` account) without knowing the old password.

### How to exploit it
1. From the login page, click **Forgot or reset password** (or browse directly to `/pages/resetPassword.html`).
2. Enter **Student** as the username and choose any new password you want.
3. Submit the form. The server will reset the password without sending an email or asking for proof of identity, set a session cookie, and drop you straight onto the dashboard as the hijacked user.
4. Log out, then log back in with `Student` and the new password you chose to confirm the takeover.

``` 
Deliverable #5: Screenshot showing a successful login as Student after using the reset page to change the password.
```

### How to patch it
- Treat password resets as a privileged workflow. Require a time-limited, signed reset token tied to the user’s identity (e.g., delivered via email or SMS) before allowing any password change.
- On the server side, validate the token and the intended username before applying the update. Do **not** auto-login a user just because they changed a password.
- At minimum for this lab, modify `helpers/resetPassword` to reject unauthenticated callers, require the current password, or verify a reset token stored server-side instead of blindly trusting form input.

## 🦟 Part 4. Bug Fixes
In the previous section we identified some very serious vulnerabilities:
```
1. Passwords are stored in plain-text.
2. Errors aren't being handled consistently and error messages are returned without being sanitized. 
3. The program can be forced to terminate unexpectedly.
4. Insecure function calls create potential for injection attack.
5. Pages that should be secure don't actually require authentication to access them.
6. System files that shouldn't be accessible (even to authenticated users) are served by the web app.   
```
As a developer, even if your Happy Path works as expected, you still have to handle all the ways that your application can be exploited, before you release your application. You can never guarantee that an application will be 100% flawless, but the more issues that you can find in testing, before you deploy your application, the more stable your application will be.

Let's start to fix some of these issues. In order to track our progress, work with other developers, and prevent creating additional bugs, we will use a feature of Git called 'branching'. This allows mutltiple developers, or even a singular developer, to work on multiple issues at the same time efficiently.

```Note: While vulnerability "#4. Insecure function calls create potential for inject attack" is the most important vulnerability to patch first, we're going to patch #1-3 first, so we can illustrate and verify that our fixes work.```

### Plain-text Passwords 🤦‍♂️  
Even with all of the other vulnerabilities, we could have avoided the worst case if all of the passwords weren't stored in plan-text. We're going to fix this vulnerability first since it puts our users' privacy and, therefore, safety at risk. 

1. Go back to your codespace and type the following command into your Terminal:
```
git branch
```
your output should look similar to this:
```
@prof0x ➜ /workspaces/prof0x-server (main) $ git branch
* main
@prof0x ➜ /workspaces/prof0x-server (main) $ 
```
the `*` next to `main` denotes that it is your current branch.

2. You're going to create a new branch called `encrypt-stored-passwords` to work on your solution to the plain-text passwords issue. In your terminal, go ahead and type the following command:
```
git checkout -b "encrypt-stored-passwords"
```
`git checkout <branch-name>` will change your current branch and the `-b` flag tells git to create a new branch if the it doesn't already exist. Your output should look similar to this:
```
@prof0x ➜ /workspaces/prof0x-server (main) $ git checkout -b "encrypt-stored-passwords"
Switched to a new branch 'encrypt-stored-passwords'
@prof0x ➜ /workspaces/prof0x-server (encrypt-stored-passwords) $ 
```
Notice that your command prompt changed to reflect your current branch. `(main)` is now `(encrypt-stored-passwords)`. Your current branch will always be reflected in your command prompt, but just for practice let's run the `git branch` command and inspect the output:
```
@prof0x ➜ /workspaces/prof0x-server (encrypt-stored-passwords) $ git branch
* encrypt-stored-passwords
  main
@prof0x ➜ /workspaces/prof0x-server (encrypt-stored-passwords) $ 
```
Notice that the `*` is next to the `encrypt-stored-passwords` branch now, indicating that it is your current branch.

3. Now you're ready to make code changes to fix the plain-text passwords issue. Open the file `/helpers/auth.js` and find the folowing line in the `createUsers()` method.

Line 21:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```users.push({ username:username, password:password })```

This is where we create the user and store their password in plain text. Users is an `array` and `.push()` creates a new object of type `{username: string, password: string}`. Instead of passing the raw `password` to the function we should encrypt it in a way that, when the user logs in with the same password, our program will compare the stored encrypted password with the encrypted input that the user passed in with their login information. 

```Note: A cryptographic `hash` function is the perfect candidate for this scenario because it always produces the same output given the same input, and it can't be reverse engineered to determine the original input (the user's password in this case). ```

Let's use a popular npm library called `bcrypt` (https://www.npmjs.com/package/bcrypt) in order to hash the passwords before we store them. That way if a hacker does get access to them, they can't immediately use the stolen credentials to login as the user and wreak havoc. 

In the `createUser()` method, make the following modification to the `users.push` statement:

```
users.push({username:username, password: await bcrypt.hash(password, 10)})
```
What this does is it tells our program to use the function named `hash()` that's part of the `bcrypt` library to encrypt the password before we store it. Now, when we're creating a user, we no longer store their password plain-text but instead we store a hashed version of it. 

4. Now that we're storing encrypted passwords, we need to update the logic that compares the stored-password with the user-provided password. find the folowing line in the `login()` method.  


Line 44:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;```if(users[index].password === password)```


Update the comparison statement with the following: 

```
if(await bcrypt.compare(users[index].password, password))
```

Now, when a user logs in, bcrypt hashes the users input and compares it to the hashed password without the need to store anything in plain-text. 

5. That's it! Let's just verify that your changes work. If you remember correctly, we crashed our application in the last step of part 3. So we will need restart by typing the following command into the Terminal of your Codespace `npm start`.

6. Open your web application in the browser and create a new user. Logout and login again with that user (this should succeed.) Try to login with `Student` and `Poptart`. **This will fail** because `Poptart` is still stored in plain-text but your logic compares it to the hashed version. 

7. Let's verify that the passwords are being stored as hashes now instead of in plain-text. Navigate back to `/pages/homepage.html` and paste the following string into the username field and click Login.
```
" === "") && (() => {throw new Error(users.reduce((users, user) => users+="user: " + user.username + " pass: " + user.password + "<br/>",""))})() && ("
```
Remember this is how we hacked our site the first time. However, this time your new user's password is hashed, so even if a hacker was able to get this far, they wouldn't be able to do much with that hash. Because we 'hardcoded' the Student password Poptart that one did not get hashed and remains vulnerable. We should never store hardcoded passwords in our code!

``` 
Extra Credit #1: Submit a screenshot of the exfiltrated usernames and passwords.
```

8. Now let's save our changes. In your terminal, kill your web application by pressing the `Ctrl + C` key combo, then type the following command:
```
git commit -a -m "updated createUser and login helpers to store and compare encrypted passwords."
```
Your output should look something like this:
```
@prof0x ➜ /workspaces/prof0x-server (encrypt-stored-passwords) $ git commit -a -m "updated createUser and login helpers to store and compare encrypted passwords."
[encrypt-stored-passwords 73bfe3d] updated createUser and login helpers to store and compare encrypted passwords.
 2 files changed, 101 insertions(+), 33 deletions(-)
```
```Note: This will create a local 'commit' which is stored on the current branch on your device but doesn't update the `main` branch or your repo on Github.``` 

7. To push your changes **upstream** to GitHub, run the following command:

```
git push --set-upstream origin encrypt-stored-passwords
```
```Note: because we created the branch locally (remote), Github (origin) is not yet aware of it. So we need to specify '--set-upstream origin encrypt-stored-passwords' to tell GitHub to create the branch and push the changes to the new branch.```
Your output should look something like this:
```
@prof0x ➜ /workspaces/prof0x-server (encrypt-stored-passwords) $ git push --set-upstream origin encrypt-stored-passwords
Enumerating objects: 9, done.
Counting objects: 100% (9/9), done.
Delta compression using up to 2 threads
Compressing objects: 100% (5/5), done.
Writing objects: 100% (5/5), 3.15 KiB | 3.15 MiB/s, done.
Total 5 (delta 3), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (3/3), completed with 3 local objects.
remote: 
remote: Create a pull request for 'encrypt-stored-passwords' on GitHub by visiting:
remote:      https://github.com/prof0x/prof0x-server/pull/new/encrypt-stored-passwords
remote: 
To https://github.com/prof0x/prof0x-server
 * [new branch]      encrypt-stored-passwords -> encrypt-stored-passwords
branch 'encrypt-stored-passwords' set up to track 'origin/encrypt-stored-passwords'.
```

8. Switch back to the `main` branch by typing the following command into your terminal:
```
git checkout "main"
```
Notice in your terminal that your current branch changed from **(encrypt-stored-passwords)** to **(main)** and the code you added to `/helpers/auth.js` has disappeared?

9. Switch back to the `encrypt-stored-passwords` branch by typing the following command into your terminal:
```
git checkout "encrypt-stored-passwords"
```
The code that you wrote in `/helpers/auth.js` should be back where you put it, and that's because your changes live on this branch. You can switch to any other branch and your code will still be on this branch when you come back. When you are done testing and working on this branch you will then merge it with the default branch which, in most cases, is called `main` but you can name it whatever you want.

10. Switch back to `main` (step 11) **then** merge the code from `encrypt-stored-passwords` into `main` by typing the following command into your terminal:
```
git checkout "main"
git merge "encrypt-stored-passwords"
```
Your output should look something like this:
```
@prof0x ➜ /workspaces/prof0x-server (encrypt-stored-passwords) $ git checkout main 
Switched to branch 'main'
Your branch is up to date with 'origin/main'.
@prof0x ➜ /workspaces/prof0x-server (main) $ git merge encrypt-stored-passwords 
Updating e879e52..e4413cd
Fast-forward
 README.md       | 165 ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++-----------------------
 helpers/auth.js |   7 ++----
 2 files changed, 137 insertions(+), 35 deletions(-)
@prof0x ➜ /workspaces/prof0x-server (main) $ 
```

11. Notice that your code changes to `/helpers/auth.js` now appears in your `main` branch.
12. Backup your CLI history to submit with your assignment by typing the following command into your terminal:
```
history > cli-backup.txt
```
13. Commit your cli history to the `main` branch by typing the following command into your terminal:
```
git commit -a -m "added cli history"
```
14. **Push** your commits from your (remote) codespace to the (origin) main repository in GitHub by typing the following command into your terminal:
```
git push origin main
```

``` 
Extra Credit #2: Submit a screenshot of your codespace (including code changes and your terminal) and submit to Moodle!
```

# 🥳 You just learned how to:

✅ Create a codespace on GitHub

✅ Run a NodeJS project

✅ Interactive Application Testing (basic)

✅ Penetration Testing (basic)

✅ Use `bcrypt` to hash stored passwords in an application

✅ Commit new code to a branch with git

✅ Swith branches with git

✅ Merge branches with git

✅ Push changes to a repository in GitHub
