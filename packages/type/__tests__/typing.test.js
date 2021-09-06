'use strict';

const type = require('..');



describe('@trz/type', () => {
    test('Function: type.of', () => {
        expect(type.of([])).toBe('array');

        expect(type.of('this is a string')).toBe('string');

        expect(type.of(new Map)).toBe('map');
    });

    test('Function: type.is', () => {
        expect(type.is([], 'array')).toBe(true);
        expect(type.is([], 'object')).toBe(false);

        expect(type.is({}, 'object')).toBe(true);
        expect(type.is(new Object(), 'array')).toBe(false);

        expect(type.is('123456789', 'string')).toBe(true);
        expect(type.is('123456789', null)).toBe(false);
    });
});
