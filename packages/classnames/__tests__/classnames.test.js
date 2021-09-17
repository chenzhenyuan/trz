'use strict';
const path = require('path');

const classnames = require(path.resolve(__dirname, '..')).default;

describe('@trz/classnames', () => {

    test('api: classnames(classname: string): string', () => {
        expect(classnames('class1')).toBe('class1');
        expect(classnames('class1 class2')).toBe('class1 class2');
        expect(classnames('class1 class2 class2')).toBe('class1 class2');
        expect(classnames('class1 class2 class3')).toBe('class1 class2 class3');
        expect(classnames('   class1   class2    class3   ')).toBe('class1 class2 class3');
    });

    test('api: classnames(classname: object): string', () => {
        expect(classnames({"cls1": true})).toBe('cls1');
        expect(classnames({"cls1": false})).toBe('');

        const DYNAMIC_KEY = String(Date.now());
        expect(classnames({[DYNAMIC_KEY]: true})).toBe(DYNAMIC_KEY);
    });

    test('api: classnames(classname: array): string', () => {
        expect(classnames(['class1', 'class2'])).toBe('class1 class2');
        expect(classnames(['class1', {"class2": true, "class1": false}])).toBe('class1 class2');
        expect(classnames(['class1', ['class1', 'class2', 'class3']])).toBe('class1 class2 class3');
    });

    test('api: classnames(classname: sring | object | array, [classname2: object | sring | array, [classname3: array | object | sring, [...]]]): string', () => {
        expect(classnames("class1", {"class2": true}, ['class3'])).toBe('class1 class2 class3');
        expect(classnames({"class2": true}, "class1", ['class3'])).toBe('class2 class1 class3');
        expect(classnames({"class2": true}, ['class3'], "class1")).toBe('class2 class3 class1');
        expect(classnames(['class3'], {"class2": true}, "class1")).toBe('class3 class2 class1');
        expect(classnames('class1', ["class2", {"class3": true, "class2": true}, "class1"], {"cls4": true, "class3": true})).toBe('class1 class2 class3 cls4');
    });
});
