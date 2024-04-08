<template lang="pug">
.greeting.pt-6.px-6.pb-0
    .level.pb-6
        .level-left
            article.media.level-item.has-aligned-center
                figure.media-left
                    p.image.is-96x96
                        img.is-rounded(:src="imageUrl")
                .media-content
                    .content
                        .greeting-text.is-size-4 Hello, Luis! 👋
                        span.has-text-white Get that paper.
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
            imageUrl: 'https://media.licdn.com/dms/image/C5603AQExCh7BU77PlA/profile-displayphoto-shrink_800_800/0/1652627048072?e=1718236800&v=beta&t=QP66LQ3ahJUSj-43F-igIeB0cBoRJGV8RLz063o5jK4'
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
.greeting .level {
    border-bottom: 1px solid rgba(255,255,255,0.1);
}
.greeting-text{
    font-weight: bold;
    color: #FFF;;
}
.has-aligned-center{
    align-items: center;
}
</style>