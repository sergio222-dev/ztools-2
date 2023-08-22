import type { RequestHandler } from '@builder.io/qwik-city';
import { guardAuthenticationHandler } from '~/middleware/guardAuthenticationHandler';

export const onGet: RequestHandler = guardAuthenticationHandler;
