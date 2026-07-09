import { projects } from '~/composables/useProjects.js'

const SITE_URL = 'https://luispalomares.com'

// Prerendered at build (see nitro.prerender.routes), so new projects land in
// the sitemap automatically — no hand-maintained XML.
export default defineEventHandler((event) => {
  const urls = [
    { loc: `${SITE_URL}/`, priority: '1.0' },
    ...projects.map((p) => ({ loc: `${SITE_URL}/project/${p.id}/`, priority: '0.8' })),
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <changefreq>monthly</changefreq>
    <priority>${u.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`

  setHeader(event, 'content-type', 'application/xml')
  return xml
})
