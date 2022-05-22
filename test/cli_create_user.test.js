
const assert = require('assert');
const { USER_CREATED, USERNAME_EMPTY } = require('../src/constants/global');
const { toMessage } = require('../src/utils/binding');
const { runCommandWithGit, randomUser } = require('./util');

let testCases = [
    {
        name:'OK',
        stub: (check)=> {
            let user = randomUser()
            return runCommandWithGit(`-a.username=${user.username} -a.email=${user.email}`).then(data => {
                check(data)
            })
        },
        check:(data) => {
            let stringData = data.toString('utf8')
            console.log(stringData)
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
            return runCommandWithGit(`-a.username -a.email=${user.email}`).then(data => {
                check(data)
            })
        },
        check:(data) => {
            let stringData = data.toString('utf8')
            console.log(stringData)
            assert.notEqual(stringData, '')
            assert.notEqual(stringData, null)
            assert.notEqual(stringData, undefined)
            assert.equal(stringData.includes(toMessage(USERNAME_EMPTY)), true)
        }
    },
    
]

describe('cli:create user', function () { 
    testCases.forEach(element => {
        it(element.name, function () {
            return element.stub(element.check);
        })
    })
})