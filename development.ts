
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

import net, { Requests } from './packages/requests';
console.log('net::', net);

const api = new Requests({
  host: '//api.cn',
  pathname: '///server_name/v1/1',
  retry: '.3.1',
  headers: {
    'x-request-id': 'xxxx-xxxxx-xxxx-xxxxx'
  }
});


console.log('api::', api);
api.get('url');

// console.log(new Network({ headers: {}, host: './aaa' }));
// net.post('/api', {});
// net.get('https://aaaa.sss.ss', { skey: 1 });

// console.log(net);
// net.get('/static/mock.json', {
//   queryString: 'a=1&b=2',
//   host: '//example.com/ssss',
//   headers: {
//     headers: { 'x-request-id': 'sssssss' }
//   }
// });

// const api = new Network({
//   host: '//1.0.0.0:8905/',
//   pathname: '/static/',
//   timeout: 5.005,
//   retry: 3,
//   withUserAuth: true,
//   retryDelay: 300,
//   headers: {
//     'Ac': 'ssss',
//     'x-request-id': '111111'
//   }
// });

// console.log(api);

// api.post('///mock.json', {
//   queryString: 'a=1&b=2',
//   // host: '//chenzhenyuan.localhost:8905/',
//   headers: {
//     'x-request-ids': [ '222222', '333333' ]
//   }
// }).then((res) => {
//   console.log('example', res);
// }).catch((err) => {
//   console.error(err);
// });

// api.get('/lerna.error', { timeout: 15,  headers: {}}).then((res) => {
//   console.log('lerna.json', res);
// });
