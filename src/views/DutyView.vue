<template>
    <div class="container">
        <div class="row">
            <div v-for="m in allMassagers" :key="m.id" class="col-12 col-md-6 col-lg-4 d-flex justify-content-around">
                <div class="card p-3 m-2 shadow-sm" style="width:350px">
                    <label for="name">Name : {{ m.name }}</label>
                    <label for="serial">No. : {{ m.serial }}</label>
                    <a class="btn btn-sm btn-outline-info shadow-sm mx-4 mt-2" @click="dutyDetail(m.id)">
                        <i class="fa-solid fa-user-alt"></i>
                        Duty Assign
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'vue-router';
const router = useRouter();
// import MassagerAv from '../components/MassagerAv.vue'


const allMassagers=ref([])

async function getMassager() {

const { data } = await supabase
  .from('employer')
  .select('*')
  allMassagers.value=data
}
function dutyDetail(id){
  router.push({ name: 'dutyDetail',params:{id} });
}

  onMounted(() => {
  getMassager()
})
</script>

<style lang="scss" scoped>

</style>