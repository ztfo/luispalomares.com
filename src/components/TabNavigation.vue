<template lang="pug">
.tab-navigation
  .tabs.is-boxed.is-right
    ul
      li(:class="{ 'is-active': activeTab === 'main' }")
        a(role="button" tabindex="0" @click="setActiveTab('main')" @keydown.enter="setActiveTab('main')")
          span Main Quests
      li(:class="{ 'is-active': activeTab === 'side' }")
        a(role="button" tabindex="0" @click="setActiveTab('side')" @keydown.enter="setActiveTab('side')")
          span Side Quests
</template>

<script>
import { trackTabNavigation } from '@/utils/analytics';

export default {
  name: 'TabNavigationComponent',
  props: {
    activeTab: {
      type: String,
      default: 'main'
    }
  },
  emits: ['tab-changed'],
  methods: {
    setActiveTab(tab) {
      trackTabNavigation(this.activeTab, tab, 'projects_section');
      this.$emit('tab-changed', tab);
    }
  }
}
</script>

<style scoped lang="scss">
.tab-navigation {
  
  .tabs {
    
    ul {
      border-bottom: none;
      padding-bottom: 1px;
      
      li {
        a {
          color: var(--white);
          border: 1px solid var(--green);
          border-right: none;
          border-radius: 0;
          padding: 0.75rem 1.5rem;
          transition: all 0.3s ease;
          font-weight: 600;
          
          &:hover {
            color: var(--white);
            background-color: var(--thin-glass);
          }

          &:last-child {
            border-right: 1px solid var(--green);
          }
        }
        
        &.is-active {
          a {
            color: var(--white);
            background-color: var(--green);
          }
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
    .tabs li {
        width: 50%;
    }
}
</style>
