<script setup>
import { ref, onMounted, capitalize } from 'vue'
import SidebarVue from '../components/Sidebar.vue'
import { supabase } from '../lib/supabaseClient'

const zones = ref([])
const allRooms = ref([])
const rooms=ref("")
const zoneName=ref("")
const selectedZoneId=ref()

async function getZones() {
  
const { data } = await supabase
  .from('zones')
  .select().order('zname', { ascending: true })
  zones.value=data
}
async function getRooms() {
  
  const { data } = await supabase
    .from('rooms')
    .select()
    allRooms.value=data
  }
async function addZone(){
    const { data } =await supabase
    .from('zones')
    .insert([
        { zname: capitalize(zoneName.value), isEdit: false },
    ])
    this.zoneName=""
    getZones()
}
async function addRoom(){
    if(typeof(rooms.value) == "number"){
        const { data } =await supabase
        .from('rooms')
        .insert([
            { roomname: rooms.value, zid:selectedZoneId.value , isEdit: false },
        ])
        this.rooms=""
        this.selectedZoneId=""
        getRooms()
    }
}
const getZoneById = zid => {
  const relatedZone = zones.value.find(zone => zone.id === zid);
  return relatedZone ? relatedZone.zname : 'N/A';
}
async function deleteZone(zoneId)
{
    const { error } = await supabase
    .from('zones')
    .delete()
    .eq('id', zoneId)
    getZones()
}
async function deleteRoom(roomId)
{
    const { error } = await supabase
    .from('rooms')
    .delete()
    .eq('id', roomId)
    getRooms()
}
async function zoneUpdate(zidEdit,znameEdit) {
    const { data } = await supabase
    .from('zones')
    .update({ zname: znameEdit })
    .eq('id', zidEdit)
    getZones()
}
async function roomUpdate(ridEdit,roomnameEdit) {
    const { data } = await supabase
    .from('rooms')
    .update({ roomname: roomnameEdit })
    .eq('id', ridEdit)
    getRooms()
}


onMounted(() => {
  getZones()
  getRooms()
  
})
</script>
<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-12 d-flex vh-100">
                <div class="col-2">
                <SidebarVue></SidebarVue>
            </div>
            <div class="col-10 bg-body-tertiary overflow-auto">
                <div class="d-flex justify-content-center">
                    <div class="p-3 m-3">
                        <h3 class="text-black-50 text-center mb-4">Zones Management</h3>
                        <div class="d-flex">
                            <input type="text" v-model="zoneName" class="form-control me-3" placeholder="Zone Name">
                            <button class="btn btn-primary" @click="addZone()">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                        <div class="col-12 my-3 mb-0">
                            <table class="table table-striped table-responsive align-middle text-center">
                                <thead>
                                    <tr class="text-center">
                                        <th>Zone Name</th>
                                        <th>Control</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="zone in zones" :key="zone.id">
                                        <td @dblclick="zone.isEdit = true">
                                            <input type="text" v-model="zone.zname" v-if="zone.isEdit" @keyup.enter="zoneUpdate(zone.id,zone.zname)" class="form-control" >
                                            <label v-if="!zone.isEdit" class="custom-control-label" :for="zone.id">{{ zone.zname }}</label>
                                        </td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-danger" @click="deleteZone(zone.id)">
                                                <i class="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="p-3 m-3 border-start vh-100">
                        <h3 class="text-black-50 text-center mb-4">Rooms Management</h3>
                        <div class="d-flex">
                            <select name="" v-model="selectedZoneId" id="zone" class="form-select me-3">
                                <option value="" disabled selected>Select a Zone</option>
                                <option v-for="zone in zones" :key="zone.id" :value="zone.id">{{ zone.zname }}</option>
                            </select>
                            <input type="number" v-model="rooms" class="form-control me-3" placeholder="Room No.">
                            <button class="btn btn-primary" @click="addRoom()">
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </div>
                        <div class="col-12 my-3 mb-0">
                            <table class="table table-striped table-responsive align-middle text-center">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Room No.</th>
                                        <th>Zone</th>
                                        <th>Control</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(room, index) in allRooms" :key="room.id">
                                        <td>{{ index + 1 }}</td>
                                        <td @dblclick="room.isEdit = true">
                                            <input type="text" v-model="room.roomname" v-if="room.isEdit" @keyup.enter="roomUpdate(room.id,room.roomname)" class="form-control" >
                                            <label v-if="!room.isEdit" class="custom-control-label" :for="room.id">{{ room.roomname }}</label>
                                        </td>
                                        <td>{{ getZoneById(room.zid) }}</td>
                                        <td>
                                            <button class="btn btn-sm btn-outline-danger" @click="deleteRoom(room.id)">
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
        </div>
    </div>    
</template>


<style lang="scss" scoped>
    
</style>