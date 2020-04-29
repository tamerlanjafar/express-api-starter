export const toCamelCase = text => text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, match => match[1].toUpperCase());

export const toSnakeCase = text =>
    text
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map(t => t.toLowerCase())
        .join('_');

export const convertObjectToSnakeCase = object => {
    Object.keys(object).forEach(key => {
        const value = object[key];
        delete object[key];
        object[toSnakeCase(key)] = value;
    });

    return object;
};

export const convertToSnakeCase = data => {
    if (Array.isArray(data)) {
        return data.map(object => convertObjectToSnakeCase(object));
    }

    return convertObjectToSnakeCase(data);
};
