interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

class ProductAPI {
  private readonly baseUrl: string = 'https://dummyjson.com/products';

  async getProduct(id: number): Promise<Product> {
    const response = await fetch(`${this.baseUrl}/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json() as Promise<Product>;
  }
}

class ProductProxy {
  private api: ProductAPI;
  private maxAllowedId: number = 10;

  constructor() {
    this.api = new ProductAPI();
  }

  async getProduct(id: number): Promise<Product | { error: string }> {
    if (id > this.maxAllowedId) {
      console.warn(
        `Blocked request for ID ${id} (max allowed: ${this.maxAllowedId})`
      );
      return { error: `ID ${id} is not allowed` };
    }

    try {
      return await this.api.getProduct(id);
    } catch (error) {
      console.error(
        'Proxy error:',
        error instanceof Error ? error.message : 'Unknown error'
      );
      return {
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}

class RequestBuilder {
  private _method: 'GET' | 'POST' = 'GET';
  private _url: string = '';
  private _headers: Record<string, string> = {};

  get(): this {
    this._method = 'GET';
    return this;
  }

  url(path: string): this {
    this._url = path;
    return this;
  }

  header(key: string, value: string): this {
    this._headers[key] = value;
    return this;
  }

  async exec<T = any>(): Promise<T> {
    const response = await fetch(this._url, {
      method: this._method,
      headers: this._headers,
    });
    return response.json() as Promise<T>;
  }
}

async function demo() {
  const proxy = new ProductProxy();

  const validProduct = await proxy.getProduct(1);
  console.log('Valid product:', validProduct);

  const invalidProduct = await proxy.getProduct(15);
  console.log('Invalid product:', invalidProduct);

  const builder = new RequestBuilder();
  const builtRequest = await builder
    .get()
    .url('https://dummyjson.com/products/3')
    .header('Accept', 'application/json')
    .exec<Product>();

  console.log('Built request result:', builtRequest);
}

demo().catch(console.error);
