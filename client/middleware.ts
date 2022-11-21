import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { httpGet } from './utils/http';

let isLoggedin = false;

// TODO : 인증이 필요한 페이지 url list를 만들어 체크하도록 변경
// middleware 자체의 내용이 인증이 필요한 페이지에서만 작동하도록 리팩토링이 필요합니다.

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (!isLoggedin) {
    await httpGet('/auth/refresh');
  }
  if (request.cookies.get('r_t')) isLoggedin = true;
  else isLoggedin = false;
  // console.log(`logged in = ${isLoggedin}`);

  if (!isLoggedin) {
    switch (url.pathname) {
      case 'post':
        return Promise.resolve(NextResponse.redirect(url));
      case '/':
        return Promise.resolve(NextResponse.redirect(new URL('/login', request.url)));
      case '/announce':
        return Promise.resolve(NextResponse.redirect(new URL('/login', request.url)));
      case '/myAccount':
        return Promise.resolve(NextResponse.redirect(new URL('/login', request.url)));
      case '/search':
        return Promise.resolve(NextResponse.redirect(new URL('/login', request.url)));
      case '/write':
        return Promise.resolve(NextResponse.redirect(new URL('/login', request.url)));
      default:
        break;
    }
  }
  return Promise.resolve();
}
