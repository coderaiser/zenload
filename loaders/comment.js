export function load(url, context) {
    const {format, source} = context;
    
    return {
        format,
        source: `${source}\n //`,
    };
}
