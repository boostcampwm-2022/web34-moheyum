import type { NextRequest, NextFetchEvent } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest, event: NextFetchEvent) {
  const url = request.nextUrl.clone();
  const isLogin = true;

  if (!isLogin) {
    switch (url.pathname) {
      case 'post':
        return NextResponse.redirect(url);
      case '/':
        return NextResponse.redirect('/login');
      case '/announce':
        return NextResponse.redirect('/login');
      case '/myAccount':
        return NextResponse.redirect('/login');
      case '/search':
        return NextResponse.redirect('/login');
      case '/signup':
        return NextResponse.redirect('/login');
      case '/write':
        return NextResponse.redirect('/login');
    }
  }
}
