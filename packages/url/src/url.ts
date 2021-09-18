

class Url {
  constructor(urlString) {
    const rUrl = /((?:^((?:[a-z]+)\:)?\/\/)?(((?:\.?[a-z\-0-9]+)+)(?:\:(\d{1,5}))?))((?:\/+[^\/\?\#]+)+\/{0,})(\?[^#]{0,})?(\#[^#]{0,})$/gi;
    const [ href, oringin, protocol, host, hostname, port, pathname, search, hash ] = rUrl.exec(urlString) || [];
    const urlObj = { href, oringin, protocol, host, hostname, port, pathname, search, hash };

    Object.keys((urlObj)).forEach((name) => {
      this[ name ] = urlObj[ name ];
    })
  }
}


export default Url;
