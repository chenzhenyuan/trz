/*
 * @creator      : JAYNE·CHEN
 * @since        : 2022/01/19 16:08:52 +0800
 * @filePath     : /development/uri.ts
 * @lastEditors  : JAYNE·CHEN
 * @updated      : 2022/01/19 16:43:10 +0800
 */


import Uri, { SearchParams, HashParams } from '../packages/uri/src/uri';
console.log(new Uri());

// new Uri('//asdf@120.356.2.44///demo/pathname/filename.ext?searchKey=1&searchString=2#hashKey=1&hashString=2');
console.log("new Uri('?sKey=值')::", new Uri('?sKey=值').searchParams + '');
console.log("new Uri('./pathname')::", new Uri('./pathname').toString());
console.log("new Uri(\'file:///pathname?sss=11\')::", new Uri('file:///pathname?sss=11') + '');

const searchParams = new SearchParams('?sss=111&sss=2222');
searchParams.set('aa', 'aaa');
searchParams.sort();
console.log("new SearchParams('?sss=111&sss=2222')::", searchParams.toString());

const hashString = new HashParams('sss=111&sss=2222');
hashString.set('aa', 'aaa');
hashString.sort();
console.log("new HashParams('sss=111&sss=2222')::", hashString.toString());

const uri = new Uri(location.href);
console.log('new Uri(location.href)::', uri + '');
console.log('(new Uri(location.href)).host::', uri.host);

uri.host = '123';
console.log('uri.host = 123::', uri.host);

uri.host = 'asdfs.sss.com';
console.log("uri.host = 'asdfs.sss.com'::", uri.host);

console.log('----');
const uri2 = new Uri('./prefix/user/', '../UserId');
uri2.appendSearch('null');
uri2.appendSearch('sss', {a: 1});
uri2.appendSearch({ 'mmm': '123' });
uri2.appendSearch([[ 'a', 2 ], [ 'a', 3 ]]);
console.log(decodeURIComponent(uri2 + ''));

uri2.appendSearch({ aa: 'aa' });
console.log(decodeURIComponent(uri2.searchParams + ''));
