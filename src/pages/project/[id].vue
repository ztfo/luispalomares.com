<template lang="pug">
.projects-detail-container
  ProjectDetail(:project="project")
</template>

<script setup>
import ProjectDetail from '@/components/ProjectDetail.vue'

const route = useRoute()
const { getProject } = useProjects()

const project = computed(() => getProject(route.params.id))

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found', fatal: true })
}

const siteUrl = 'https://luispalomares.com'
const p = project.value
const description =
  p.overview.length > 157 ? `${p.overview.slice(0, 157).trimEnd()}…` : p.overview
// A quest without a banner gets no share image rather than a broken one;
// undefined values are dropped from the rendered meta.
const ogImage = p.backgroundImage ? `${siteUrl}${p.backgroundImage}` : undefined
// Trailing slash matches how GitHub Pages serves directory indexes (the
// slash-less form 301s), keeping canonical/og URLs redirect-free.
const pageUrl = `${siteUrl}/project/${p.id}/`
const title = `${p.company} — ${p.title} | Luis Palomares`

useSeoMeta({
  title,
  description,
  ogTitle: `${p.company} — ${p.title}`,
  ogDescription: description,
  ogType: 'article',
  ogUrl: pageUrl,
  ogImage,
  ogImageAlt: ogImage && `${p.company} — ${p.title}`,
  ogSiteName: 'Luis Palomares',
  ogLocale: 'en_US',
  twitterCard: ogImage ? 'summary_large_image' : 'summary',
  twitterTitle: `${p.company} — ${p.title}`,
  twitterDescription: description,
  twitterImage: ogImage,
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
})
</script>
