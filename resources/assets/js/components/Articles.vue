<template>
  <div id="app" class="container-fluid" style="width:100%">
    <!--div id="editor" class="mt-2">
      <form @submit.prevent="saveArticle" class="mb-2">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Title" v-model="article.title">
        </div>
        <div class="form-group">
          <textarea class="form-control" rows="4" cols="100" placeholder="Body" v-model="article.body"></textarea>
        </div>
        <button type="submit" class="btn btn-primary btn-xs">Save</button>
      </form>
    </div-->
    <div class="col-md-12">
      <div class="panel panel-default panel-table">

        <!-- Panel header -->
        <div class="panel-heading">
          <!--div class="row"-->
            <!-- div class="col-md-6>"-->
              <h3 class="panel-title">Articles</h3>
            <!--/div-->
          <!--/div-->
        </div>

        <!-- Panel body -->
        <!--div class="panel-body"-->
          <table id="articleTable" class="display table-hover table-bordered .table-condensed">
            <thead  class="blue-grey lighten-4">
              <tr align="center">
                <th width="5%">ID</th>
                <th>Title</th>
                <th width=100>Created</th>
                <th width="188px">
                  <button @click="newArticle()" class="add-modal btn btn-success btn-xs">
                    <i class="fa fa-plus ml-1"></i> New Article
                  </button>
                </th>
              </tr>
            </thead>
            <!-- Table body -->
            <tbody id="tBody" v-for="article in articles" :key="article.id">
              <tr>
                <td align="center">{{ article.id }}</td>
                <td>{{ article.title }}</td>
                <td align="center">{{ article.created_at.date.substring(0,10) }}</td>
                <td style="padding: 2px; 6px;">
                  <!--button @click="showArticle(article)" class="btn btn-info btn-xs"><i class="fa fa-eye ml-1"></i> Show</button-->
                  <button class="show-modal btn btn-info btn-xs" 
                    :data-id = 'article.id' data-title = "" data-content = "">
                    <i class="fa fa-eye ml-1"></i> Show
                  </button>
                  <!--button @click="editArticle(article)" class="btn btn-warning btn-xs"><i class="fa fa-pencil ml-1"></i> Edit</button-->
                  <button class="edit-modal btn btn-warning btn-xs" 
                    :data-id = 'article.id' data-title = "" data-content = "">
                    <i class="fa fa-edit ml-1"></i> Edit</button>
                  <button @click="deleteArticle(article.id)" class="btn btn-danger btn-xs"><i class="fa fa-trash ml-1"></i> Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        <!--/div-->
        <!-- Panel footer -->
        <div class="panel-footer">
          <div class="row col-md-12">
            <div class="col col-md-4">
              Showing # {{pagination.from}} - {{pagination.to}} of {{pagination.total}} articles
            </div>
            <!-- Pagination -->
            <div class="col-md-8 row pull-right">
              <nav aria-label="Page navigation">
                <ul class="pagination pull-right">
                  <li class="page-item" :class="[{disabled: !pagination.prev_page_url}]">
                    <a href="#" class="page-link first" @click="fetchArticles(pagination.first_page_url)"><i class="glyphicon glyphicon-fast-backward"></i></a>
                  </li>
                  <li class="page-item" :class="[{disabled: !pagination.prev_page_url}]">
                    <a href="#" class="page-link previous round" @click="fetchArticles(pagination.prev_page_url)"><i class="glyphicon glyphicon-step-backward"></i></a>
                  </li>

                  <li class="page-item disabled"><a href="#" class="page-link text-dark">Page {{ pagination.current_page }} of {{ pagination.last_page }}</a></li>

                  <li class="page-item" :class="[{disabled: !pagination.next_page_url}]">
                    <a href="#" class="page-link next" @click="fetchArticles(pagination.next_page_url)"><i class="glyphicon glyphicon-step-forward"></i></a>
                  </li>
                  <li class="page-item" :class="[{disabled: !pagination.next_page_url}]">
                    <a href="#" class="page-link last" @click="fetchArticles(pagination.last_page_url)"><i class="glyphicon glyphicon-fast-forward"></i></a>
                  </li>
                </ul>
              </nav>
            </div>

          </div>
        </div>
      </div>
    </div>

    <!-- Add Article Modal -->
    <div id="addModal" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-xl modal-notify modal-success" role="document">
        <div class="modal-content">
          <!-- Modal header -->
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Edit this Article</h4>
            <span id="a_id" type="text" hidden></span>
          </div>
          <!-- Modal body -->
          <div class="modal-body container-fluid">
            <form id="addArticleForm" class="form-horizontal addArticle" role="form">
              <!-- Article Title -->
              <div class="form-group">
                <div class="col-md-12">
                  <label class="control-label" for="title">Title</label>
                  <input id="a_title" type="text" name="title" class="form-control" data-error="Please enter title." required autofocus/>            
                </div>
              </div>
              <!-- Article Body -->
              <div class="form-group">
                <div class="col-md-12">
                  <label class="control-label" for="body">Body</label>
                  <textarea id="a_body" name="body" rows="15" cols="100" class="form-control mceEditor"></textarea>
                  <p class="errorContent text-center alert alert-danger hidden"></p>
                  <div class="help-block with-errors"></div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-warning btn-xs" data-dismiss="modal">Cancel</button>
            <button type="button" class="crud_add btn btn-success btn-xs" data-dismiss="modal"><i class="fa fa-plus ml-1"></i> Save Article</button>
          </div>
        </div>
      </div>
    </div>

    <!-- showModal -->
    <div id="showModal" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-xl modal-notify modal-success" role="document">
        <div class="modal-content">
          <!-- Modal header -->
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Edit this Article</h4>
            <span id="s_id" type="text" hidden></span>
          </div>
          <!-- Modal body -->
          <div class="modal-body container-fluid">
            <form id="showArticleForm" class="form-horizontal" role="form">
              <!-- Article Title -->
              <div class="form-group">
                <!--div class="col-md-12">
                  <label class="control-label" for="title">Title</label>
                  <input id="s_title" type="text" name="title_show" class="form-control" data-error="Please enter title." required autofocus/>            
                </div-->
              </div>
              <!-- Article Body -->
              <div class="form-group">
                <div class="col-md-12 s_body">
                  <label class="control-label" for="body">Body</label>
                  <textarea id="s_body" name="body" rows="20" cols="100" class="form-control" disabled></textarea>
                  <p class="errorContent text-center alert alert-danger hidden"></p>
                  <div class="help-block with-errors"></div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-warning btn-xs" data-dismiss="modal">
              <i class="fa fa-times ml-1"></i> Done
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Edit Modal -->
    <div id="editModal" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-dialog-centered modal-xl modal-notify modal-success" role="document">
        <div class="modal-content">
          <!-- Modal header -->
          <div class="modal-header container-fluid">
            <!--div class="row"-->
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Edit Article</h4>
            <!--button type="button" class="btn btn-warning btn-xs" data-dismiss="modal">Cancel</button>
            </div-->
            <span id="e_id" name="article_id" type="text" hidden></span>
          </div>
          <!-- Modal body -->
          <div class="modal-body container-fluid">
            <form id="editArticleForm" class="form-horizontal" role="form">
              <!-- Article Title -->
              <div class="form-group">
                <div class="col-md-12">
                  <label class="control-label" for="title">Title</label>
                  <input id="e_title" type="text" name="title" class="form-control" data-error="Please enter title." required autofocus/>
                </div>
              </div>
              <!-- Article Body -->
              <div class="form-group">
                <div class="col-md-12">
                  <label class="control-label" for="body">Body</label>
                  <textarea id="e_body" name="body" rows="20" cols="100" class="form-control mceEditor"></textarea>
                  <p class="errorContent text-center alert alert-danger hidden"></p>
                  <div class="help-block with-errors"></div>
                </div>
              </div>
            </form>  
          </div>
          <input type="hidden" name="_method" value="PUT"/>
          <div class="modal-footer">
            <button type="button" class="btn btn-warning btn-xs" data-dismiss="modal">Cancel</button>
            <button type="button" class="crud_update btn btn-success btn-xs" data-dismiss="modal"><i class="fa fa-plus ml-1"></i> Update Article</button>
          </div>
        </div>
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
        .catch(err => console.log('Error: ', err))
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
          .catch(err => console.log('Error: ', err));
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
    }
  };
