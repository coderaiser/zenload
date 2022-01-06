export function load(url, context, defaultLoad) {
    const {format, source} = defaultLoad(url, context, defaultLoad);
    
    return {
        format,
        source: `${source}\n //`,
    };
}
