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
    <link href="{{ asset('css/font-awesome.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/bootstrap.min.css')}}" rel="stylesheet">
    <!--link href="css/jquery.dataTables.min.css" rel="stylesheet"-->
    <!--link href="css/datatables.bootstrap.min.css" rel="stylesheet"-->
    <link href="css/style.css" rel="stylesheet">
    <link href="css/toastr.min.css" rel="stylesheet" type="text/css">

    <!-- Scripts -->
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <!--script src="https://cloud.tinymce.com/stable/tinymce.min.js"></script-->
    </script>    
    <!--script src="js/datatables.min.js"></script-->
    <!--script src="js/jquery.datatables.min.js"></script-->
    <script src="{{ asset('js/app.js') }}" defer></script>
    <script src="{{ asset('js/ajax-crud.js') }}" defer></script>
	  <script src="{{ asset('js/toastr.min.js') }}"></script>

    <!-- TinyMCE -->
    <script src="{{ asset('/js/tinymce/js/tinymce/tinymce.min.js') }}"></script>
    <script language="javascript" type="text/javascript">
      tinymce.init({
          mode: "specific_textareas",
          editor_selector: "mceEditor",
          plugins: ['advlist autolink lists link image charmap print preview anchor textcolor', 
          'searchreplace visualblocks code fullscreen emoticons spellchecker',
          'insertdatetime media table contextmenu paste code help wordcount'],
          toolbar: 'insert | undo redo |  formatselect | fontselect | fontsizeselect | bold italic backcolor  | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | emoticons | help',
          content_css : "/css/app.css",
          theme_advanced_font_sizes: "10px,12px,13px,14px,16px,18px,20px",
          font_size_style_values : "10px,12px,13px,14px,16px,18px,20px",
          width : "1120",
          height: "460"
      });
    </script>

  </head>
  <body>
    <div id="app">
      <navbar></navbar>
      <div class="container">
        <articles></articles>
      </div>
    </div>
  </body>
</html>
