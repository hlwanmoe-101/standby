<template>
    <div class="container">
        <div class="row vh-100">
            <div class="col-12 d-flex justify-content-center align-items-center">
                <div class="card p-3 m-3" style="width: 400px">
                    <h4>Name : {{ massager.name }}</h4>
                    <h4>Serial No. : {{ massager.serial }}</h4>
                    <select v-if="massager.isFree" id="type" class="form-select" v-model="selectType">
                        <option value="caddy">Caddy</option>
                        <option value="massage">Massage</option>
                    </select>
                    <button v-if="massager.isFree" class="btn btn-success mt-3" @click="dutyIn(massager.id)">Duty In</button>
                    <button v-else class="btn btn-danger mt-3" @click="dutyOut(massager.id)">Duty Out</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { useRoute, useRouter } from 'vue-router';

const router=useRouter()
const route=useRoute()
const massager=ref({})
const selectType=ref()

async function getDuty() {
    const empId = route.params.id

    const { data } = await supabase
  .from('employer')
  .select()
  .eq('id',empId)
  massager.value=data[0]
}

async function dutyIn(id) {

    await supabase
    .from('job')
    .insert([
        { e_id: id, type:selectType.value },
    ])

    const { data } = await supabase
    .from('employer')
    .update({ isFree: false})
    .eq('id', id)
    main()
}
async function dutyOut(id) {
    const { data } = await supabase
    .from('employer')
    .update({ isFree: true})
    .eq('id', id)
    main()
}
function main(){
  router.push({ name: 'home' })
}

  onMounted(() => {
  getDuty()
})
</script>

<style lang="scss" scoped>

</style>