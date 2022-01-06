export function load(url, context, defaultLoad) {
    const {source, format} = defaultLoad(url, context, defaultLoad);
    
    return {
        format,
        source: `${source} ☘️ `,
    };
}
