<template>
  <article-detail :is-edit='true' :pageTitle="$route.query.pageTitle"></article-detail>
</template>

<script>
  import ArticleDetail from '../components/ArticleDetail'

  export default {
    name: 'operation-notice-edit',
    components: {
      ArticleDetail
    }
  }

</script>
