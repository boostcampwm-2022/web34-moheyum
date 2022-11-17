class TokenStore {
  static instance: TokenStore | null = null;

  token: string = '';

  constructor() {
    // eslint-disable-next-line no-constructor-return
    if (TokenStore.instance) return TokenStore.instance;
    TokenStore.instance = this;
  }

  get() {
    return this.token;
  }

  set(newToken: string) {
    this.token = newToken;
  }
}

const store = new TokenStore();

async function httpGet(url: string): Promise<Response> {
  const token = store.get();
  let tokenHeader = '';
  if (token.length > 0) tokenHeader = `bearer ${token}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: tokenHeader,
    },
    credentials: 'include',
  });
  const result = await response.json();
  return result;
}

async function httpPost(url: string, body: object): Promise<any> {
  const token = store.get();
  let tokenHeader = '';
  if (token.length > 0) tokenHeader = `bearer ${token}`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: tokenHeader,
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  const result = await response.json();
  if (result.accessToken) store.set(result.accessToken);

  return result;
}

export { httpGet, httpPost };
