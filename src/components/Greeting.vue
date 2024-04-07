<template lang="pug">
.greeting.p-6
    .level
        .level-left
            article.media.level-item
                figure.media-left
                    p.image.is-64x64
                        .is-rounded
                .media-content
                    .content
                        p
                            strong Hello Luis! 👋
                        span We hope you are having a great day!
        .level-right
            .level-item
                .field.is-grouped
                    p.control
                        button.button.is-secondary Download Report
                    p.control
                        button.button.is-primary Transfer Funds

</template>

<script>
export default {
    name: 'GreetingComponent',
    data() {
        return {

        };
    },
    methods: {

    },
    computed: {

    },
    props: {

    },
    components: {

    },
};
</script>

<style scoped>

</style>