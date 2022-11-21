<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;

use App\Models\User;

class UserController extends Controller
{
    public function __construct()
    {
       $this->middleware('auth:api');
    }

    public function index()
    {
      $this->authorize('isAdmin');
      return User::where('type','!=','master')->latest()->get();
    }

    public function store(Request $request)
    {
        $this->authorize('isAdmin');

        $this->validate($request, [
          'name' => 'required|max:25',
          'email' => 'required|unique:users|max:50',
          'password' => 'required|min:6',
          'type' => 'required'
        ]);

        // return response()->json($request);
         return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'type' => $request->type
          ]);
    }

    public function update(Request $request, $id)
    {
      $this->authorize('isAdmin');

      $user = User::findOrFail($id);

      $this->validate($request,[
          'name' => 'required|string|max:191',
          'email' => 'required|string|max:191|unique:users,email,'.$user->id,
          'password' => 'sometimes|min:6',
          'type' => 'required'
      ]);

      $user->update([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'type' => $request->type
      ]);
      return $request;
    }

    public function destroy($id)
    {
      $this->authorize('isAdmin');

      $user = User::findOrFail($id);

      $user->delete();

      return ['message' => 'User Deleted'];
    }
}
