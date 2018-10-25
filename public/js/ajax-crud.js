
    $.ajaxSetup({
      headers: { 
        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content') 
      } 
    });

    //=================================
    //== Add a new article

    $(document).on('click', '.add-modal', function() {
      $('.modal-title').text('Create Article');
      $('#addModal').modal('show');
      $('#addModal input[0]').focus();
    });
/*
    $('#addArticleForm').on('click', '.crud_add', function(e) {
      e.preventDefault();
      $('#a_post_body').val(tinymce.activeEditor.getContent());
      $.ajax({
            url: '/posts',
            method: 'POST',
            data: new FormData($('#addPostForm')[0]),
            //dataType: 'json',
            cache: false,
            processData: false,
            contentType: false,
            success: function(data) {
                //console.log('Back from Ajax POST request');
                //console.log(data.responseJSON.message);
                $('.errorTitle').addClass('hidden');
                $('.errorContent').addClass('hidden');

                if ((data.errors)) {
                    console.log('Error...');
                    setTimeout(function () {
                        $('#addModal').modal('show');
                        toastr.error('Validation error!', 'Error Alert', {timeOut: 5000});
                    }, 500);

                    if (data.errors.title) {
                        $('.errorTitle').removeClass('hidden');
                        $('.errorTitle').text(data.errors.title);
                    }
                    if (data.errors.content) {
                        $('.errorContent').removeClass('hidden');
                        $('.errorContent').text(data.errors.content);
                    }
                } else {
                    console.log('Success... Data: ');
                    console.log(data);
                    toastr.success('Successfully added Post!', 'Success Alert', {timeOut: 5000});
                    table.row.add( {
                        "id": data.id,
                        "cover_image": "<img style='width:50%' src='/storage/cover_images/" + data.cover_image + "'>",
                        "title": data.title,
                        "category": data.category,
                        "tag": data.tag,
                        "created_at": data.created_at,
                        "action" : "<button class='show-modal btn btn-info btn-xs' data-id='" + data.id + "' data-title='.' data-content='.'><i class='fa fa-eye ml-1'></i> Show></button>"+
                        "<button class='edit-modal btn btn-primary btn-xs' data-id='" + data.id + "' data-title='.' data-content='.'><i class='fa fa-pencil ml-1'></i> Edit</button>"+
                        "<button class='delete-modal btn btn-danger btn-xs' data-id='" + data.id + "' data-title='.' data-content='.'><i class='fa fa-trash ml-1'></i> Delete</button>"
                    } ).draw();
                }
            },
        });
    });
*/

    //=================================
    // Show an article

    $(document).on('click', '.show-modal', function() {
      console.log('Show button clicked!');
      $('.modal-title').text('Show Article - '+$(this).data('id'));
      $('#s_id').val($(this).data('id'));
      $('#s_title').val($(this).data('title'));
      var id = $('#id_show').val();
      $('#s_body').html($(this).data('content'));
      $('#showModal').modal('show');
    });

    //=================================
    //== Edit an article

    $(document).on('click', '.edit-modal', function() {
      console.log('Edit button clicked!');
      $('.modal-title').text('Edit Article - '+$(this).data('id'));
      $('#e_id').val($(this).data('id'));
      $('#e_title').val($(this).data('title'));
      var id = $('#id_edit').val();
      //$('#e_body').html($(this).data('content'));
      tinymce.activeEditor.setContent($(this).data('content'));
      $('#editModal').modal('show');
    });

    // When 'Update' is clicked we send the edit data to the server
    // and also use it to update the row
/*
    $('#editPostForm').on('click', '.crud_update', function(e) {
      e.preventDefault();
      var id = $('#e_id').val();
      $('#e_body').val(tinymce.activeEditor.getContent());
      //-- Send edited data to the server to update the post
      $.ajax({
        url: '/posts/' + id,
            method: 'POST',
            data: new FormData($('#editPostForm')[0]),
            //dataType: 'json',
            cache: false,
            processData: false,
            contentType: false,
            success: function(data) {
                //console.log(data.responseJSON.message);
                $('.errorTitle').addClass('hidden');
                $('.errorContent').addClass('hidden');

                if ((data.errors)) {
                    setTimeout(function () {
                        $('#editModal').modal('show');
                        toastr.error('Validation error!', 'Error Alert', {timeOut: 5000});
                    }, 500);

                    if (data.errors.title) {
                        $('.errorTitle').removeClass('hidden');
                        $('.errorTitle').text(data.errors.title);
                    }
                    if (data.errors.content) {
                        $('.errorContent').removeClass('hidden');
                        $('.errorContent').text(data.errors.content);
                    }
                } else {
                    console.log('Success...');
                    console.log(data);
                    toastr.success('Successfully updated Post: ' + data.id, 'Success Alert', {timeOut: 3000});

                    var r = table.row( {selected: true} );
                    r.data( {
                        "id" : data.id,
                        "cover_image" : "<img style='width:50%' src='/storage/cover_images/" + data.cover_image + "'>",
                        "title" : data.title,
                        "category" : data.category,
                        "tag" : data.tag,
                        "created_at" : data.created_at,
                        "action" : "<button class='show-modal btn btn-info btn-xs' data-id='" + data.id + "' data-title='.' data-content='.'><i class='fa fa-eye ml-1'></i> Show></button>"+
                        "<button class='edit-modal btn btn-primary btn-xs' data-id='" + data.id + "' data-title='.' data-content='.'><i class='fa fa-pencil ml-1'></i> Edit</button>"+
                        "<button class='delete-modal btn btn-danger btn-xs' data-id='" + data.id + "' data-title='.' data-content='.'><i class='fa fa-trash ml-1'></i> Delete</button>"
                    } ).draw(false);
                }
            }
        });
    });
*/    
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