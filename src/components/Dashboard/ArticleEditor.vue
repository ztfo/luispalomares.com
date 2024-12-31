<template lang="pug">
.article-editor.p-6
  .level
    .level-left
      .level-item
        h1.has-text-white.accent-line Articles
    .level-right
      .level-item
        button.button.is-primary(@click="createNewArticle")
          font-awesome-icon(icon="plus")
          span.ml-2 New Article
  
  .columns
    .column.is-3
      .panel
        .panel-block(v-for="article in articles" :key="article.id" 
          :class="{ 'is-active': selectedArticle?.id === article.id }"
          @click="selectArticle(article)")
          .article-item
            p.title.is-6 {{ article.title }}
            p.subtitle.is-7 {{ formatDate(article.dateCreated) }}
    
    .column.is-9
      .editor-container(v-if="selectedArticle")
        .field
          label.label Title
          .control
            input.input(
              v-model="selectedArticle.title" 
              placeholder="Article Title"
            )
        .field
          label.label Content
          .control
            textarea.textarea(
              v-model="selectedArticle.content" 
              rows="20"
              placeholder="Article content..."
            )
        .field.is-grouped.mt-4
          .control
            button.button.is-primary(@click="saveArticle") Save
          .control
            button.button.is-danger(@click="deleteArticle") Delete
      .empty-state(v-else)
        p.has-text-centered Select an article or create a new one
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

export default {
  name: 'ArticleEditor',
  setup() {
    const store = useStore();
    const selectedArticle = ref(null);

    const loadArticles = async () => {
      await store.dispatch('loadArticles');
    };

    const articles = computed(() => store.state.articles);

    const selectArticle = async (article) => {
      try {
        const response = await fetch(`/articles/${article.id}.md`);
        const content = await response.text();
        selectedArticle.value = { 
          ...article,
          content 
        };
      } catch (error) {
        console.error('Failed to load article content:', error);
      }
    };

    const createNewArticle = () => {
      selectedArticle.value = {
        id: Date.now().toString(),
        title: 'New Article',
        content: '',
        dateCreated: new Date().toISOString()
      };
    };

    const saveArticle = async () => {
      // This will be implemented with GitHub API
      console.log('Saving article:', selectedArticle.value);
    };

    const deleteArticle = async () => {
      if (!confirm('Are you sure you want to delete this article?')) return;
      // This will be implemented with GitHub API
      console.log('Deleting article:', selectedArticle.value);
    };

    const formatDate = (date) => {
      return new Date(date).toLocaleDateString();
    };

    onMounted(loadArticles);

    return {
      articles,
      selectedArticle,
      createNewArticle,
      selectArticle,
      saveArticle,
      deleteArticle,
      formatDate
    };
  }
};
</script>

<style lang="scss" scoped>
.article-editor {
  min-height: calc(100vh - 80px);
}

.panel {
  background: var(--thin-glass);
  
  .panel-block {
    border-color: var(--glass);
    color: var(--white);
    cursor: pointer;
    padding: 1rem;
    
    &.is-active {
      background: var(--lightblue);
    }

    &:hover {
      background: var(--glass);
    }
  }
}

.editor-container {
  background: var(--thin-glass);
  padding: 1.5rem;
  border-radius: 4px;
  
  .label {
    color: var(--white);
  }
  
  .input, .textarea {
    background: var(--black);
    color: var(--white);
    border-color: var(--glass);

    &:focus {
      border-color: var(--lightblue);
    }
  }
}

.empty-state {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--medium-emphasis-text);
}

.accent-line {
  position: relative;
  &:after {
    content: '';
    position: absolute;
    bottom: -0.5rem;
    left: 0;
    width: 2rem;
    height: 1px;
    background: linear-gradient(var(--green), var(--lightblue));
  }
}
</style> 