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
const ogImage = `${siteUrl}${p.backgroundImage}`
const pageUrl = `${siteUrl}/project/${p.id}`
const title = `${p.company} — ${p.title} | Luis Palomares`

useSeoMeta({
  title,
  description,
  ogTitle: `${p.company} — ${p.title}`,
  ogDescription: description,
  ogType: 'article',
  ogUrl: pageUrl,
  ogImage,
  ogImageAlt: `${p.company} — ${p.title}`,
  ogSiteName: 'Luis Palomares',
  ogLocale: 'en_US',
  twitterCard: 'summary_large_image',
  twitterTitle: `${p.company} — ${p.title}`,
  twitterDescription: description,
  twitterImage: ogImage,
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
})
</script>
