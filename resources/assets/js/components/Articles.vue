<template>
  <div id="app" class="container-fluid">
    <div id="editor" class="mt-2">
      <form @submit.prevent="saveArticle" class="mb-2">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Title" v-model="article.title">
        </div>
        <div class="form-group">
          <textarea class="form-control" rows="4" cols="100" placeholder="Body" v-model="article.body"></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-xs">Save</button>
      </form>
    </div>
    <h3>Articles</h3>
    <div>
      <table id="articleTable" class="table table-hover table-bordered" width="100%">
        <thead  class="blue-grey lighten-4">
          <tr class="text-center">
            <th class="text-center">ID</th>
            <th>Title</th>
            <th class="text-center" width="190px">
              <button @click="newArticle()" class="add-modal btn btn-success btn-xs">
                <i class="fa fa-plus ml-1"></i> New Article
              </button>
            </th>
          </tr>
        </thead>
        <tbody v-for="article in articles" :key="article.id">
          <tr style="padding: 2px; font-size:1em; margin-bottom:1px;">
            <td class="text-center">{{ article.id }}</td>
            <td>{{ article.title }}</td>
            <td>
              <button @click="showArticle(article)" class="btn btn-info btn-xs"><i class="fa fa-eye ml-1"></i> Show</button>
              <button @click="editArticle(article)" class="btn btn-warning btn-xs"><i class="fa fa-pencil ml-1"></i> Edit</button>
              <button @click="deleteArticle(article.id)" class="btn btn-danger btn-xs"><i class="fa fa-trash ml-1"></i> Delete</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div style='clear:both'>
        <span class="pull-left">
        <p>Showing {{pagination.from}} to {{pagination.to}} of {{pagination.total}} articles</p>
        </span>
        <span class="pull-right">
          <nav aria-label="Page navigation">
            <ul class="pagination navbar-right">
            <li class="page-item" :class="[{disabled: !pagination.prev_page_url}]">
                <a href="#" class="page-link first" @click="fetchArticles(pagination.first_page_url)"><i class="fa fa-angle-double-left"></i></a>
            </li>
            <li class="page-item" :class="[{disabled: !pagination.prev_page_url}]">
                <a href="#" class="page-link previous round" @click="fetchArticles(pagination.prev_page_url)"><i class="fa fa-angle-left"></i></a>
            </li>
            <li class="page-item disabled"><a href="#" class="page-link text-dark">Page {{ pagination.current_page }} of {{ pagination.last_page }}</a></li>
            <li class="page-item" :class="[{disabled: !pagination.next_page_url}]">
                <a href="#" class="page-link next" @click="fetchArticles(pagination.next_page_url)"><i class="fa fa-angle-right"></i></a>
            </li>
            <li class="page-item" :class="[{disabled: !pagination.next_page_url}]">
                <a href="#" class="page-link last" @click="fetchArticles(pagination.last_page_url)"><i class="fa fa-angle-double-right"></i></a>
            </li>
            </ul>
          </nav>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  //$(document).ready( function () {
  //    var table = $('#articleTable').DataTable({
  //    });
  //});

  export default {
    data() {
      return {
        articles: [],
        article: {
          id: '',
          title: '',
          body: ''
        },
        article_id: '',
        pagination: {},
        edit: false
      }
    },
    created() {
      this.fetchArticles();
    },
    methods: {
      fetchArticles(page_url) {
        let vm = this;
        page_url = page_url || '/api/articles';
        fetch(page_url)
          .then(res => res.json())
          .then(res => {
            this.articles = res.data;
            vm.makePagination(res.meta, res.links);
          })
        .catch(err => console.log(err));
      },
      makePagination(meta, links) {
        let pagination = {
          current_page: meta.current_page,
          first_page: meta.first_page,
          last_page: meta.last_page,
          from: meta.from,
          to: meta.to,
          total: meta.total,
          next_page_url: links.next,
          prev_page_url: links.prev,
          last_page_url: links.last
        }
        this.pagination = pagination;
      },
      deleteArticle(id) {
        if(confirm('Are you sure?')) {
          fetch(`api/article/${id}`, {
            method: 'delete'
          })
          .then(res => res.json())
          .then(data => {
            alert('Article removed.');
            this.fetchArticles();
          })
          .catch(err => console.log(err));
        }
      },
      saveArticle() {
        if(this.edit === false) {
          // Add
          fetch('api/article', {
            method: 'POST',
            body: JSON.stringify(this.article),
            headers: {
                'content-type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(data => {
            this.article.title = '';
            this.article.body = '';
            alert('Article added');
            this.fetchArticles();
          })
        } else {
          // Update
          fetch('api/article', {
            method: 'PUT',
            body: JSON.stringify(this.article),
            headers: {
                'content-type': 'application/json'
            }
          })
          .then(res => res.json())
          .then(data => {
            this.article.title = '';
            this.article.body = '';
            alert('Article updated');
            this.fetchArticles();
          })
        }
      },
      editArticle(article) {
        this.edit = true;
        this.article.id = article.id;
        this.article.article_id = article.id;
        this.article.title = article.title;
        this.article.body = article.body;
      },
      showArticle(article) {
        this.edit = false;
        this.article.id = article.id;
        this.article.article_id = article.id;
        this.article.title = article.title;
        this.article.body = article.body;
      },
      newArticle(article) {
        this.edit = false;
        this.article.id = '';
        this.article.article_id = '';
        this.article.title = '';
        this.article.body = '';
      }
    },
    created () {
      this.fetchArticles();
    }
  };
</script>

