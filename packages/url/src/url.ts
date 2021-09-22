
class Url {
  href: string = '';

  origin: string = '';

  protocol: string = '';

  host: string = '';

  hostname: string = '';

  port: string = '';

  pathname: string = '';

  search: string = '';

  hash: string = '';

  constructor(urlString?: string) {
    const rUrl = /((?:^((?:[a-z]+)\:)?\/\/)?(((?:\.?[a-z\-0-9]+)+)(?:\:(\d{1,5}))?))((?:\/+[^\/\?\#]+)+\/{0,})(\?[^#]{0,})?(\#[^#]{0,})?$/gi;
    const [ href, origin, protocol, host, hostname, port, pathname, search, hash ] = rUrl.exec(urlString) || [];
    const urlObj = { href, origin, protocol, host, hostname, port, pathname, search, hash };

    Object.keys((urlObj)).forEach((name) => {
      this[ name ] = urlObj[ name ] || '';
    });
  }

  toString() {
    return this.href;
  }
}


export default Url;
