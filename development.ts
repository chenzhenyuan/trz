
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


// import Uri from './packages/uri';
// const uri = new Uri();
// console.log(uri);
// console.log(uri.stringify());

// const targetUri1 = '//www.google.com/search?q=%40babel%2Fpolyfill&oq=%40babel%2Fpolyfill&aqs=chrome..69i57j69i58j69i61.1641j0j4&sourceid=chrome&ie=UTF-8';
// console.log('Uri::', Uri.parse(targetUri1).toString());


import net, { Requests } from './packages/requests/src/requests';
console.log('net::', net);

const api = new Requests({
  host: '//127.0.0.2:8905',
  pathname: '///server_name/v1/1',
  retry: '.3.1',
  withUserAuth: 'include',
  headers: {
    'x-request-id': 'x'.repeat(32),
    'x-request-client': 'zzzzz',
    'authorization': '1111'
  }
});


console.log('api::', api);
net.get('//cjee.sdf.sss///demo/get_url', 'aa=111&bb=111');
api.get('demo/get_url');
