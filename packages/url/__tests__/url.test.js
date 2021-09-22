'use strict';

const path = require('path');
const Url = require(path.resolve(__dirname, '..')).default;


const exampleUrl  = 'https://www.google.com:443/search?q=%E9%98%BF%E6%96%AF%E8%92%82%E8%8A%AC&newwindow=1#sxsrf=AOaemvK8dYw-Gh3OqCY84scQmwkrcg2oBQ%3A1631845261685&ei=jftDYbanKcnA0PEP9L-s-As&oq=%E9%98%BF%E6%96%AF%E8%92%82%E8%8A%AC&gs_lcp=Cgdnd3Mtd2l6EAM6BwgjELADECc6BwgAEEcQsAM6BAgAEEM6BQgAEIAESgQIQRgAUIaGsDlY-omwOWDJkLA5aANwAngAgAHiA4gBug-SAQcyLTEuMi4ymAEAoAEByAEEwAEB?sclient=gws-wiz&ved=0ahUKEwj2oZqp-YTzAhVJIDQIHfQfC78Q4dUDCA4&uact=5'


describe('@trz/type', () => {
    const url = new Url(exampleUrl);

    test('@@', () => {
        console.log(url);

        // expect(type.is([], 'array')).toBe(true);
    });
});
