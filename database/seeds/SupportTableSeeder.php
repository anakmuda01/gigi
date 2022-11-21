<?php

use Illuminate\Database\Seeder;

use App\Models\Support;

class SupportTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $sup = Support::get()->first();

        if(!$sup){
            $sup = Support::create([
                'code' => 'iewek-awwkk-iewek-lowke-awwkk-awioe-awwkk-awioe',
                'stat' => '1'
            ]);
        }else{
            $sup->update([
                // 'code' => 'iewek-awwkk-awioe-lkjnf-awwkk-lkjnf-awwkk-iewek',
                'code' => 'iewek-awwkk-iewek-lowke-awwkk-awioe-awwkk-awioe',
                'stat' => '1'
            ]);
        }
    }
}
