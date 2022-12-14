function getAbsoluteURL(url: string): string {
  if (url.match(/http[s]?:\/\/[\S]*/i)) return url;
  return `${process.env.NEXT_PUBLIC_API_URL}${url}`;
}

export interface ResponseType {
  success?: string;
  message: string;
  data: any;
  statusCode: number;
}

async function httpGet(url: string): Promise<ResponseType> {
  const absoluteURL = getAbsoluteURL(url);

  const response = await fetch(absoluteURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (response.status === 401) {
    const refresh = await fetch(getAbsoluteURL('/auth/refresh'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (refresh.status === 200) {
      const newResponse = await fetch(absoluteURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const result = await newResponse.json();
      if (!result.statusCode) result.statusCode = newResponse.status;
      return result;
    }
  }
  const result = await response.json();
  if (!result.statusCode) result.statusCode = response.status;
  return result;
}

async function httpPost(url: string, body: object): Promise<ResponseType> {
  const absoluteURL = getAbsoluteURL(url);

  const response = await fetch(absoluteURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  if (response.status === 401) {
    const refresh = await fetch(getAbsoluteURL('/auth/refresh'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (refresh.status === 200) {
      const newResponse = await fetch(absoluteURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      const result = await newResponse.json();
      if (!result.statusCode) result.statusCode = newResponse.status;
      return result;
    }
  }

  const result = await response.json();
  if (!result.statusCode) result.statusCode = response.status;
  return result;
}

async function httpPatch(url: string, body: object): Promise<ResponseType> {
  const absoluteURL = getAbsoluteURL(url);

  const response = await fetch(absoluteURL, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  if (response.status === 401) {
    const refresh = await fetch(getAbsoluteURL('/auth/refresh'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (refresh.status === 200) {
      const newResponse = await fetch(absoluteURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      const result = await newResponse.json();
      if (!result.statusCode) result.statusCode = newResponse.status;
      return result;
    }
  }

  const result = await response.json();
  if (!result.statusCode) result.statusCode = response.status;
  return result;
}

async function httpPut(url: string, body: object): Promise<ResponseType> {
  const absoluteURL = getAbsoluteURL(url);

  const response = await fetch(absoluteURL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(body),
  });

  if (response.status === 401) {
    const refresh = await fetch(getAbsoluteURL('/auth/refresh'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (refresh.status === 200) {
      const newResponse = await fetch(absoluteURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(body),
      });
      const result = await newResponse.json();
      if (!result.statusCode) result.statusCode = newResponse.status;
      return result;
    }
  }

  const result = await response.json();
  if (!result.statusCode) result.statusCode = response.status;
  return result;
}

async function httpDelete(url: string): Promise<ResponseType> {
  const absoluteURL = getAbsoluteURL(url);

  const response = await fetch(absoluteURL, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (response.status === 401) {
    const refresh = await fetch(getAbsoluteURL('/auth/refresh'), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (refresh.status === 200) {
      const newResponse = await fetch(absoluteURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });
      const result = await newResponse.json();
      if (!result.statusCode) result.statusCode = newResponse.status;
      return result;
    }
  }
  const result = await response.json();
  if (!result.statusCode) result.statusCode = response.status;
  return result;
}

export { httpGet, httpPost, httpPatch, httpPut, httpDelete };
