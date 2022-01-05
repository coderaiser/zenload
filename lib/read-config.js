import tryToCatch from 'try-to-catch';
import {readFile} from 'fs/promises';

const {parse} = JSON;
export const readConfig = async () => {
    const [error, data] = await tryToCatch(readFile, './.zenload.json', 'utf8');
    
    if (error)
        return [];
    
    return parse(data);
};
