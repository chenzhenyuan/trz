'use strict';

const path = require('path');
const type = require(path.resolve(__dirname, '..')).default;



describe('@trz/type', () => {
    test('Function: type.of', () => {

        expect(type.of(123456789)).toBe('number');

        expect(type.of('this is a string')).toBe('string');

        expect(type.of([])).toBe('array');

        expect(type.of({})).toBe('object');

        expect(type.of(new Map())).toBe('map');

        expect(type.of(new Set())).toBe('set');

        expect(type.of(null)).toBe('null');

        expect(type.of(NaN)).toBe('number');

        expect(type.of(undefined)).toBe('undefined');

        expect(type.of(false)).toBe('boolean');
    });

    test('Function: type.is', () => {
        expect(type.is([], 'array')).toBe(true);
        expect(type.is([], 'object')).toBe(false);

        expect(type.is({}, 'object')).toBe(true);
        expect(type.is(new Object(), 'array')).toBe(false);

        expect(type.is('123456789', 'string')).toBe(true);
        expect(type.is('123123', 123123)).toBe(false);
    });

    test('Function: type.isString', () => {
        expect(type.isString([])).toBe(false);
        expect(type.isString('is a string')).toBe(true);
    });

    test('Function: type.isArray', () => {
        expect(type.isArray('is a string')).toBe(false);
        expect(type.isArray([])).toBe(true);
    });
});
