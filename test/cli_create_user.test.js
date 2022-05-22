
const assert = require('assert');
const { USER_CREATED } = require('../src/constants/global');
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
            assert.notEqual(stringData, '')
            assert.notEqual(stringData, null)
            assert.notEqual(stringData, undefined)
            assert.equal(stringData.includes(USER_CREATED), true)
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