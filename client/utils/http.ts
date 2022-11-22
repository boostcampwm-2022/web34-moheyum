function getAbsoluteURL(url: string): string {
  if (url.match(/http[s]?:\/\/[\S]*/i)) return url;
  return `${process.env.NEXT_PUBLIC_API_URL}${url}`;
}

async function httpGet(url: string): Promise<Response> {
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

async function httpPost(url: string, body: object): Promise<any> {
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

export { httpGet, httpPost };
