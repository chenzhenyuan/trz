/*
 * @creator      : JAYNE·CHEN
 * @since        : 2021/10/20 12:38:12 +0800
 * @filePath     : /development/index.ts
 * @lastEditors  : JAYNE·CHEN
 * @updated      : 2022/01/19 15:03:38 +0800
 * @description  : 调试模块入口文件
 */


// import pathname from '@trz/util/lib/pathname';
// const targetUri = '../wordpress/2019/08/js-dom-mutation-observer/a';
// console.group(targetUri);
// console.log('path.normalize ::', pathname.normalize('.aaa//a/b//c/..'));
// console.log('path.basename()::', pathname.basename(targetUri, '.js'));
// console.log('path.join()    ::', pathname.join(targetUri, '../aaa', '../c', '../sss/'));
// console.log('path.extname() ::', pathname.extname(targetUri + '/filename.v1.extname'));
// console.log('path.parse()   ::', pathname.parse(targetUri));
// console.log('path.format()  ::', pathname.format(pathname.parse(targetUri)));
// console.log('path.resolve() ::', pathname.resolve('./bar', '../111', './baz'));
// console.groupEnd();

import "./@trz-type"



// import Uri, { SearchParams } from '@trz/uri';
// // console.log(new Uri());
// new Uri('//asdf@120.356.2.44///demo/pathname/filename.ext?searchKey=1&searchString=2#hashKey=1&hashString=2');

// console.log(new Uri('?sKey=值').searchParams + '');
// console.log(new Uri('./pathname'));
// console.log(new Uri('file:///pathname?sss=11'));
// console.log(new Uri('file:///pathname#sss=11'));
// console.log(new Uri('file:///pathname?sss=11#hhh=2222'));

// const querySearch = new SearchParams('?sss=111&sss=2222');
// querySearch.set('aa', 'aaa');
// querySearch.sort();
// console.log(querySearch, querySearch.toString());

// const hashString = new HashParams('#sss=111&sss=2222');
// hashString.set('aa', 'aaa');
// hashString.sort();
// console.log(hashString, hashString.toString());

// const uri = new Uri(location.href);

// console.log('before::', uri);
// console.log('before::', uri.host);
// uri.host = 123;
// console.log('after::', uri);
// console.log('after::', uri.host);
// uri.host = '789';
// console.log('after::', uri);
// console.log('after::', uri.host);


// const uri = new Uri('./prefix/user/', '../UserId');

// console.log(uri);
// uri.appendSearch('sss', {a: 1});
// uri.appendSearch({ 'mmm': '23412' });
// uri.appendSearch([[ 'a', 2 ], [ 'a', 3 ]]);

// // uri.appendSearch({ aa: 'aa' });
// console.log(decodeURIComponent(uri.searchParams + ''));
