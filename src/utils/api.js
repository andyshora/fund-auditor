export const createRequestPath = (key, parentPaths = []) => `${parentPaths.join('/')}/${key}`.replace(/^\//, '');
