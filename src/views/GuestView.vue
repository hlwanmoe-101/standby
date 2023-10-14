<template>
    <div class="container vh-100" aria-hidden>
        <div class="row">
            <div class="col-12">
                <div class="row">
                  <div class="col-lg-4">
                    <div class="card p-3 m-3">
                      <label for="">Select Your Room</label>
                      <select name="" v-model="selectedRoomId" id="room" class="form-select me-3 mb-3">
                          <option value="" disabled selected>Select Rooms</option>
                          <option v-for="room in allRooms" :key="room.id" :value="room.id">{{ room.zones.zname+'-'+room.roomname }}</option>
                      </select>
                      <label for="">Select Massager</label>
                      <select name="" v-model="selectedMassagerId" id="massager" class="form-select me-3">
                          <option value="" disabled selected>Select Massager</option>
                          <option v-for="massager in allMassagers" :key="massager.id" :value="massager.id">{{ massager.mcode }}</option>
                      </select>
                    </div>
                  </div>
                  
                  <div class="col-lg-8">
                      <div class="card m-3" v-if='selectedMassagerId!=null'>
                        <MassagerAv :mid= "selectedMassagerId" :rid="selectedRoomId"/>
                      </div>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'
import MassagerAv from '../components/MassagerAv.vue'

const allRooms=ref([])
const allMassagers=ref([])
const selectedMassagerId=ref()
async function getRooms() {

  const { data } = await supabase
    .from('rooms')
    .select('*,zones(zname)')
    allRooms.value=data
  }
async function getMassager() {

const { data } = await supabase
  .from('massager')
  .select('*')
  allMassagers.value=data
}




  onMounted(() => {
  getRooms()
  getMassager()
})
</script>

<style lang="scss" scoped>

</style>