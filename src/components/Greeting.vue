<template lang="pug">
.greeting.p-6
    .level
        .level-left
            article.media.level-item
                figure.media-left
                    p.image.is-64x64
                        img.is-rounded(:src="imageUrl")
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

</style>