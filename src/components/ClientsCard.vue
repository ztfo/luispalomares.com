<template lang="pug">
.client-card.card.p-6.has-text-centered
    .simple-divider.center
    .header.has-text-weight-bold I've been fortunate to work and drive impactful projects at some amazing companies.
    .clients-marquee
        .clients-track
            a.client-logo(
                v-for="logo in loop"
                :key="logo.key"
                :href="logo.url"
                :style="logo.style"
                :aria-label="logo.duplicate ? null : `${logo.name} — opens in a new tab`"
                :aria-hidden="logo.duplicate ? 'true' : null"
                :tabindex="logo.duplicate ? -1 : null"
                target="_blank"
                rel="noopener noreferrer"
                @click="trackLogoClick(logo)"
            )
</template>

<script>
import { trackExternalLink } from '@/utils/analytics';

// Every logo is one cell of /img/clients.png, a 872x256 sprite of all six
// white-on-transparent marks laid out in a grid. `rect` is [sx, sy, sw, sh] in
// sprite pixels, measured to the interior of each grid cell and then inset by
// 2px: the sprite draws a faint border around every cell, and at a fractional
// render scale a border one pixel outside the crop still bleeds in.
const SPRITE = { url: '/img/clients.png', width: 872, height: 256 };


const CLIENTS = [
    { name: 'Nova Credit', url: 'https://www.novacredit.com', rect: [163, 46, 156, 68] },
    { name: 'Homeward', url: 'https://www.homeward.com', rect: [340, 46, 191, 68] },
    { name: 'GivingData', url: 'https://www.givingdata.com', rect: [553, 46, 178, 68] },
    { name: 'Berkshire Hathaway HomeServices', url: 'https://www.bhhs.com', rect: [163, 135, 156, 75] },
    { name: 'NOVA Home Loans', url: 'https://www.novahomeloans.com', rect: [340, 135, 191, 75] },
    { name: 'Long Realty', url: 'https://www.longrealty.com', rect: [553, 135, 178, 75] },
];

// Scale the whole sprite so this crop stands `--logo-h` tall, then offset it so
// the crop's top-left sits at the element's origin. Everything is expressed as
// a ratio of that one variable, so the render height stays a single CSS knob
// (and can shrink at narrow widths) rather than a constant baked into markup.
const ratio = (n) => `calc(var(--logo-h) * ${+n.toFixed(4)})`;

const spriteStyle = ([sx, sy, sw, sh]) => ({
    width: ratio(sw / sh),
    height: 'var(--logo-h)',
    backgroundImage: `url('${SPRITE.url}')`,
    backgroundSize: `${ratio(SPRITE.width / sh)} ${ratio(SPRITE.height / sh)}`,
    backgroundPosition: `${ratio(-sx / sh)} ${ratio(-sy / sh)}`,
});

export default {
    name: 'ClientsCardComponent',
    computed: {
        // The track holds the list twice so translating it by -50% lands on a
        // frame identical to the start — that is what makes the loop seamless.
        // The second pass is decoration: hidden from the accessibility tree and
        // out of the tab order, so the loop doesn't double every logo for
        // keyboard and screen-reader users.
        loop() {
            return [false, true].flatMap((duplicate) =>
                CLIENTS.map((client) => ({
                    ...client,
                    duplicate,
                    key: `${client.name}-${duplicate ? 'dup' : 'orig'}`,
                    style: spriteStyle(client.rect),
                }))
            );
        },
    },
    methods: {
        trackLogoClick({ name, url, duplicate }) {
            trackExternalLink({
                url,
                label: `${name} Logo`,
                linkType: 'company_website',
                location: 'clients_section',
                additionalData: { company: name, from_duplicate: duplicate },
            });
        },
    },
};
</script>

<style scoped lang="scss">
@keyframes clients-scroll {
    from {
        transform: translateX(0);
    }
    to {
        transform: translateX(-50%);
    }
}

.client-card {
    display: flex;
    color: #FFF;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    box-shadow: none;
    border-radius: 0;
    border: none;
    // Holds the footprint the old static block occupied, now that the content
    // inside no longer sets the height.
    min-height: 15rem;
    // No outline and no fill: the block sits directly on the column's black,
    // drawn only by the copy and the logo strip.
    background: transparent;
    overflow: hidden;
}

.simple-divider.center {
    margin-top: 0;
}

.header {
    max-width: 34rem;
}

// Full-bleed inside the card's 3rem padding, so logos scroll edge to edge and
// dissolve at the boundary rather than clipping mid-mark.
.clients-marquee {
    // Render height of every mark; widths follow from each crop's aspect ratio.
    --logo-h: 110px;
    @media screen and (max-width: 768px) {
        --logo-h: 78px;
    }

    // Full width plus the card's 3rem padding on each side, then pulled back
    // out by that same amount: the strip spans the card edge to edge while the
    // header above it stays inside the padding.
    width: calc(100% + 6rem);
    margin: 2.25rem -3rem 0;
    overflow: hidden;
    // Not just an edge fade: the mask peaks at the centre and eases back on
    // both shoulders, so a mark brightens as it travels into the middle of the
    // strip and dims again on its way out.
    --clients-fade: linear-gradient(
        to right,
        transparent 0,
        rgba(0, 0, 0, 0.65) 18%,
        #000 50%,
        rgba(0, 0, 0, 0.65) 82%,
        transparent 100%
    );
    -webkit-mask-image: var(--clients-fade);
    mask-image: var(--clients-fade);

    &:hover .clients-track,
    &:focus-within .clients-track {
        animation-play-state: paused;
    }
}

.clients-track {
    display: flex;
    align-items: center;
    // Sized by content so the -50% translation is exactly one copy wide.
    width: max-content;
    animation: clients-scroll 45s linear infinite;
}

.client-logo {
    display: block;
    flex: none;
    margin-right: 3.5rem;
    background-repeat: no-repeat;
}
</style>