</script>

<style scoped>

/* Modal styling */

.modal-dialog{
    overflow-y: initial !important
}

.modal-body{
    height: 800px;
    overflow-y: auto;
}

/* Panel styling */

.panel-table .col {
  height: 40px;
}

.panel-heading {
  height: 40px;
  background-color: grey;
}

.panel-heading .col h3 {
 line-height: 30px;
 height: 30px;
}

.panel-title {
  color: white;
  font-size: 1.5em;
}

.panel-footer {
  height: 42px;
  line-height: 42px;
  font-size: 1.2em;
  color: white;
  background-color: grey;
  padding: 0; 
}

.panel-footer > div {
  display: inline-block;
}

.panel-footer > li {
  display: inline-block;
}

.panel-table .panel-footer .pagination {
  margin: 0;
}

.panel-table .panel-body .table-bordered {
  border-style: none;
  margin:0;
}

.row > div {
  display: inline-block;
}

/* Table styling */

table {
  width:100%;
}

table th {
  color: white;
  background-color: #3b3b91;
  text-align: center;
  padding: 4px 2px;
  font-size: 1em;
}

table td {
  padding: 1px 2px;
}

table#t01 tr:nth-child(even) {
  background-color: #eee;
}

table#t01 tr:nth-child(odd) {
  background-color: #fff;
}

</style>

