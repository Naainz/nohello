import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request }) => {
  try {
    // Attempt to retrieve the IP address from various headers or the socket
    const ip = request.headers.get('x-forwarded-for')
      || request.headers.get('cf-connecting-ip')
      || request.headers.get('x-real-ip')
      || (request.socket && request.socket.remoteAddress);

    if (!ip) {
      console.error('IP address not found');
      return new Response('IP address not found', { status: 400 });
    }

    const response = await fetch(`https://naai.nz/ip/index.php?ip=${ip}`);

    if (!response.ok) {
      console.error('Fetch failed with status:', response.status);
      return new Response('Failed to fetch IP data', { status: 500 });
    }

    const data = await response.json();

    if (!data || !data.country) {
      console.error('Invalid data received:', data);
      return new Response('Unable to determine country from IP', { status: 500 });
    }

    const countryLocaleMap: Record<string, string> = {
      'US': '/',
      'IT': 'it',
      'JP': 'jp',
      'KR': 'ko',
      'RU': 'ru',
      'CN': 'zh',
      'FR': 'fr',
      'ES': 'es',
      'GR': 'el',
      'DE': 'de',
      'AM': 'am',
    };

    const locale = countryLocaleMap[data.country] || '/';

    const url = new URL(request.url);
    const pathLocale = url.pathname.split('/')[1];

    const availableLocales = [
      '/', 'it', 'jp', 'ko', 'ru', 'zh', 'fr', 'es', 'el', 'de', 'am'
    ];

    if (!availableLocales.includes(pathLocale)) {
      const newUrl = `${url.origin}/${locale}/`;
      console.log(`Redirecting to ${newUrl} based on country ${data.country}`);
      return Response.redirect(newUrl, 302);
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response('Error processing request', { status: 500 });
  }
};
