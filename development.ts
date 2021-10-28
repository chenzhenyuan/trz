
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


// import Uri from './packages/uri/src/index';
// const targetUri1 = '//www.google.com/search?q=%40babel%2Fpolyfill&oq=%40babel%2Fpolyfill&aqs=chrome..69i57j69i58j69i61.1641j0j4&sourceid=chrome&ie=UTF-8';
// console.log('Uri::', Uri.parse(targetUri1).toString());


import net, { Network } from '@trz/fetch';

// api.GET("/api/v1/biz/user/<int:userId>/children", { userId: 123, token: "*******************" })
// net.GET('/api', "a=1&b=2");

const api = new Network({
  domain: 'http://0.0.0.0:8905',
  pathname: '/static',
});

// console.log('api::', api);
// net.GET('https://aaaa', { skey: 1 });
api.GET('/mock.json', { aaa: 111 }).then((res) => {
  console.log('biz', res);
});

api.GET('/lerna.jsonc', { headers: {}}).then((res) => {
  console.log('lerna.json', res);
});



