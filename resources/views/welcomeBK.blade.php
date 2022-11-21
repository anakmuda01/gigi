<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css">

    <!-- Styles -->
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div id="app">
        @guest
        <v-app id="inspire">
            <v-content>
                    <div class="pesan-login">
                        @if ($errors->has('email'))
                            <span class="invalid-feedback" role="alert">
                                <strong style="color:red;">Email dan Password tidak cocok !..</strong>
                            </span>
                        @endif
                        @if ($errors->has('password'))
                            <span class="invalid-feedback" role="alert">
                                <strong style="color:red;">Email dan Password tidak cocok !..</strong>
                            </span>
                        @endif
                    </div>
                    <v-container fluid fill-height>
                        <v-layout align-center justify-center>
                            <v-flex xs12 sm8 md4>
                                <form action="/login" method="POST">
                                    @csrf
                                    <v-card class="elevation-12">
                                        <v-card-title primary-title>
                                            <h3>Login Form</h3>
                                        </v-card-title>
                                        <v-card-text>
                                            <v-text-field prepend-icon="person" name="email" label="Email" type="text"></v-text-field>
                                            <v-text-field prepend-icon="lock" name="password" label="Password" type="password"></v-text-field>
                                            <v-checkbox label="Ingat Saya ?" name="remember"></v-checkbox>
                                        </v-card-text>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn type="submit" color="primary">Login</v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </form>
                            </v-flex>
                        </v-layout>
                    </v-container>
            </v-content>
        </v-app>
        @else
        <v-app id="hello">
            <v-content>
                <v-container fluid fill-height>
                    <v-layout align-center justify-center>
                        <v-flex xs12 sm8 md4>
                            <v-card>
                                <v-card-text>
                                    Hello {{ Auth::user()->name }}~ 
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <form action="{{ route('logout') }}" method="POST">
                                        @csrf
                                        <v-btn type="submit" color="red">Log Off</v-btn>
                                    </form>
                                </v-card-actions>
                            </v-card>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-content>
        </v-app>
        @endguest
    </div>  
</body>
</html>
