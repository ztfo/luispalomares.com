<template lang="pug">
.projects-container
  SquareWave
  .header-section.flex.center-items.rise(style="--rise-index: 4")
    h2.is-size-5.mb-0.flex-1
      strong {{ activeTab === 'main' ? 'Main Quests' : 'Side Quests' }}
    TabNavigation.flex-3(:activeTab="activeTab" @tab-changed="handleTabChange")
  .projects
    ProjectCard(
      v-for="project in projects"
      v-show="project.projectType === activeTab"
      :key="project.id"
      :project="project"
      :class="{ rise: intro }"
      :style="{ '--rise-index': introIndex(project) }"
    )
    ClientsCard(
      v-show="activeTab === 'main'"
      :class="{ rise: intro }"
      :style="{ '--rise-index': clientsIndex }"
    )
</template>

<script setup>
import SquareWave from '@/components/Visuals/SquareWave.vue'
import TabNavigation from '@/components/TabNavigation.vue'
import ProjectCard from '@/components/ProjectCard.vue'
import ClientsCard from '@/components/ClientsCard.vue'

// Render every project so all /project/:id links exist in the prerendered
// HTML (crawlable); the tab just toggles visibility client-side via v-show.
const { projects } = useProjects()

const activeTab = ref('main')

// Cards are v-show-filtered, and display:none -> visible restarts a CSS
// animation, so a tab switch would replay the cascade. A switch can only happen
// after mount, so dropping the class there ends the intro exactly when it stops
// being wanted — no timer to keep in sync with the delays or the duration.
const intro = ref(true)

function handleTabChange(tab) {
  activeTab.value = tab
  intro.value = false
}

// Cards share the left panel's ordinal scale. They start at 6, alongside the
// footer rather than after it, so the two columns land together.
// Rank is within a card's own tab group, not its v-for position — otherwise a
// side quest sitting between two main quests leaves gaps in the visible cascade.
// `projects` is a module constant, so this runs once, not per render.
const CARDS_START = 6
const cardIndex = {}
const perType = {}

for (const p of projects) {
  perType[p.projectType] = perType[p.projectType] ?? 0
  cardIndex[p.id] = CARDS_START + perType[p.projectType]++
}

const introIndex = (project) => cardIndex[project.id]
const clientsIndex = CARDS_START + (perType.main ?? 0)

const siteUrl = 'https://luispalomares.com'
const description =
  'Luis Palomares is a mission-driven product leader, designer, and founder based in Austin. Product at CertifID, co-founder of InHouse, and builder of AI tools like Arreglo.ai.'
const ogImage = `${siteUrl}/img/certifid.jpg`

useSeoMeta({
  title: 'Luis Palomares — Product Leader, Designer & Founder in Austin',
  description,
  ogTitle: 'Luis Palomares — Product Leader, Designer & Founder',
  ogDescription: description,
  ogType: 'website',
  ogUrl: siteUrl,
  ogImage,
  ogImageAlt: 'Luis Palomares — Product Leader, Designer & Founder',
  ogSiteName: 'Luis Palomares',
  ogLocale: 'en_US',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Luis Palomares — Product Leader, Designer & Founder',
  twitterDescription: description,
  twitterImage: ogImage,
})

useHead({
  link: [{ rel: 'canonical', href: siteUrl }],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Luis Palomares',
        url: siteUrl,
        image: ogImage,
        jobTitle: 'Product Leader',
        description:
          'Mission-driven product leader, designer, and founder who builds with design, code, and AI.',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Austin',
          addressRegion: 'TX',
          addressCountry: 'US',
        },
        knowsAbout: ['Product Design', 'Product Management', 'Software Development', 'Startups', 'AI'],
        worksFor: {
          '@type': 'Organization',
          name: 'CertifID',
          url: 'https://certifid.com',
        },
        sameAs: [
          'https://www.linkedin.com/in/luis-palomares/',
          'https://github.com/ztfo',
          'https://dribbble.com/luispalomares',
          'https://7thst.music',
        ],
      }),
    },
  ],
})
</script>

<style scoped lang="scss">
.header-section {
  border-bottom: 1px solid var(--glass);
  padding-bottom: 1rem;

  h2,
  h2 strong {
    color: var(--white);
    margin-bottom: 0;
  }
}
.projects-container {
    height: 100%;
}
.projects {
    height: calc(100vh - 11rem);
    overflow: scroll;
    @media screen and (max-width: 768px) {
        height: auto;
    }
}

@media screen and (max-width: 768px) {
    .header-section {
        display: block;
    }

    .header-section .tabs  {
        margin-top: 1rem;
    }
}
</style>
