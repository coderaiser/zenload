const cutShebang = (a) => a.replace('#!/usr/bin/env node', '');
import {getLoaders} from './get-loaders.js';
import {readConfig} from './read-config.js';

const list = await readConfig();
const loaders = await getLoaders(list);

const returns = (a) => () => a;

export async function load(url, context, defaultLoad) {
    let {format, source} = await defaultLoad(url, {format: context.format});
    
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
