<template>
    <div class="container">
        <div class="row">
            <div class="col-4 vh-100 m-auto">
                <div class="card my-5">
                    <div class="p-3">
                        <h2 class="text-primary text-center">Login</h2>
                        <input v-model="email" class="form-control my-2" type="email" placeholder="Email :" />
                        <input v-model="password" class="form-control my-2" type="password" placeholder="Password :" />
                        <div class="d-flex justify-content-center">
                            <button @click="login" class="btn btn-sm btn-outline-primary">Log In</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import {supabase} from '../lib/supabaseClient';
import { useRouter } from 'vue-router';

const router = useRouter();

const email=ref("")
const password=ref()
  
async function login() {
	const { data, error } = await supabase.auth.signInWithPassword({
		email: email.value,
		password: password.value
	})
	if (error)
	{
		// console.log(error);
	}
	else
	{
		// console.log(data);
        router.push({ name: 'admin' });
	}
}
 

</script>

<style lang="scss" scoped>

</style>