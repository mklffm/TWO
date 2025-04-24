import { getAssetFromKV } from '@cloudflare/kv-asset-handler';

addEventListener('fetch', event => {
  event.respondWith(handleEvent(event));
});

async function handleEvent(event) {
  try {
    // Try to get the asset from KV
    return await getAssetFromKV(event);
  } catch (e) {
    // If an error, serve the index page
    try {
      const indexPage = await getAssetFromKV(event, {
        mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/index.html`, req),
      });
      
      // Return the index page with a 200 status
      return new Response(indexPage.body, {
        ...indexPage,
        status: 200,
      });
    } catch (e) {
      return new Response('Not Found', { status: 404 });
    }
  }
} 