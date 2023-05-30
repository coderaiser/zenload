import tryToCatch from 'try-to-catch';
import {readFile} from 'fs/promises';

const {parse} = JSON;
const {ZENLOAD} = process.env;

export const readConfig = async () => {
    if (ZENLOAD)
        return ZENLOAD.split(',');
    
    const [error, data] = await tryToCatch(readFile, './.zenload.json', 'utf8');
    
    if (error)
        return [];
    
    return parse(data);
};

