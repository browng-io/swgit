const assert = require('assert');
const { USER_DOES_NOT_EXISTS } = require('../src/constants/global');
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
                assert.notEqual(userResult, '')
                assert.notEqual(userResult, null)
                assert.notEqual(userResult, undefined)
                assert.equal(userResult.includes(user.username), true)
                assert.equal(userResult.includes(user.email), true)
            }
        },
        {
            name: "username empty ",
            stub: (check) => {
                return runCommandWithGit(`-g`).then(data => {
                    check(data)
                })
            },
            check: (data) => {
                var userResult = data.toString('utf8')
                assert.notEqual(userResult, '')
                assert.notEqual(userResult, null)
                assert.notEqual(userResult, undefined)
                assert.equal(userResult.includes("exited"), true)
            }
        },
        {
            name: "user not found",
            stub: (check) => {
                return runCommandWithGit(`-g=<user_notfound>`).then(data => {
                    check(data)
                })
            },
            check: (data) => {
                var userResult = data.toString('utf8')
                assert.notEqual(userResult, '')
                assert.notEqual(userResult, null)
                assert.notEqual(userResult, undefined)
                assert.equal(userResult.includes(toMessage(USER_DOES_NOT_EXISTS)), true)
            }
        },
        {
            name: "OK with full parameter",
            stub: (check) => {
                return runCommandWithGit(`--get=${data.username}`).then(data => {
                    check(data)
                })
            },
            check: (data) => {
                var userResult = data.toString('utf8')
                assert.notEqual(userResult, '')
                assert.notEqual(userResult, null)
                assert.notEqual(userResult, undefined)
                assert.equal(userResult.includes(user.username), true)
                assert.equal(userResult.includes(user.email), true)
            }
        },
        {
            name: "username empty with full parameter",
            stub: (check) => {
                return runCommandWithGit(`--get`).then(data => {
                    check(data)
                })
            },
            check: (data) => {
                var userResult = data.toString('utf8')
                assert.notEqual(userResult, '')
                assert.notEqual(userResult, null)
                assert.notEqual(userResult, undefined)
                assert.equal(userResult.includes("exited"), true)
            }
        },
        {
            name: "user not found with full parameter",
            stub: (check) => {
                return runCommandWithGit(`--get=<user_notfound>`).then(data => {
                    check(data)
                })
            },
            check: (data) => {
                var userResult = data.toString('utf8')
                assert.notEqual(userResult, '')
                assert.notEqual(userResult, null)
                assert.notEqual(userResult, undefined)
                assert.equal(userResult.includes(toMessage(USER_DOES_NOT_EXISTS)), true)
            }
        },
    ]
    
    describe('cli:get user info', function () { 
        testCases.forEach(element => {
            it(element.name, function () {
                return element.stub(element.check);
            })
        })
    })
})
