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




import Uri, { HashParams, SearchParams } from '@trz/uri/src/uri';
// // console.log(new Uri());
// new Uri('//asdf@120.356.2.44///demo/pathname/filename.ext?searchKey=1&searchString=2#hashKey=1&hashString=2');

// console.log(new Uri('?sKey=值').searchParams + '');
// console.log(new Uri('./pathname'));
// console.log(new Uri('file:///pathname?sss=11'));
// console.log(new Uri('file:///pathname#sss=11'));
// console.log(new Uri('file:///pathname?sss=11#hhh=2222'));

const querySearch = new SearchParams('?sss=111&sss=2222');
querySearch.set('aa', 'aaa');
querySearch.sort();
console.log(querySearch, querySearch.toString());

const hashString = new HashParams('#sss=111&sss=2222');
hashString.set('aa', 'aaa');
hashString.sort();
console.log(hashString, hashString.toString());

const uri = new Uri(location.href);

uri.hashParams.set('aa', 111);
uri.hashParams.append('bb', 111);
uri.hashParams.delete('aa');
console.log('' + uri.searchParams);

uri.searchParams.set('aa', { a: 123 });

console.log(uri);

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


