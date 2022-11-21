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

  const result = await response.json();
  if (!result.statusCode) result.statusCode = response.status;
  return result;
}

export { httpGet, httpPost };
