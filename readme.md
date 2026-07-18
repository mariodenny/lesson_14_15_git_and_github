# Tutorial How to use git and github in your project
1. Make sure you already setting your git to connect to the github
```shell
git config --global user.name "your_username"
git config --global user.email "your_email"
```
2. open vscode, terminal -> new terminal -> cmd (hit enter)
3. type git init
```shell
git init
```
4. rename the branch to main
```shell
git branch -m main
```
5. connect your git local and github using this command
```shell
git remote add origin https://your-repository-url
```
6. stage all changes using
```shell
git add .
```
7. give message before send it to github
```shell
git commit -m "your message" // for example "first commit"
```
8. push your code using git push
```shell
git push origin main
```
## How to start new project javascript
1. run this command 
```shell
npm init -y
```
2. run this command to add special file so git wont push node_modules/
```shell
touch .gitignore
```
3. add this line
```shell
node_modules/
package-lock.json
```