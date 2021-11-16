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

// console.log(new Uri());
new Uri('//asdf@120.356.2.44///demo/pathname/filename.ext?searchKey=1&searchString=2#hashKey=1&hashString=2');
// console.log(new Uri('.'));
// console.log(new Uri('./pathname'));
new Uri('file:///pathname?sss=11');
new Uri('file:///pathname#sss=11');

const uri = new Uri();
const { hashParams } = uri;

hashParams.set('aa', 0);
hashParams.set('bb', {aa: 111});
hashParams.set('bb', {aa: 222});
hashParams.set('cc', [ 1, 2, 3 ]);

hashParams.delete('hashString');

console.log(uri.stringify());


const queryParams = new HashParams('#sss=111&sss=2222');
console.log(queryParams);


// import net, { Requests } from './packages/requests/src/requests';
// console.log('net::', net);

// const api = new Requests({
//   host: '//127.0.0.2:8905',
//   pathname: '///server_name/v1/1',
//   retry: '.3.1',
//   withUserAuth: 'include',
//   headers: {
//     'x-request-id': 'x'.repeat(32),
//     'x-request-client': 'zzzzz',
//     'authorization': '1111'
//   }
// });

// console.log('api::', api);

// net.get('//cjee.sdf.sss///demo/get_url?sss=111', 'aa=111&bb=111');
// api.get('demo/get_url');

// api.post('post_ssss', new FormData(), {});
