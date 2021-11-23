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




// import Uri, { HashParams, SearchParams } from '@trz/uri';
// // console.log(new Uri());
// new Uri('//asdf@120.356.2.44///demo/pathname/filename.ext?searchKey=1&searchString=2#hashKey=1&hashString=2');
// console.log(new Uri('.'));
// console.log(new Uri('./pathname'));
// new Uri('file:///pathname?sss=11');
// new Uri('file:///pathname#sss=11');
// const uri = new Uri('/ssss');
// const { hashParams } = uri;
// uri.hashParams.set('aa', 0);
// hashParams.delete('hashString');
// console.log(uri.stringify());
// const queryParams = new HashParams('#sss=111&sss=2222');
// console.log(queryParams);


import requests, { Requests } from './packages/requests/src/requests';

console.log('requests::', requests);

requests.get('//cjee.sdf.sss///demo/get_url?sss=111&aa=222', 'aa=111&bb=111');

const api = new Requests({
  host: '//127.0.0.2:8905',
  pathname: '/server_name/v1/1',
  retry: '.3.1',
  withUserAuth: 'include',
  headers: {
    'accept': 'text/fragment+html',
    'x-request-id': 'x'.repeat(32),
    'x-request-client': 'development/api',
    'User-Agent': '--'
  },
  params: { aa: 'New_AAA' },
  body: {}
});

console.log('api::', api);
// api.get('demo/get_url');

// api.post('post_ssss', new FormData(), {});
