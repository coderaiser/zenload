import {createMockImport} from 'mock-import';
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

test('zenload: readConfig', async (t) => {
    const readFile = stub().rejects(Error('x'));
    mockImport('fs/promises', {
        readFile,
    });
    
    const stopEnv = initEnv();
    
    const {readConfig} = await reImport('./read-config.js');
    const list = await readConfig(undefined);
    
    stopAll();
    stopEnv();
    
    t.deepEqual(list, []);
    t.end();
});

test('zenload: readconfig: resolves', async (t) => {
    const readFile = stub().resolves(stringify([
        'escover',
    ]));
    
    mockImport('fs/promises', {
        readFile,
    });
    
    const stopEnv = initEnv();
    
    const {readConfig} = await reImport('./read-config.js');
    const result = await readConfig(undefined);
    
    stopAll();
    stopEnv();
    
    const expected = [
        'escover',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});

function initEnv(loaders) {
    const {ZENLOAD} = process.env;
    
    if (!loaders)
        delete process.env.ZENLOAD;
    
    if (loaders)
        process.env.ZENLOAD = loaders.join(',');
    
    return () => {
        process.env.ZENLOAD = ZENLOAD;
    };
}

