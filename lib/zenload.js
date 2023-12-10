import {getLoaders} from './get-loaders.js';
import {readConfig} from './read-config.js';

const cutShebang = (a) => a.replace('#!/usr/bin/env node', '');

const list = await readConfig();
const loaders = await getLoaders(list);

const returns = (a) => () => a;

export function globalPreload({port}) {
    const listeners = [];
    let preload = '';
    
    new Proxy(port, {
        set(target, prop, value) {
            listeners.push(value);
        },
    });
    
    port.onmessage = (event) => {
        for (const fn of listeners) {
            fn(event);
        }
    };
    
    for (const loader of loaders) {
        preload += loader.globalPreload?.({
            port,
        }) || '';
    }
    
    return preload;
}

async function run(url, format, source) {
    source = cutShebang(String(source));
    
    const options = {
        format,
    };
    
    for (const loader of loaders)
        ({source} = await loader.load(url, options, returns({
            source,
            format,
        })));
    
    return {
        format,
        source,
    };
}

export const load = async (url, context, defaultLoad) => {
    const {
        format,
        source,
    } = await defaultLoad(url, context);
    
    return await run(url, format, source);
};

