// src/middleware.ts
import type { MiddlewareHandler } from 'astro';

export const onRequest: MiddlewareHandler = async (context, next) => {
  const response = await next();
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://vercel.live https://analytics.vercel.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://gatorojolab.com; font-src 'self'; connect-src 'self' https://analytics.vercel.com; frame-src 'self'; object-src 'none'; base-uri 'self'; form-action 'self'; manifest-src 'self'; media-src 'self'; worker-src 'self'; child-src 'self';"
  );
  return response;
};