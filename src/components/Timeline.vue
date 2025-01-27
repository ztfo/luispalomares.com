<template lang="pug">
.timeline
    .timeline-start-marker
    .timeline-item.is-first
        .timeline-marker
        .timeline-content zero
    .timeline-item
        .timeline-marker 
        .timeline-content one
    .timeline-item
        .timeline-marker 
        .timeline-content two
    .timeline-item.is-last
        .timeline-marker
        .timeline-content three
</template>

<script>
export default {
    name: 'TimelineComponent',
}
</script>

<style scoped lang="scss">
.timeline { 
    padding-left: 3rem;
    position: relative;
    &::before {
    content: "";
        display: block;
        width: 1px;
        height: 100%;
        position: absolute;
        top: 2rem;
        left: 5px;
        background-color: var(--lightblue);
        opacity: .5;
    }
}
.timeline-start-marker {
    width: 11px;
    height: 11px;
    background-color: var(--lightblue);
    border-radius: 999px;
    position: absolute;
    top: 2rem;
    left: 0;

    &::before,
    &::after {
        content: "";
        width: 100%;
        height: 100%;
        border-radius: 999px;
        position: absolute;
        top: 0;
        left: 0;
        background-color: transparent;
        border: 1px solid var(--lightblue);
        opacity: .5;
        animation: pulse 3s ease infinite;
    }

    &::before {
        animation-delay: 1.5s;
    }
}
.timeline-item {
    position: relative;
    padding: 1.5rem;
    border: 1px solid var(--glass);
    margin: 1.5rem 0;

    .timeline-marker {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 10px 10px 10px 0;
        border-color: transparent var(--thin-glass) transparent transparent;
        position: absolute;
        top: 50%;
        left: -11px;
        transform: translateY(-50%);
    }

    .timeline-content {
        padding-right: 20px;
    }
}
@keyframes pulse {
    0% {
        transform: scale(1.5);
        opacity: 1;
    }
    50% {
        transform: scale(2.5);
        opacity: .5;
    }
    100% {
        transform: scale(3.5);
        opacity: 0;
    }
}
</style>