import {
    test,
    stub,
} from 'supertape';

import {load} from './zenload.js';

test('zenload', async (t) => {
    const defaultLoad = stub().returns({
        source: 'hello();',
        format: 'module',
    });
    
    const url = 'any.js';
    const context = {};
    const {source} = await load(url, context, defaultLoad);
    const expected = 'hello();\n // 🧨 ☘️ ';
    
    t.equal(source, expected);
    t.end();
});

