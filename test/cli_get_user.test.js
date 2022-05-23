const assert = require('assert');
const { USERNAME_EMPTY, EMAIL_EMPTY } = require('../src/constants/global');
const { toMessage } = require('../src/utils/binding');
const testCliUserCreation = require('./cli_create_user.test');
const { runCommandWithGit, randomUser } = require('./util');

let user = randomUser();

testCliUserCreation(user).then(data => {
    let testCases = [
        {
            name: "OK",
            stub: (check) => {
                return runCommandWithGit(`-g=${user.username}`).then(data => {
                    check(data)
                })
            },
            check: (data) => {
                let stringData = data.toString('utf8')
                console.log(stringData)
                assert.notEqual(stringData, '')
                assert.notEqual(stringData, null)
                assert.notEqual(stringData, undefined)
            }
        }
    ]
    
    describe('cli:create user', function () { 
        testCases.forEach(element => {
            it(element.name, function () {
                return element.stub(element.check);
            })
        })
    })
})
