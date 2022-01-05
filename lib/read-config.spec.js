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

test('zenload: readconfig', async (t) => {
    const readFile = stub().rejects(Error('x'));
    mockImport('fs/promises', {
        readFile,
    });
    
    const {readConfig} = await reImport('./read-config.js');
    const list = await readConfig();
    
    stopAll();
    
    t.deepEqual(list, []);
    t.end();
});

