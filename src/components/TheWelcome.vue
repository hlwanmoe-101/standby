<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

function standBy(){
  router.push({ name: 'standby' });
}
function duty(){
  router.push({ name: 'duty' });
}
</script>

<template>
  
  <div class="container-fluid">
        <div class="row">
          <div class="col-12 d-flex justify-content-center align-items-center vh-100">
            <div class="card" style="width:80rem; height: 40rem;">
              <img src="../assets/mainusage.svg" style="height: 30rem;" class="card-img-top" alt="Spa Photo">
              <div class="card-body">
                <h3 class="card-title text-center text-primary">Welcome To Our System</h3>
                <!-- <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> -->
                <div class="d-flex justify-content-center align-items-center">
                  
                    <a class="btn btn-outline-info btn-lg shadow-sm mx-4" @click="standBy">
                      <i class="fa-regular fa-user"></i>
                      StandBy 
                    </a>
                    <a class="btn btn-outline-warning btn-lg shadow-sm mx-4" @click="duty">
                      <i class="fa-solid fa-users"></i>
                      Duty
                    </a>
                    <!-- <a class="btn btn-outline-info shadow-sm">
                      <i class="fa-solid fa-user-alt"></i>
                      Massager</a> -->
                </div>
              </div>
            </div>
          </div>
          
        </div>
    </div>
  
</template>
