import type { RequestHandler } from '@builder.io/qwik-city';
import { container } from '~/lib/main.module';

export const guardAuthenticationHandler: RequestHandler = async ({ cookie, redirect, next }) => {
  const token = cookie.get('token');
  if (!cookie.has('token') || token?.value === '') {
    throw redirect(302, '/login');
  }

  const fetchInstance = container.resolve('fetcherInstance');
  fetchInstance.setToken(token?.value as string);
  try {
    await next();
  } catch (error: any) {
    console.log('error', error);
    if (error.cause.statusCode === 401) {
      // cookie.delete('token');
      throw redirect(302, '/login');
    }

    throw error;
  }
};
