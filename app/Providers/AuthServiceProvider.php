<?php

namespace App\Providers;

use Laravel\Passport\Passport;
use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The policy mappings for the application.
     *
     * @var array
     */
    protected $policies = [
        'App\Model' => 'App\Policies\ModelPolicy',
    ];

    /**
     * Register any authentication / authorization services.
     *
     * @return void
     */
    public function boot()
    {
        $this->registerPolicies();

        Gate::define('isAdminOnly',function($user){
            return $user->type === 'admin';
        });

        Gate::define('isAdmin',function($user){
            return $user->type === 'master' || $user->type === 'admin';
        });

        Gate::define('isDokter',function($user){
            return $user->type === 'master' || $user->type === 'dokter';
        });

        Gate::define('isAsisten',function($user){
            return $user->type === 'master' || $user->type === 'asisten';
        });

        Gate::define('isDokAs',function($user){
            return  $user->type === 'master' || $user->type === 'dokter' || $user->type === 'asisten';
        });

        Passport::routes();
    }
}
