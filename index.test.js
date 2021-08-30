const Todos = require('./index.js');
const assert = require('assert').strict;
const fs = require('fs');

describe('integragtion test', function () {
    it('should be able to add complete TODOs', function () {
        let todos = new Todos();
        assert.strictEqual(todos.list().length, 0);

        todos.add('run code');
        assert.strictEqual(todos.list().length,1);
        assert.deepStrictEqual(todos.list(), [{title: 'run code', completed: false}]);
        
        todos.add('test everything');
        assert.strictEqual(todos.list().length, 2);
        assert.deepStrictEqual(todos.list(),
            [
                { title: 'run code', completed: false },
                { title: 'test everything', completed: false }
            ]
        )
        todos.complete('run code');
        assert.deepStrictEqual(todos.list(),
            [
                { title: 'run code', completed: true },
                { title: 'test everything', completed: false }
            ]
        );
    });
});

describe('complete()', function () {
    it('should fail if there are no TODOs', function() {
        let todos = new Todos();
        const expectedError = new Error(`You have no TODOs stored. Why dont't you add one first?`);

        assert.throws(() => {
            todos.complete(`doesn't exist`);
        }, expectedError);
    });
});

describe('saveToFile()', function() {
    it('should save a single TODO', async function() {
        let todos = new Todos();
        todos.add('save a CSV');
        await todos.saveToFile()

        assert.strictEqual(fs.existsSync('todos.csv'), true);
        let expectedFileContents = 'Title,Completed\nsave a CSV,false\n';
        let content = fs.readFileSync('todos.csv').toString();
        assert.strictEqual(content, expectedFileContents);
    });
});
