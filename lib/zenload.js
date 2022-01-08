import {getLoaders} from './get-loaders.js';
import {readConfig} from './read-config.js';

const cutShebang = (a) => a.replace('#!/usr/bin/env node', '');

const list = await readConfig();
const loaders = await getLoaders(list);

const returns = (a) => () => a;

async function run(url, format, source) {
    source = cutShebang(String(source));
    
    for (const load of loaders)
        ({source} = await load(url, {format}, returns({
            source,
            format,
        })));
    
    return {
        format,
        source,
    };
}

export const load = async (url, context, defaultLoad) => {
    const {format, source} = await defaultLoad(url, context);
    return await run(url, format, source);
};

export const transformSource = async (source, context) => {
    const {url, format} = context;
    return await run(url, format, source);
};

