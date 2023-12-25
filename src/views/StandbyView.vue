<template>
    <div class="container">
        <div class="row">
            <div v-for="m in freeMassager" :key="m.id" class="col-12 col-md-6 col-lg-4 d-flex justify-content-around">
            <div class="card text-center p-3 m-3 shadow-sm" style="width:350px">
                <label for="name">Name : {{ m.name }}</label>
                <label for="serial">No. : {{ m.serial }}</label>
                <label for="phone">Phone. : {{ m.phone }}</label>
            </div>
    </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'vue-router';

const freeMassager=ref([])
async function getStandby(){
    const { data } = await supabase
  .from('employer')
  .select()
  .eq('isFree',true)
  .order('serial',{ascending: true})
  freeMassager.value=data
}


onMounted(()=>{
    getStandby()
})
</script>

<style lang="scss" scoped>

</style>