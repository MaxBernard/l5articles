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

    <!-- Scripts -->
    <script src="js/jquery-3.3.1.min.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <!--script src="js/datatables.min.js"></script-->
    <!--script src="js/jquery.datatables.min.js"></script-->
    <script src="{{ asset('js/app.js') }}" defer></script>
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
