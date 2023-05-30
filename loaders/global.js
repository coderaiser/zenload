export function globalPreloader() {
    return '// global preloader';
}

export function load(url, context, defaultLoad) {
    return defaultLoad(url, context, defaultLoad);
}

