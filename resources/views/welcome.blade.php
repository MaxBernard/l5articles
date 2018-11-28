<!doctype html>
<html lang="{{ app()->getLocale() }}">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script>window.Laravel = { csrfToken: '{{ csrf_token() }}' }</script>

    <title>L5Articles</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <!--link href="{{ asset('css/font-awesome.min.css') }}" rel="stylesheet"-->
    <link href="{{ asset('css/fontawesome-5.4.2/css/all.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/bootstrap.min.css')}}" rel="stylesheet">
	<!--link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous"-->
    <!--link href="css/jquery.dataTables.min.css" rel="stylesheet"-->
    <!--link href="css/datatables.bootstrap.min.css" rel="stylesheet"-->
    <link href="css/style.css" rel="stylesheet">
    <link href="css/toastr.min.css" rel="stylesheet" type="text/css">

    <!-- Scripts -->
    <script src="js/jquery-3.3.1.min.js"></script>
    <!--script src="js/bootstrap.min.js"></script-->
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
    <!--script src="js/datatables.min.js"></script-->
    <!--script src="js/jquery.datatables.min.js"></script-->
    <script src="{{ asset('js/app.js') }}" defer></script>
	  <script src="{{ asset('js/toastr.min.js') }}"></script>

    <!--script src="../../node_modules/@ckeditor/ckeditor5-build-classic/build/ckeditor.js"></script>
    <script src="../../node_modules/@ckeditor/ckeditor5-vue/dist/ckeditor.js"></script-->

    <!-- TinyMCE -->
    <script src="{{ asset('js/tinymce/js/tinymce/tinymce.min.js') }}"></script>
    <!--script language="javascript" type="text/javascript">
      tinymce.init({
        //mode: "specific_textareas",
        //editor_selector: "mceEditor",
        plugins: ['advlist autolink lists link image charmap print preview anchor textcolor', 'searchreplace visualblocks code fullscreen emoticons spellchecker', 'insertdatetime media table contextmenu paste code help wordcount'],
        toolbar: 'insert | undo redo | formatselect | fontselect | fontsizeselect | bold italic forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | emoticons | help',
        content_css : "/css/app.css",
        theme_advanced_font_sizes: "10px,12px,13px,14px,16px,18px,20px",
        font_size_style_values : "10px,11px,12px,13px,14px,16px,18px,20px",
        //width : "90%",
        height: "536"
      });
    </script-->

    <script src="{{ asset('js/ajax-crud.js') }}" defer></script>

  </head>
  <body>

    <noscript>
      <strong>We're sorry but this app doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
    </noscript>

    <!--div class="container-fluid"-->
      <!--div class="row"-->
        <!--h1>Welcome</h1-->
        <!--div class="col-md-12"-->
          <div id="app"></div>
        <!--/div-->
      <!--/div-->
    <!--/div-->
    <!--script src="{{ mix('js/app.js') }}"></script-->

  </body>
</html>
