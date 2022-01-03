import {readFile} from 'fs/promises';
import {join} from 'path';

const {parse} = JSON;
const list = parse(await readFile('./.zenload.json'));

const promises = list
    .map((a) => join(process.cwd(), a))
    .map(async (a) => (await import(a)).load);

const loaders = await Promise.all(promises);
const cutShebang = (a) => a.replace('#!/usr/bin/env node', '');

export async function load(url, context, defaultLoad) {
    let {format, source} = await defaultLoad(url, {format: context.format});
    source = cutShebang(String(source));
    
    for (const load of loaders) {
        ({source} = await load(url, {source, format}, defaultLoad));
    }
    
    return {
        format,
        source,
    };
}

