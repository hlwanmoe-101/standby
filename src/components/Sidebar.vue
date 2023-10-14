<template>
  <nav id="sidebarMenu" class="d-lg-block bg-white">
    <div class="position-sticky ">
      <div class="list-group list-group-flush mx-3 mt-4">
        <!-- <a class="">
        <img
             src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png"
             height="25"
             alt=""
             loading="lazy"
             />
      </a> -->
        <a
          href="#"
          @click="admin()"
          class="list-group-item list-group-item-action py-2"
        >
          <i class="fas fa-tachometer-alt fa-fw me-3"></i><span>Main dashboard</span>
        </a>
        <a href="#" class="list-group-item list-group-item-action py-2">
          <i class="fas fa-chart-area fa-fw me-3"></i><span>History</span>
        </a>
        <a href="#" @click="room()" class="list-group-item list-group-item-action py-2">
          <i class="fas fa-chart-area fa-fw me-3"></i><span>Room Management</span>
        </a>
        <a href="#" @click="massager()" class="list-group-item list-group-item-action py-2">
          <i class="fas fa-chart-area fa-fw me-3"></i><span>Massager Detail</span>
        </a>
      </div>
    </div>
    <div class="card mt-5">
        <button class="btn btn-danger" @click="logout">logout</button>
    </div>
  </nav>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { supabase } from '../lib/supabaseClient'

function room(){
  router.push({ name: 'room' });
}
function massager(){
  router.push({ name: 'massager' });
}
function admin(){
  router.push({ name: 'admin' });
}
const router = useRouter();
    async function logout() {
	const { error } = await supabase.auth.signOut();
	if (error) {
		console.log(error+"aa");
	}
	else {
		console.log("Sign out success")

        router.push({ name: 'login' });
	}
}
</script>

<style scoped>

</style>