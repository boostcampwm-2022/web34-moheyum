import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

let isLoggedin = false;

// TODO : 인증이 필요한 페이지 url list를 만들어 체크하도록 변경
// middleware 자체의 내용이 인증이 필요한 페이지에서만 작동하도록 리팩토링이 필요합니다.

const AUTH_NEEDED = ['/', '/announce', '/myaccount', '/search', '/write'];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  if (AUTH_NEEDED.includes(url.pathname.toLowerCase())) {
    let cookies = '';
    request.cookies.getAll().forEach((c) => {
      cookies += `${c.name}=${c.value}; `;
    });
    if (!isLoggedin) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
        credentials: 'include',
        method: 'GET',
        headers: {
          Cookie: cookies,
        },
      });
      const a = response.headers.get('set-cookie');

      if (a) request.headers.set('set-cookie', a);
    }
    if (request.cookies.get('r_t')) isLoggedin = true;
    else isLoggedin = false;

    if (!isLoggedin) return Promise.resolve(NextResponse.redirect(new URL('/login', request.url)));
  }

  return Promise.resolve();
}
