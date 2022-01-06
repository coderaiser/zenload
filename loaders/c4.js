export function load(url, context, defaultLoad) {
    const {source} = defaultLoad(url, context, defaultLoad);
    
    return {
        format: 'module',
        source: `${source} 🧨`,
    };
}
