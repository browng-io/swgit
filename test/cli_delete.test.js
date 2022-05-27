const assert = require('assert');
const { USER_DELETED } = require('../src/constants/global');
const { toMessage } = require('../src/utils/binding');
const runCreateUserTest = require('./create_user.test');
const { runCommandWithGit, randomUser } = require('./util');

let user = randomUser();
let user2 = randomUser();

runCreateUserTest(user).then(data => {
    let testCases = [
        {
            name: "OK",
            stub: (check) => {
                return runCommandWithGit(`-d=${data.username}`).then(data => {
                    check(data)
                })
            },
            check: (data) => {
                var userResult = data.toString('utf8')
                assert.notEqual(userResult, '')
                assert.notEqual(userResult, null)
                assert.notEqual(userResult, undefined)
                assert.equal(userResult.includes(USER_DELETED), true)
            }
        },
        {
            name: "Username invalid '' ",
            stub: (check) => {
                return runCommandWithGit(`-d=${''}`).then(data => {
                    check(data)
                })
            },
            check: (data) => {
                var userResult = data.toString('utf8')
                assert.notEqual(userResult, '')
                assert.notEqual(userResult, null)
                assert.notEqual(userResult, undefined)
            }
        },
        {
            name: "Username invalid null ",
            stub: (check) => {
                return runCommandWithGit(`-d=${null}`).then(data => {
                    check(data)
                })
            },
            check: (data) => {
                var userResult = data.toString('utf8')
                assert.notEqual(userResult, '')
                assert.notEqual(userResult, null)
                assert.notEqual(userResult, undefined)
            }
        },
        {
            name: "Username invalid undifined ",
            stub: (check) => {
                return runCommandWithGit(`-d=${undefined}`).then(data => {
                    check(data)
                })
            },
            check: (data) => {
                var userResult = data.toString('utf8')
                assert.notEqual(userResult, '')
                assert.notEqual(userResult, null)
                assert.notEqual(userResult, undefined)
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


runCreateUserTest(user2).then(data => {
    let testCases = [
        {
            name: "OK",
            stub: (check) => {
                return runCommandWithGit(`--delete=${data.username}`).then(data => {
                    check(data)
                })
            },
            check: (data) => {
                var userResult = data.toString('utf8')
                assert.notEqual(userResult, '')
                assert.notEqual(userResult, null)
                assert.notEqual(userResult, undefined)
                assert.equal(userResult.includes(USER_DELETED), true)
            }
        },
        {
            name: "Username invalid '' ",
            stub: (check) => {
                return runCommandWithGit(`--delete=${''}`).then(data => {
                    check(data)
                })
            },
            check: (data) => {
                var userResult = data.toString('utf8')
                assert.notEqual(userResult, '')
                assert.notEqual(userResult, null)
                assert.notEqual(userResult, undefined)
            }
        },
        {
            name: "Username invalid null ",
            stub: (check) => {
                return runCommandWithGit(`--delete=${null}`).then(data => {
                    check(data)
                })
            },
            check: (data) => {
                var userResult = data.toString('utf8')
                assert.notEqual(userResult, '')
                assert.notEqual(userResult, null)
                assert.notEqual(userResult, undefined)
            }
        },
        {
            name: "Username invalid undifined ",
            stub: (check) => {
                return runCommandWithGit(`--delete=${undefined}`).then(data => {
                    check(data)
                })
            },
            check: (data) => {
                var userResult = data.toString('utf8')
                assert.notEqual(userResult, '')
                assert.notEqual(userResult, null)
                assert.notEqual(userResult, undefined)
            }
        },
    ]
    
    describe('cli:get user info with full option names', function () { 
        testCases.forEach(element => {
            it(element.name, function () {
                return element.stub(element.check);
            })
        })
    })
})

