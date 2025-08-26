<template lang="pug">
.tab-navigation
  .tabs.is-boxed.is-right
    ul
      li(:class="{ 'is-active': activeTab === 'main' }")
        a(@click="setActiveTab('main')") 
          span Main Quests
      li(:class="{ 'is-active': activeTab === 'side' }")
        a(@click="setActiveTab('side')") 
          span Side Quests
</template>

<script>
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
  
  .icon {
    font-size: 0.9rem;
  }
}
@media screen and (max-width: 768px) {
    .tabs li {
        width: 50%;
    }
}
</style>
