import {
    run,
    cutEnv,
} from 'madrun';

const NODE_OPTIONS = `'--no-warnings --loader ./lib/zenload.js'`;

const testEnv = {
    NODE_OPTIONS,
    ZENLOAD: [
        'escover',
        'mock-import',
    ].join(','),
};

const coverEnv = {
    NODE_OPTIONS,
    ZENLOAD: [
        'mock-import',
    ].join(','),
};

export default {
    'test': () => [testEnv, `tape 'test/**/*.js' 'lib/**/*.spec.js'`],
    'coverage': () => [testEnv, `escover tape 'test/**/*.js' 'lib/**/*.spec.js'`],
    'coverage:old': async () => [coverEnv, `c8 --exclude="lib/**/{fixture,*.spec.js}" ${await cutEnv('test')}`],
    'lint': () => 'putout .',
    'fresh:lint': () => run('lint', '--fresh'),
    'lint:fresh': () => run('lint', '--fresh'),
    'fix:lint': () => run('lint', '--fix'),
    'report': () => 'c8 report --reporter=lcov',
    'watcher': () => 'nodemon -w test -w lib --exec',
    
    'watch:test': async () => await run('watcher', `"${await cutEnv('test')}"`, testEnv),
    
    'watch:lint': async () => await run('watcher', `'npm run lint'`),
    'watch:tape': () => 'nodemon -w test -w lib --exec tape',
    
    'watch:coverage': async () => await run('watcher', await cutEnv('coverage'), testEnv),
};
