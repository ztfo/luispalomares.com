<template lang="pug">
.stat.box.p-5
    .level
        .level-left
            .level-item
                .icon.is-size-5(:style="{ borderColor: iconColor }")
                    font-awesome-icon(:icon="icon")
        .level-right
            .level-item
                .growth(:class="{ 'is-negative': isNegative, 'is-positive': !isNegative }") {{ growth }}
    .amount.is-size-3 {{ amount }}                
    .label.is-size-7.mt-2 {{ label }}
</template>

<script>
export default {
    name: 'StatComponent',
    props: {
        icon: {
            type: String,
            required: true
        },
        label: {
            type: String,
            required: true
        },
        amount: {
            type: String,
            required: true
        },
        growth: {
            type: String,
            required: true
        },
        iconColor: {
            type: String,
            required: false,
            default: '' 
        }
    },
    computed: {
        isNegative() {
            return parseFloat(this.growth) < 0;
        }
    }
};
</script>

<style scoped>
.stat {
    box-shadow: none;
    border-radius: 0; 
    background-color: var(--thin-glass);
}
.icon {
    width: 46px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    color: var(--white);
    border: 1px solid;
    background-color: var(--dark-glass);
}
.amount {
    font-weight: bold;
    color: var(--white);
}
.label {
    text-transform: uppercase;
    letter-spacing: 1px;
    color: var(--grey);
}
.growth {
    padding: 4px 6px;
    border: 1px solid var(--glass);
    line-height: 1;
    border-radius: 999px;
    font-size: .75rem;
    font-weight: bolder;
}
.is-negative {
    color: var(--red);
}
.is-positive {
    color: var(--green);
}
</style>