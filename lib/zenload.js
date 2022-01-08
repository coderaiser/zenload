import {getLoaders} from './get-loaders.js';
import {readConfig} from './read-config.js';

const cutShebang = (a) => a.replace('#!/usr/bin/env node', '');

const list = await readConfig();
const loaders = await getLoaders(list);

const returns = (a) => () => a;

export async function load(url, context, defaultLoad) {
    let {format, source} = await defaultLoad(url, context, defaultLoad);
    
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

