export function load(url, context) {
    const {source} = context;
    
    return {
        format: 'module',
        source: `${source} ☘️ `,
    };
}
