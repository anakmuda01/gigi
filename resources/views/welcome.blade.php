<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link rel="stylesheet" href="{{ asset('css/style.css') }}">
</head>
<body>
    <div id="app">
        <div class="container">
            <div class="card">
                <div class="imgBx">
                    <p class="myIp"><b>{{$myIP}}</b></p>
                    {{-- <img src="{{ asset('img/gambar3.png') }}" alt="gambar 1"> --}}
                </div>
                <div class="loginBox">
                    {{-- <h2>Aplikasi Manajemen Praktik Dokter Gigi Mandiri<small>Apotek Salma</small></h2> --}}
                    <h2>Aplikasi Manajemen Praktik Dokter Gigi Mandiri<small>Ver.1.0.0</small></h2>
                    @guest
                    <form id="form-login" action="/login" method="POST">
                        @csrf
                        <div class="group">      
                            <input class="text-input" autocomplete="off" type="text" name="email" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label class="text-box">Username</label>
                        </div>
                        
                        <div class="group">      
                            <input class="text-input" autocomplete="off" type="password" name="password" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label class="text-box">Password</label>
                        </div>
                        <div>      
                            <input type="checkbox" name="remember" class="css-checkbox" id="checkbox1" {{ old('remember') ? 'checked' : '' }}/>
						    <label for="checkbox1" name="checkbox1_lbl" class="css-label lite-green-check">Ingat Saya !</label>
                        </div>
                        <br>
                        <div class="pesan-fail">
                            @if ($errors->has('email'))
                                <span class="invalid-feedback" role="alert">
                                    <strong style="color:red;">Username dan Password tidak cocok !..</strong>
                                </span>
                            @endif
                            @if ($errors->has('password'))
                                <span class="invalid-feedback" role="alert">
                                    <strong style="color:red;">Username dan Password tidak cocok !..</strong>
                                </span>
                            @endif
                        </div>
                        <div>
                            <button class="btn-login">Login</button>
                        </div>
                    </form>
                    @else
                    <div class="hello">
                        <p>Hi ! <i>{{ Auth::user()->name }}~</i>, Selamat Anda Berhasil Login~</p>
                        <a href="/dashboard" class="link-dash">Mulai</a>
                    </div>
                    <div>
                        <form id="logout-form" action="{{ route('logout') }}" method="POST">
                            @csrf
                            <button class="btn-logout"> Log Out </button>
                        </form>
                    </div>
                    @endguest
                </div>
            </div> 
        </div>   
    </div>  
</body>
</html>
