/*  $(document).ready(function() {
    tinymce.init({ selector:'textarea' });
  });
*/
  $.ajaxSetup({
    headers: { 
      'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') 
    }
  });

  //===================================

  
  /*
  tinymce.init({
    mode: "specific_textareas",
    editor_selector: "mceEditor",
    plugins: ['advlist autolink lists link image charmap print preview anchor textcolor', 
    'searchreplace visualblocks code fullscreen emoticons spellchecker',
    'insertdatetime media table contextmenu paste code help wordcount'],
    toolbar: 'insert | undo redo |  formatselect | fontselect | fontsizeselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | emoticons | help',
    content_css : "/css/app.css",
    theme_advanced_font_sizes: "10px,12px,13px,14px,16px,18px,20px",
    font_size_style_values : "10px,11px,12px,13px,14px,16px,18px,20px",
    //width : "90%",
    height: "536"
  });
*/
  //=================================
  //== Add a new article

  $(document).on('click', '.add-modal', function() {
    console.log('Add button clicked!');
    $('.modal-title').text('Create Article');
    $('#a_body').val('');
    $('#addModal').modal('show');
    $('#addModal input[0]').focus();
  });

  $(document).on('click', '.crud_add', function(e) {
    // console.log('Save button clicked!');
    e.preventDefault();
    $('#a_body').val(tinymce.activeEditor.getContent());
    $.ajax({
      url: 'api/article',
      method: 'POST',
      data: new FormData($('#addArticleForm')[0]),
      //dataType: 'json',
      cache: false,
      processData: false,
      contentType: false,
      success: function(res) {
        // console.log('Back from Ajax POST request');
        // console.log(res.responseJSON.message);
        $('.errorTitle').addClass('hidden');
        $('.errorContent').addClass('hidden');

        if ((res.errors)) {
          console.log('Error...');
          setTimeout(function () {
              $('#addModal').modal('show');
              toastr.error('Validation error!', 'Error Alert', {timeOut: 5000});
          }, 500);

          if (res.errors.title) {
              $('.errorTitle').removeClass('hidden');
              $('.errorTitle').text(res.errors.title);
          }
          if (res.errors.content) {
              $('.errorContent').removeClass('hidden');
              $('.errorContent').text(res.errors.content);
          }
        } else {
          // console.log('Success... Data: ');
          // console.log(res);
          var rData =
            '<tr>' +
            '<td align="center">' + res.data.id +
            '<td>' + res.data.title +
            '<td align="center">' + 
            "<button class='show-modal btn btn-info btn-xs' data-id='" + res.data.id + "' data-title='.' data-content='.'><i class='fa fa-eye ml-1'></i> Show></button>"+
            "<button class='edit-modal btn btn-warning btn-xs' data-id='" + res.data.id + "' data-title='.' data-content='.'><i class='fa fa-edit ml-1'></i> Edit</button>"+
            "<button class='delete-modal btn btn-danger btn-xs' data-id='" + res.data.id + "' data-title='.' data-content='.'><i class='fa fa-trash ml-1'></i> Delete</button>"+
            "</tr>";
          $("#articleTable").append(rData);
          toastr.success('Successfully added Article!', 'Success Alert', {timeOut: 5000});
        }
      },
    });
  });

  //=================================
  // Show an article

  $(document).on('click', '.show-modal', function() {
    console.log('Show button clicked!');
    $('.modal-title').text('Show Article - ' + $(this).data('id'));
    $('#s_id').val($(this).data('id'));
    //$('#s_title').val($(this).data('title'));
    var id = $('#s_id').val();
    //$('.s_body').html($(this).data('content'));
    //tinymce.activeEditor.setContent($(this).data('content'));
    //$('#showModal').modal('show');

    console.log('Sending Ajax Get request.');
    $.ajax({
      url: 'api/article/' + id,
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log('Back from Ajax GET request');
        $('.errorTitle').addClass('hidden');
        $('.errorContent').addClass('hidden');
        if ((res.errors)) {
          setTimeout(function () {
            $('#showModal').modal('show');
            toastr.error('Validation error!', 'Error Alert', {timeOut: 5000});
          }, 500);

          if (res.errors.title) {
            $('.errorTitle').removeClass('hidden');
            $('.errorTitle').text(res.errors.title);
          }
          if (res.errors.content) {
            $('.errorContent').removeClass('hidden');
            $('.errorContent').text(res.errors.content);
          }
        } else {
          //console.log('Success...');
          //console.log('Body: ', res.data.body);
          toastr.success('Successfully received article!', 'Success Alert', {timeOut: 5000});
          // $('#s_title').val(res.data.title);
          $('.modal-title').text(res.data.title);
          $('.s_body').html(res.data.body);
          $('#showModal').modal('show');
        }
      }
    });      
  });

  //=================================
  //== Edit an article

  $(document).on('click', '.edit-modal', function() {
    console.log('Edit button clicked!');
    $('.modal-title').text('Edit Article - '+$(this).data('id'));
    $('#e_id').val($(this).data('id'));
    //$('#e_title').val($(this).data('title'));
    var id = $('#e_id').val();
    //$('#e_body').html($(this).data('content'));
    //tinymce.activeEditor.setContent($(this).data('content'));
    //$('#editModal').modal('show');

    $.ajax({
      url: 'api/article/' + id,
      method: 'GET',
      dataType: 'json',
      success: function(res) {
        console.log('Back from Ajax GET request');
        $('.errorTitle').addClass('hidden');
        $('.errorContent').addClass('hidden');
        if ((res.errors)) {
          setTimeout(function () {
            $('#showModal').modal('show');
            toastr.error('Validation error!', 'Error Alert', {timeOut: 5000});
          }, 500);

          if (res.errors.title) {
            $('.errorTitle').removeClass('hidden');
            $('.errorTitle').text(res.errors.title);
          }
          if (res.errors.content) {
            $('.errorContent').removeClass('hidden');
            $('.errorContent').text(res.errors.content);
          }
        } else {
          console.log('Success...');
          console.log(res);
          toastr.success('Successfully received Article: ' + res.data.id, 'Success Alert', {timeOut: 3000});
          $('#e_title').val(res.data.title);
          tinymce.activeEditor.setContent(res.data.body);
          //$('.modal-title').text(res.data.title);
          $('#editModal').modal('show');
          $('#editModal input[0]').focus();
        }
      }
    });
  });

  // When 'Update' is clicked we send the edit data to the server
  // and also use it to update the row

  $(document).on('click', '.crud_update', function(e) {
    console.log('Update button clicked!');
    e.preventDefault();
    var id = $('#e_id').val();
    $('#e_body').val(tinymce.activeEditor.getContent());
    //-- Send edited data to the server to update the post
    console.log('Sending Ajax POST request.');
    $.ajax({
      url: 'api/article/' + id,
      method: 'POST',
      data: new FormData($('#editArticleForm')[0]),
      //dataType: 'json',
      cache: false,
      processData: false,
      contentType: false,
      success: function(res) {
        console.log('Back from Ajax POST request');
        console.log(res.responseJSON.message);
        $('.errorTitle').addClass('hidden');
        $('.errorContent').addClass('hidden');

        if ((res.errors)) {
          setTimeout(function () {
            $('#editModal').modal('show');
            toastr.error('Validation error!', 'Error Alert', {timeOut: 5000});
          }, 500);

          if (res.errors.title) {
              $('.errorTitle').removeClass('hidden');
              $('.errorTitle').text(res.errors.title);
          }
          if (res.errors.content) {
              $('.errorContent').removeClass('hidden');
              $('.errorContent').text(res.errors.content);
          }
        } else {
          // console.log('Success...');
          // console.log(res);
          toastr.success('Successfully updated Article: ' + res.data.id, 'Success Alert', {timeOut: 2000});
          //$("#articleTable").ajax.reload();
          //$('#articleTable').load(window.location + '#articleTable');

          /*var r = table.row( {selected: true} );
          r.data( {
            "id" : data.id,
            "title" : data.title,
            "action" : "<button class='show-modal btn btn-info btn-xs' data-id='" + data.id + "' data-title='.' data-content='.'><i class='fa fa-eye ml-1'></i> Show></button>"+
            "<button class='edit-modal btn btn-primary btn-xs' data-id='" + data.id + "' data-title='.' data-content='.'><i class='fa fa-pencil ml-1'></i> Edit</button>"+
            "<button class='delete-modal btn btn-danger btn-xs' data-id='" + data.id + "' data-title='.' data-content='.'><i class='fa fa-trash ml-1'></i> Delete</button>"
          } ).draw(false);*/
        }
      }
    });
  });
    
  //=================================
  // delete a post
/*
  $(document).on('click', '.delete-modal', function() {
      $('.modal-title').text('Delete');
      $('#id_delete').val($(this).data('id'));
      $('#title_delete').val($(this).data('title'));
      $('#deleteModal').modal('show');
      id = $('#id_delete').val();
  });
  $('.modal-footer').on('click', '.delete', function() {
      $.ajax({
          type: 'DELETE',
          url: 'posts/' + id,
          data: {
              '_token': $('input[name=_token]').val(),
          },
          success: function(data) {
              toastr.success('Successfully deleted Post!', 'Success Alert', {timeOut: 5000});
              $('.item' + data['id']).remove();
              $('.col1').each(function (index) {
                  $(this).html(index+1);
              });
          }
      });
  });
*/
