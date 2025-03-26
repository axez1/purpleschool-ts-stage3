class RequestBuilder {
  private _method: 'GET' | 'POST' = 'GET';
  private _url: string = '';
  private _headers: Record<string, string> = {};
  private _body: any = null;

  get(): this {
    this._method = 'GET';
    return this;
  }

  post(): this {
    this._method = 'POST';
    return this;
  }

  setUrl(path: string): this {
    this._url = path;
    return this;
  }

  setHeader(key: string, value: string): this {
    this._headers[key] = value;
    return this;
  }

  setBody(data: any): this {
    if (this._method !== 'POST') {
      throw new Error('Body can only be set for POST requests');
    }
    this._body = data;
    return this;
  }

  async exec(): Promise<Response> {
    if (!this._url) {
      throw new Error('URL is required');
    }

    const options: RequestInit = {
      method: this._method,
      headers: this._headers,
    };

    if (this._method === 'POST' && this._body) {
      options.body = JSON.stringify(this._body);
      if (!this._headers['Content-Type']) {
        this._headers['Content-Type'] = 'application/json';
      }
    }

    return fetch(this._url, options);
  }
}

const apiBuilder = new RequestBuilder();

apiBuilder
  .get()
  .setUrl('https://api.example.com/users')
  .setHeader('Authorization', 'Bearer token')
  .exec()
  .then((response) => response.json())
  .then((data) => console.log(data));

apiBuilder
  .post()
  .setUrl('https://api.example.com/users')
  .setBody({ name: 'John' })
  .exec()
  .then((response) => response.json());
