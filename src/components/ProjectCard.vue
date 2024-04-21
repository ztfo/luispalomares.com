<template lang="pug">
router-link.link-block.mt-5(v-if="project" :to="{ path: `/project/${project.id}` }")
    //.card.project(:style="{ backgroundImage: 'url(' + backgroundImage + ')' }")
    .card.project.p-5 
        .has-text-centered
            .dots
                span.dot1 .
                span.dot2 .
                span.dot3 .
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
    border: 1px solid var(--glass);
    background: #000;
    box-shadow: none;
    border-radius: 2rem;
    min-height: 10rem;;
    font-size: 1rem;
    letter-spacing: 1px;
    text-transform: uppercase;
    color: var(--white);
    display: flex;
    align-items: center;
    justify-content: center;
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
    margin-bottom: 7rem;
}
.cell {
    display: flex;
    align-items: center;
    &.has-text-right {
        justify-content: flex-end;
    }
}
.project-logo {
    display: flex;
    justify-content: center;
}
.project-title {
    width: 100%;
}
</style>