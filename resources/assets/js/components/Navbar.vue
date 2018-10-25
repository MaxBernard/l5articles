<template>
  <header class="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar bg-success">
    <div class="container flex-row">
      <div class="navbar-header">
        <!-- Collapsed Hamburger -->
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#app-navbar-collapse" aria-expanded="false">
          <span class="sr-only">Toggle Navigation</span>
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Branding Image -->
        <a class="navbar-brand" href="/">
          L5Articles
        </a>
      </div>
      <div class="navbar-nav-scroll">
        <!--div class="collapse navbar-collapse" id="app-navbar-collapse"-->
          <!-- Left Side Of Navbar -->
          <ul class="nav navbar-nav flex-row">
            <li class="nav-item"><a class="nav-link active" href="/">Home</a></li>
            <li class="nav-item"><a class="nav-link" href="/about">About</a></li>
            <li class="nav-item"><a class="nav-link" href="/services">Services</a></li>
            <li class="nav-item"><a class="nav-link" href="/api/articles">Articles</a></li>
          </ul>
          <!-- Right Side Of Navbar -->
          <ul class="nav navbar-nav navbar-right">
            <!-- Authentication Links -->
            <li><a class="nav-link" href="/login">Login</a></li>
            <li><a class="nav-link" href="/register">Register</a></li>
          </ul>
        <!--/div-->
      </div>
    </div>
  </header>
</template>
