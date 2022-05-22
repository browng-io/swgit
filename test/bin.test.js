
const assert = require('assert');

let testCases = [
    {
        name:'--help',
        stub: (check)=> {
            return runCommandWithGit('--help').then(data => {
                check(data)
            })
        },
        check:(data) => {
            let stringData = data.toString('utf8')
            assert.notEqual(stringData, '')
            assert.notEqual(stringData, null)
            assert.notEqual(stringData, undefined)
        }
    },
    {
        name:'version',
        stub: (check)=> {
            return runCommandWithGit('--version').then(data => {
                check(data)
            })
        },
        check:(data) => {
            let stringData = data.toString('utf8')
            console.log(stringData)
            assert.equal(stringData.includes("v"), true)
            assert.notEqual(stringData, null)
            assert.notEqual(stringData, '')
            assert.notEqual(stringData, undefined)
        }
    }
]

describe('cli:bin index ', function () { 
    testCases.forEach(element => {
        it(element.name, function () {
            return element.stub(element.check);
        })
    })
})