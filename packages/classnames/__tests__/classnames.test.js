'use strict';

const classnames = require('..').default;

describe('@trz/classnames', () => {
    test('Function: classnames', () => {
        expect(classnames('cls1')).toBe('cls1');

        expect(classnames('cls1', 'cls2')).toBe('cls1 cls2');

        expect(classnames('cls1', {"cls2": true})).toBe('cls1 cls2');

        expect(classnames('cls1', {"cls2": false, "cls3": true})).toBe('cls1 cls3');

        expect(classnames('cls1', ["cls2", "cls3"])).toBe('cls1 cls2 cls3');

        expect(classnames('cls1', ["cls2", "cls3"], {"cls4": true})).toBe('cls1 cls2 cls3 cls4');

        expect(classnames('cls1', ["cls2", {"cls3": true}], {"cls4": true})).toBe('cls1 cls2 cls3 cls4');

        expect(classnames('cls1', ["cls2", {"cls3": true}], {"cls4": true})).toBe('cls1 cls2 cls3 cls4');

        expect(classnames('cls1', ["cls2", {"cls3": true, "cls2": true}, "cls1"], {"cls4": true, "cls3": true})).toBe('cls1 cls2 cls3 cls4');
    });
});
