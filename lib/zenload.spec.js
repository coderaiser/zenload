import {createMockImport} from 'mock-import';
import {
    test,
    stub,
} from 'supertape';

import {load} from './zenload.js';

const {
    mockImport,
    stopAll,
    reImport,
} = createMockImport(import.meta.url);

const {stringify} = JSON;

test('zenload', async (t) => {
    const defaultLoad = stub().resolves({
        source: 'hello();',
        format: 'module',
    });
    
    const {url} = import.meta;
    const context = {};
    const {source} = await load(url, context, defaultLoad);
    const expected = 'hello();\n // 🧨 ☘️ ';
    
    t.equal(source, expected);
    t.end();
});

test('zenload: external module', async (t) => {
    const defaultLoad = stub().resolves({
        source: 'hello();',
        format: 'module',
    });
    
    const {url} = import.meta;
    const context = {};
    const {source} = await load(url, context, defaultLoad);
    const expected = 'hello();\n // 🧨 ☘️ ';
    
    t.equal(source, expected);
    t.end();
});

test('zenload: no config file', async (t) => {
    const defaultLoad = stub().resolves({
        source: 'hello();',
        format: 'module',
    });
    
    const readFile = stub().resolves(stringify([
        'mock-import',
    ]));
    mockImport('fs/promises', {
        readFile,
    });
    
    const {url} = import.meta;
    const context = {};
    const {load} = await reImport('./zenload.js');
    const {source} = await load(url, context, defaultLoad);
    const expected = 'hello();';
    
    stopAll();
    
    t.equal(source, expected);
    t.end();
});

