<template>
  <article-detail :is-edit='false' :pageTitle="$route.query.pageTitle"></article-detail>
</template>

<script>
  import ArticleDetail from '../components/ArticleDetail'

  export default {
    name: 'operation-notice-add',
    components: {
      ArticleDetail
    }
  }

</script>
