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
    <link rel="stylesheet" href="{{ asset('css/master.css') }}">
</head>
<body>
    <div id="app">
        <div class="container">
            <div class="card">
                <div class="imgBx">
                    <h3>Aplikasi Manajemen <span>Praktik Dokter Gigi Mandiri</span></h3>
                    <br>
                    <div class="pesan-fail">
                        @error('name')
                            <span class="invalid-feedback" role="alert">
                                <strong style="color:red;">{{ $message }}</strong>
                            </span>
                        @enderror
                        @error('email')
                            <span class="invalid-feedback" role="alert">
                                <strong style="color:red;">{{ $message }}</strong>
                            </span>
                        @enderror
                        @error('password')
                            <span class="invalid-feedback" role="alert">
                                <strong style="color:red;">{{ $message }}</strong>
                            </span>
                        @enderror
                    </div>
                </div>
                <div class="loginBox">
                    <form method="POST" action="{{ route('register') }}">
                        @csrf
                        <div class="group">      
                            <input class="text-input" autocomplete="off" type="text" name="name" value="{{ old('name') }}" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label class="text-box">Nama</label>
                        </div>

                        <div class="group">      
                            <input class="text-input" autocomplete="off" type="text" name="email" value="{{ old('email') }}" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label class="text-box">E-mail</label>
                        </div>
                        
                        <div class="group">      
                            <input class="text-input" autocomplete="off" type="password" name="password" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label class="text-box">Password</label>
                        </div>

                        <div class="group">      
                            <input class="text-input" autocomplete="off" type="password" name="password_confirmation" required>
                            <span class="highlight"></span>
                            <span class="bar"></span>
                            <label class="text-box">Konfirmasi Password</label>
                        </div>
                        
                        <br>
                        <div>
                            <button class="btn-login">Register</button>
                        </div>
                    </form>
                </div>
            </div> 
        </div>   
    </div>  
</body>
</html>
