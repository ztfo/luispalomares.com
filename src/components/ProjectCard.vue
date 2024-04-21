<template lang="pug">
router-link.link-block(v-if="project" :to="{ path: `/project/${project.id}` }")
    .card.project.mb-5(:style="{ backgroundImage: 'url(' + project.backgroundImage + ')' }")
        .has-text-centered(v-if="!project.backgroundImage")
            .dots
                span.dot1 &middot;
                span.dot2 &middot;
                span.dot3 &middot;
    .levels.card-description
        .level
            .level-left
                .is-size-6 {{ project.title }}
            .level-right
                img.logo(:src="project.logo", alt="Logo" :title="project.company")
</template>

<script>
export default {
    name: 'ProjectCardComponent',
    props: {
        project: Object,
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
    @media (max-width: 768px) {
        min-height: auto;
    }
    .no-signal {
        font-size: .8rem;
        font-weight: 700;
        color: (var(--medium-emphasis-text));
    }
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
.cell {
    display: flex;
    align-items: center;
    &.has-text-right {
        justify-content: flex-end;
    }
}
.card-description {
    margin-bottom: 5rem;
}
.logo {
    max-width: 150px;
}
</style>