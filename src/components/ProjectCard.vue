<template lang="pug">
NuxtLink.link-block(v-if="project" :to="`/project/${project.id}`" @click="handleClick")
    .card.project.mb-5(:style="project.backgroundImage ? { backgroundImage: 'url(' + project.backgroundImage + ')' } : null")
        .has-text-centered(v-if="!project.backgroundImage")
            .dots
                span.dot1 &middot;
                span.dot2 &middot;
                span.dot3 &middot;
    .levels.card-description
        .level(:class="{ 'is-side': isSide }")
            .level-left
                img.logo.is-hidden-desktop.mb-4(v-if="project.logo" :class="{ 'is-emblem': isSide }" :src="project.logo", :alt="`${project.company} logo`" :title="project.company")
                span.wordmark.is-hidden-desktop.mb-4(v-else) {{ project.company }}
                div
                    .is-size-6
                        span {{ project.title }}
                    p.card-headline.is-size-7(v-if="project.headline") {{ project.headline }}
            .level-right.is-hidden-mobile
                img.logo(v-if="project.logo" :class="{ 'is-emblem': isSide }" :src="project.logo", :alt="`${project.company} logo`" :title="project.company")
                span.wordmark(v-else) {{ project.company }}
</template>

<script>
import { trackProjectEvent } from '@/utils/analytics';

export default {
    name: 'ProjectCardComponent',
    props: {
        project: Object,
    },
    computed: {
        isSide() {
            return this.project?.projectType === 'side';
        },
    },
    methods: {
        handleClick() {
            trackProjectEvent('project_click', this.project, {
                click_location: 'project_card',
                event_label: this.project.title
            });
        },
    },
}
</script>

<style scoped lang="scss">
@keyframes dot {
    0%, 20% { opacity: 0; }
    50% { opacity: 1; }
    100% { opacity: 0; }
}

.dot1 { animation: dot 1s infinite; }
.dot2 { animation: dot 1s 0.33s infinite; }
.dot3 { animation: dot 1s 0.66s infinite; }

.card.project {
    position: relative;
    overflow: hidden;
    .dots {
        font-size: 2rem;
    }
    .dot1, .dot2, .dot3 {
        background: -webkit-linear-gradient(var(--green), var(--lightblue));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
}

.card {
    border: none;
    background: #000;
    box-shadow: none;
    border-radius: 0px;
    min-height: 16rem;
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;
    background-repeat: no-repeat;
    // Centred at every width: banners are composed around their middle, and
    // a top-left anchor crops whatever sits on the right edge.
    background-position: center;
}
.link-block {
    display: block;
    text-decoration: none;
    color: inherit;
    transition: .5s;
    .project {
        transition: .5s;
    }
    &:hover {
        .project {
            transform: scale(1.02);
        }
    }
}
.card-description {
    margin-bottom: 5rem;
    // Bulma's level halves never shrink, so a long title pushes the logo out
    // of the column; let the text side wrap instead.
    .level-left {
        flex-shrink: 1;
        min-width: 0;
    }
    .level-right {
        margin-left: 1.5rem;
    }
}
// Side quests top-align the emblem with the title, so it lands in the same spot
// whether the title runs one line or two.
.card-description .level.is-side {
    align-items: flex-start;
    // Below desktop the emblem sits above the title; a full-width column lets it
    // reach the right edge even when the title is short (llü).
    @media screen and (max-width: 1023px) {
        .level-left {
            width: 100%;
        }
        // A text-only name (Archipelago) lines up on the right like the emblems.
        .wordmark.is-hidden-desktop {
            display: block;
            width: fit-content;
            margin-left: auto;
        }
    }
}
.card-headline {
    margin-top: 0.35rem;
    color: var(--green);
    font-weight: 600;
}
// The height cap is for square marks (llü): wordmarks hit the width first,
// so a 44px-square logo lands at Arreglo's mark height instead of 150px.
.logo {
    max-width: 150px;
    max-height: 52px;
}
// Side quests: every square emblem is drawn on the same 44-unit grid and sits at the
// right end of its lockup, so one height makes them all the same size, and right
// alignment lines them up in the same spot on every card.
.logo.is-emblem {
    height: 44px;
    width: auto;
    max-width: none;
    max-height: none;
    &.is-hidden-desktop {
        display: block;
        margin-left: auto;
    }
}
</style>