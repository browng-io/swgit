const { v4: uuidv4 } = require('uuid');
const { spawn } = require('child_process');
const User = require('./../src/db_store/user');
const Repo = require('./../src/db_store/repo');

const { 
    randomEmail, 
    randomUsername, 
    randomUrl, 
    randomPath,
} = require('./../src/utils')

function randomUser() {
    return new User(randomUsername(), randomEmail(), randomPath(), randomPath(), uuidv4())
}

function randomRepo(user = randomUser()) {
    return new Repo(randomUrl(), user.id)
}

function runCommandWithGit(command) {
    return new Promise((resolve, reject) => {  
        let arrayCommand = command.split(" ")
        var listen = spawn(`node`, ['./bin/index.js'].concat(arrayCommand));

        listen.stdout.on('data', function(a){
            resolve(a)
            return;
        });
    
        listen.on('exit',function(){
            resolve('exited')
            return;
        })
    
        listen.stderr.on('data',function(a){
            resolve(a)
            return;
        });
    })
}

module.exports = {
    randomUser,
    randomRepo,
    runCommandWithGit,
    allowRunTestOnMachine: () => {
        if (process.env.TEST_MODE === 'machine') {
            return true
        } else {
            return false
        }
    } 

}