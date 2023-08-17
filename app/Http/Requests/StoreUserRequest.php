<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
                //! our rules to accept new user data

        return [
            'name' =>  'required|string|max:30',
            'email' =>  'required|email|unique:users,email',
            'age' => 'required|integer',
            'sex' => 'required|string',
            'password' =>  [
                'required',
                'confirmed',
                Password::min(8)
                    ->letters()
                    ->numbers()

            ]
        ];
    }
}
