const assert = require('assert');
const { USERNAME_EMPTY, EMAIL_EMPTY } = require('../src/constants/global');
const { toMessage } = require('../src/utils/binding');
const runCreateUserTest = require('./create_user.test');
const { runCommandWithGit, randomUser } = require('./util');

let user = randomUser();

// runCreateUserTest
runCreateUserTest(user).then(data => {
    console.log("banylog", data)
    let testCases = [
        {
            name: "OK",
            stub: (check) => {
                return runCommandWithGit(`-g=${data.username}`).then(data => {
                    check(data)
                })
            },
            check: (data) => {
                let stringData = data.toString('utf8')
                console.log("banylog", stringData)
                assert.notEqual(stringData, '')
                assert.notEqual(stringData, null)
                assert.notEqual(stringData, undefined)
            }
        }
    ]
    
    describe('cli:get user info', function () { 
        testCases.forEach(element => {
            it(element.name, function () {
                return element.stub(element.check);
            })
        })
    })
})
