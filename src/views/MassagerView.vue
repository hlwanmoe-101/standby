<script setup>
import { ref, onMounted } from 'vue'
import SidebarVue from '../components/Sidebar.vue'
import { supabase } from '../lib/supabaseClient'

const mname=ref("")
const mcode=ref()
const mphone=ref()
const massagers = ref([])
const isEdit=true
const updateId=ref()

async function getMassager() {
  
  const { data } = await supabase
    .from('massager')
    .select()
    massagers.value=data
  }

async function addMassager(){
    if(typeof(mcode.value) == "number"){
        const { data } =await supabase
        .from('massager')
        .insert([
            { name: mname.value, mcode:mcode.value ,phone:mphone.value },
        ])
        this.mname=""
        this.mcode=""
        this.mphone=""
    }
}
function repairMassager(id){
    const uMassager = massagers.value.find(el => el.id === id);
    updateId.value=id
    mname.value=uMassager.name
    mcode.value=uMassager.mcode
    mphone.value=uMassager.phone
    isEdit.value=false
}
async function updateMassager() {
    const { data } = await supabase
    .from('massager')
    .update({ name: mname.value, mcode: mcode.value, phone: mphone.value})
    .eq('id', updateId.value)
    
    isEdit.value=true
}
async function deleteMassager(id)
{
    const { error } = await supabase
    .from('massager')
    .delete()
    .eq('id', id)
    getMassager()
}
onMounted(() => {
  getMassager()
})
</script>
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 d-flex vh-100">
                <div class="col-2">
                <SidebarVue></SidebarVue>
            </div>
            <div class="col-10 d-flex bg-body-tertiary overflow-auto">
                <div class="p-3 m-3">
                    <h3 class="text-center text-primary">Massager Information</h3>
                    <form action="">
                        <input type="text" v-model="mname" class="form-control my-3" required placeholder="Name :">
                        <input type="number" v-model="mcode" class="form-control my-3" required placeholder="Code :">
                        <input type="text" v-model="mphone" class="form-control my-3" required placeholder="Phone :">
                        <div class="d-flex justify-content-center">
                            <button v-if="isEdit" class="btn btn-outline-primary" @click="addMassager()">Submit</button>
                            <button v-else class="btn btn-outline-success" @click="updateMassager()">Update</button>
                        </div>
                    </form>
                </div>
                <div class="p-3 m-3" style="width: 800px;">
                    <table class="table table-striped align-middle text-center">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Code</th>
                            <th>Phone No.</th>
                            <th>Control</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(massager,index) in massagers" :key="massager.id">
                            <td>{{ index+1 }}</td>
                            <td class="text-primary"  >
                               <a href="#" @click="repairMassager(massager.id)">{{ massager.name }}</a> 
                            </td>
                            <td>{{ massager.mcode }}</td>
                            <td>{{ massager.phone }}</td>
                            <td>
                                <button class="btn btn-sm btn-outline-danger" @click="deleteMassager(massager.id)">
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>
    </div>
</template>



<style lang="scss" scoped>

</style>