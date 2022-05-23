
const assert = require('assert');
const { USERNAME_EMPTY, EMAIL_EMPTY } = require('../src/constants/global');
const { toMessage } = require('../src/utils/binding');
const { runCommandWithGit, randomUser } = require('./util');

function testCliUserCreation(user) {
    return new Promise((resolve, reject) => {
        let testCases = [
            {
                name:'OK',
                stub: (check)=> {
                    return runCommandWithGit(`-a.username=${user.username} -a.email=${user.email}`).then(data => {
                        check(data)
                    })
                },
                check:(data) => {
                    let stringData = data.toString('utf8')
                    assert.notEqual(stringData, '')
                    assert.notEqual(stringData, null)
                    assert.notEqual(stringData, undefined)
                    assert.equal(stringData.includes("ssh-keygen-lite"), true)
                }
            },
            {
                name:'username empty',
                stub: (check)=> {
                    let user = randomUser()
                    return runCommandWithGit(`-a.email=${user.email}`).then(data => {
                        check(data)
                    })
                },
                check:(data) => {
                    let stringData = data.toString('utf8')
                    assert.notEqual(stringData, '')
                    assert.notEqual(stringData, null)
                    assert.notEqual(stringData, undefined)
                    assert.equal(stringData.includes(toMessage(USERNAME_EMPTY)), true)
                }
            },
            {
                name:'username empty with true value',
                stub: (check)=> {
                    let user = randomUser()
                    return runCommandWithGit(`-a.username -a.email=${user.email}`).then(data => {
                        check(data)
                    })
                },
                check:(data) => {
                    let stringData = data.toString('utf8')
                    assert.notEqual(stringData, '')
                    assert.notEqual(stringData, null)
                    assert.notEqual(stringData, undefined)
                    assert.equal(stringData.includes(toMessage(USERNAME_EMPTY)), true)
                }
            },
            {
                name:'email empty',
                stub: (check)=> {
                    let user = randomUser()
                    return runCommandWithGit(`-a.username=${user.username}`).then(data => {
                        check(data)
                    })
                },
                check:(data) => {
                    let stringData = data.toString('utf8')
                    assert.notEqual(stringData, '')
                    assert.notEqual(stringData, null)
                    assert.notEqual(stringData, undefined)
                    assert.equal(stringData.includes(toMessage(EMAIL_EMPTY)), true)
                }
            },
            {
                name:'email empty with true value',
                stub: (check)=> {
                    let user = randomUser()
                    return runCommandWithGit(`-a.username=${user.username} -a.email`).then(data => {
                        check(data)
                    })
                },
                check:(data) => {
                    let stringData = data.toString('utf8')
                    assert.notEqual(stringData, '')
                    assert.notEqual(stringData, null)
                    assert.notEqual(stringData, undefined)
                    assert.equal(stringData.includes(toMessage(EMAIL_EMPTY)), true)
                }
            },
            {
                name:'OK & with full parameter',
                stub: (check)=> {
                    let user = randomUser()
                    return runCommandWithGit(`--add.username=${user.username} --add.email=${user.email}`).then(data => {
                        check(data)
                    })
                },
                check:(data) => {
                    let stringData = data.toString('utf8')
                    assert.notEqual(stringData, '')
                    assert.notEqual(stringData, null)
                    assert.notEqual(stringData, undefined)
                    assert.equal(stringData.includes("ssh-keygen-lite"), true)
                }
            },
            {
                name:'username empty & with full parameter',
                stub: (check)=> {
                    let user = randomUser()
                    return runCommandWithGit(`--add.email=${user.email}`).then(data => {
                        check(data)
                    })
                },
                check:(data) => {
                    let stringData = data.toString('utf8')
                    assert.notEqual(stringData, '')
                    assert.notEqual(stringData, null)
                    assert.notEqual(stringData, undefined)
                    assert.equal(stringData.includes(toMessage(USERNAME_EMPTY)), true)
                }
            },
            {
                name:'username empty with true value & with full parameter',
                stub: (check)=> {
                    let user = randomUser()
                    return runCommandWithGit(`--add.username --add.email=${user.email}`).then(data => {
                        check(data)
                    })
                },
                check:(data) => {
                    let stringData = data.toString('utf8')
                    assert.notEqual(stringData, '')
                    assert.notEqual(stringData, null)
                    assert.notEqual(stringData, undefined)
                    assert.equal(stringData.includes(toMessage(USERNAME_EMPTY)), true)
                }
            },
            {
                name:'email empty & with full parameter',
                stub: (check)=> {
                    let user = randomUser()
                    return runCommandWithGit(`--add.username=${user.username}`).then(data => {
                        check(data)
                    })
                },
                check:(data) => {
                    let stringData = data.toString('utf8')
                    assert.notEqual(stringData, '')
                    assert.notEqual(stringData, null)
                    assert.notEqual(stringData, undefined)
                    assert.equal(stringData.includes(toMessage(EMAIL_EMPTY)), true)
                }
            },
            {
                name:'email empty with true value & with full parameter',
                stub: (check)=> {
                    let user = randomUser()
                    return runCommandWithGit(`--add.username=${user.username} --add.email`).then(data => {
                        check(data)
                    })
                },
                check:(data) => {
                    let stringData = data.toString('utf8')
                    assert.notEqual(stringData, '')
                    assert.notEqual(stringData, null)
                    assert.notEqual(stringData, undefined)
                    assert.equal(stringData.includes(toMessage(EMAIL_EMPTY)), true)
                }
            },
            
        ]
        
        describe('cli:create user', function () { 
            testCases.forEach(element => {
                it(element.name, function () {
                    return element.stub((data)=> {
                        element.check(data)
                        if (element.name === 'OK') {
                            resolve(user)
                        }
                    });
                })
            })
        })
    })
}
let user = randomUser()
testCliUserCreation(user)

module.exports = testCliUserCreation;