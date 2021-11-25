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




// import Uri, { HashParams, SearchParams, Serialize } from '@trz/uri/src/uri';
// // console.log(new Uri());
// new Uri('//asdf@120.356.2.44///demo/pathname/filename.ext?searchKey=1&searchString=2#hashKey=1&hashString=2');

// console.log(new Uri('?sKey=值'));
// console.log(new Uri('./pathname'));

// console.log('aa', (new Serialize('sKey=值')).values());


// new Uri('file:///pathname?sss=11');
// new Uri('file:///pathname#sss=11');
// const uri = new Uri('/ssss');
// const { hashParams } = uri;
// uri.hashParams.set('aa', 0);
// hashParams.delete('hashString');
// console.log(uri.stringify());

// const urlSearchParams = new URLSearchParams('aaa=111&ggg=2222');
// // urlSearchParams.sort();
// urlSearchParams.append('ggg', 'value');

// // urlSearchParams.forEach((value: string, key: string, parent: URLSearchParams) => {
// //   console.log(value, key);
// // });

// console.log(urlSearchParams.getAll('aaa'));

// console.log(urlSearchParams);

// const querySearch = new SearchParams('?sss=111&sss=2222');
// querySearch.set('aa', 'aaa');
// console.log(querySearch, querySearch.stringify());


// import requests, { Requests } from './packages/requests/src/requests';

// console.log('requests::', requests);

// requests.get('//cjee.sdf.sss///demo/get_url?sss=111&aa=222', 'aa=111&bb=111');

// const api = new Requests({
//   host: '//127.0.0.2:8905',
//   pathname: '/server_name/v1/1',
//   retry: '.3.1',
//   withUserAuth: 'include',
//   headers: {
//     'accept': 'text/fragment+html',
//     'x-request-id': 'x'.repeat(32),
//     'x-request-client': 'development/api',
//     'User-Agent': '--'
//   },
//   params: { aa: 'New_AAA' },
//   body: {}
// });

// console.log('api::', api);
// api.get('demo/get_url');

// api.post('post_ssss', new FormData(), {});

const m = new URLSearchParams('1=[]&1=2&3={}&4=false&6=sdfasdf&y=123zz&4=llll');
console.log('NNNN', m.set('4', '0000'));
console.log(decodeURIComponent(m.toString()));

import { Serialize } from '@trz/util/src/Serialize';
const serialize = new Serialize('a=2221=2&b=222&a1=11');
const aaa = new Serialize('x=123&y=123zz&v=1234');
console.log('serialize::', serialize.values());
console.log('aaa::', aaa.keys());
aaa.delete('x', 'v');

aaa.append('6', 'sdfasdf');
aaa.append('1', [ 111,22 ]);
aaa.append('3', new WeakMap());
aaa.append('1', []);
aaa.append('6', false);

aaa.set('1', 'ssss');
console.log('SDF', aaa.entries());

