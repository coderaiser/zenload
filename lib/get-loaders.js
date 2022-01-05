import {join} from 'path';

export const getLoaders = async (list) => {
    const rawLoaders = list
        .map(parseName)
        .map(async (a) => (await import(a)).load);
    
    return await Promise.all(rawLoaders);
};

const parseName = (a) => {
    if (!/^\./.test(a))
        return a;
    
    return join(process.cwd(), a);
};
