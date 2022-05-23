const assert = require('assert');
const { USERNAME_EMPTY, EMAIL_EMPTY } = require('../src/constants/global');
const { toMessage } = require('../src/utils/binding');
const runCreateUserTest = require('./create_user.test');
const { runCommandWithGit, randomUser } = require('./util');

let user = randomUser();

runCreateUserTest(user).then(data => {
    let testCases = [
        {
            name: "OK",
            stub: (check) => {
                return runCommandWithGit(`-g=${data.username}`).then(data => {
                    check(data)
                })
            },
            check: (data) => {
                var userResult = data.toString('utf8')
                console.log("banylog", user)
                assert.notEqual(userResult, '')
                assert.notEqual(userResult, null)
                assert.notEqual(userResult, undefined)
                assert.equal(userResult.includes(user.username), true)
                assert.equal(userResult.includes(user.email), true)
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
