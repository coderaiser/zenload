import {
    createMockImport,
    enableNestedImports,
    disableNestedImports,
} from 'mock-import';
import {
    test,
    stub,
} from 'supertape';

const {
    mockImport,
    stopAll,
    reImport,
} = createMockImport(import.meta.url);

const {stringify} = JSON;

test('zenload: source', async (t) => {
    const defaultLoad = stub().resolves({
        source: 'hello();',
        format: 'module',
    });
    
    enableNestedImports();
    const stopEnv = initEnv([
        './loaders/comment.js',
        './loaders/c4.js',
        './loaders/mock-import.js',
    ]);
    
    const {url} = import.meta;
    const context = {};
    
    const {load} = await reImport('./zenload.js');
    const {source} = await load(url, context, defaultLoad);
    const expected = 'hello();\n // 🧨 ☘️ ';
    
    stopEnv();
    disableNestedImports();
    
    t.equal(source, expected);
    t.end();
});

test('zenload: no config file', async (t) => {
    const defaultLoad = stub().resolves({
        source: 'hello();',
        format: 'module',
    });
    
    const readFile = stub().resolves(stringify(['mock-import']));
    
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

function initEnv(loaders) {
    const {ZENLOAD} = process.env;
    
    process.env.ZENLOAD = loaders.join(',');
    
    return () => {
        process.env.ZENLOAD = ZENLOAD;
    };
}
