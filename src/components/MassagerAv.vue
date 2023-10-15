<template>
    <div class="container p-3">
        <div class="d-lg-flex justify-content-around align-items-end">
            <div class="mb-lg-0 mb-3 me-3">
                <label for="">Select Time</label>
                <select id="timePicker" class="form-select" v-model="selectedStartTime" @change="checkStartTime()">
                    <option
                    v-for="(time,index) in availableTimes"
                    :key="index"
                    :value="time"
                    :disabled="isTimeDisabled(time)"
                    >
                    {{ time }}
                    </option>
                </select>
            </div>
            <div class="mb-lg-0 mb-3 me-3">
                <label for="">Type</label>
                <select name="" v-model="selectedTypeOfM" id="typeM" class="form-select">
                    <option value="" disabled selected>Select Type</option>
                    <option v-for="(typeM,index) in typeOfM" :key="index" :value="index">{{ typeM }}</option>
                </select>
            </div>
            <div class="mb-lg-0 mb-3 me-3">
                <label for="">Section</label>
                <input type="number" class="form-control" v-model="section" :min="1" @change="checkEndTime()" /> 
            </div>
            <div class="mb-lg-0 mb-3 me-3">
                <label for="">End Time</label>
                <input type="time" class="form-control" v-model="selectedEndTime" disabled/>
            </div>
            <div class="text-center mb-lg-0 mb-3">
                <button class="btn btn-primary" @click="addOrder()">Order</button>
            </div>
        </div>
        
        <div v-if="massagerJob.length!=0">
            <h3 class="text-warning text-center mt-3">Busy Time</h3>
            <ul class="list-group" v-for="(massagerJobList,index) in massagerJob" :key="massagerJobList.id">
                <li class="list-group-item text-danger">Section {{ index+1 }} : From {{ massagerJobList.startTime }} to {{ massagerJobList.endTime }}</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch, inject } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../lib/supabaseClient'

const props = defineProps(['mid','rid'])
const typeOfM=ref(['Body','Foot'])
const selectedStartTime=ref()
const selectedEndTime=ref()
const selectedTypeOfM=ref()
const footTime=ref(1)
const bodyTime=ref(1)
const section=ref()
const massagerJob = ref([])
const router=useRouter()


const date = new Date();
const currentYear = date.getFullYear();
const today = date.getDate();
const currentMonth = date.getMonth('mm') + 1; 
const currentDate=currentYear+'-'+currentMonth+'-'+today
const availableTimes=ref([])


function runHour() {
      for (let hour = 14; hour <= 21; hour++) {
        for (let minute = 0; minute < 60; minute += 15) {
          const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
          availableTimes.value.push(time);
        }
    }
}
function isTimeDisabled(time) {
        const selectedTime = new Date(`2000-01-01T${time}`);
        const start=ref([])
        const end=ref([])
        if(massagerJob.value.length>0){
            start.value=massagerJob.value.map((el)=>el.startTime)
            end.value=massagerJob.value.map((el)=>el.endTime)
            for(let i=0;i<start.value.length;i++){
                const sTime = new Date(`2000-01-01T${start.value[i]}`);
                const eTime = new Date(`2000-01-01T${end.value[i]}`);
                const sTime2 = new Date(`2000-01-01T${start.value[i+1]}`);
                if(selectedTime>= sTime && selectedTime<= eTime){
                    return true
                
                }else if(selectedTime>eTime && selectedTime<sTime2){
                    const intervalTime=sTime2-eTime;
                    const resultTime=intervalTime/3600000;
                    console.log(resultTime)
                    if(resultTime<1){
                        return true
                    }
                }
               
            }
        }
      }
    //   function isTimeFree(time) {
    //     getMassagerJob()
    //     const selectedTime = new Date(`2000-01-01T${time}`);
    //     const start=ref([])
    //     const end=ref([])
    //     if(massagerJob.value.length>0){
    //         start.value=massagerJob.value.map((el)=>el.startTime)
    //         end.value=massagerJob.value.map((el)=>el.endTime)
    //         for(let i=0;i<start.value.length;i++){
    //             const sTime = new Date(`2000-01-01T${start.value[i]}`);
    //             const eTime = new Date(`2000-01-01T${end.value[i]}`);
    //             const sTime2 = new Date(`2000-01-01T${start.value[i+1]}`);
    //             if(selectedTime>= sTime && selectedTime<= eTime){
    //                 return true
                
    //             }else if(selectedTime>eTime && selectedTime<sTime2){
    //                 const intervalTime=sTime2-eTime;
    //                 const resultTime=intervalTime/3600000;
    //                 console.log(resultTime)
    //                 if(resultTime<1){
    //                     return true
    //                 }
    //             }
               
    //         }
    //     }
    //   }
    function isTimeFree(time) {
  return new Promise((resolve, reject) => {
    try {
      getMassagerJob(); // Assuming getMassagerJob is an asynchronous function

      const selectedTime = new Date(`2000-01-01T${time}`);
      

      if (massagerJob.value.length > 0) {
       const start = massagerJob.value.map((el) => el.startTime);
       const end = massagerJob.value.map((el) => el.endTime);

        for (let i = 0; i < start.length; i++) {
          const sTime = new Date(`2000-01-01T${start[i]}`);
          const eTime = new Date(`2000-01-01T${end[i]}`);
          const sTime2 = new Date(`2000-01-01T${start[i + 1]}`);

          if (selectedTime >= sTime && selectedTime <= eTime) {
            resolve(true);
            return;
          } else if (selectedTime > eTime && selectedTime < sTime2) {
            const intervalTime = sTime2 - eTime;
            const resultTime = intervalTime / 3600000;

            if (resultTime < 1) {
              resolve(true);
              return;
            }
          }
        }
      }

      resolve(false); // If the selected time is free
    } catch (error) {
      reject(error); // Handle any errors that occur during the asynchronous operations
    }
  },3000);
}

function checkStartTime(){
    
    selectedEndTime.value=null
    section.value=null
}
function checkEndTime(){
    const selectedTimeParts = selectedStartTime.value.split(':');
      const hours = parseInt(selectedTimeParts[0], 10);
      const minutes = parseInt(selectedTimeParts[1], 10);
      const selectedDate = new Date(0, 0, 0, hours, minutes);
    if(selectedTypeOfM.value=="Body"){
        selectedDate.setHours(selectedDate.getHours() + (bodyTime.value*section.value));
    }else{
        selectedDate.setHours(selectedDate.getHours() + (footTime.value*section.value));
    }
   
      const newHours = selectedDate.getHours().toString().padStart(2, '0');
      const newMinutes = selectedDate.getMinutes().toString().padStart(2, '0');
      selectedEndTime.value = newHours+':'+newMinutes;
}

async function addOrder(){
    const isFree=isTimeFree(selectedStartTime.value)
    if(!isFree){
        const { data } = await supabase
      .from('job')
      .insert([
        {
          startTime: selectedStartTime.value,
          endTime: selectedEndTime.value,
          mid: props['mid'],
          rid: props['rid'],
          type: selectedTypeOfM.value,
          section: section.value,
          isConfirmed: false
        },
      ]);
      selectedStartTime.value=null
      selectedEndTime.value=null
      selectedTypeOfM.value=null
      section.value=null
      showSuccessAlert()
      main()
    }else{
        selectedStartTime.value=null
      selectedEndTime.value=null
      selectedTypeOfM.value=null
      section.value=null
      showErrorAlert()
      main()
    }
    
}

const swal = inject('$swal')

async function showSuccessAlert() {
    swal({
        icon: 'success',
        title: 'Thanks For Your Order',
        text: 'If your not confirm, your order will be cancel withing 30 minuts!'})
}
async function showErrorAlert() {
    swal({
        icon: 'error',
        title: 'Sorry For Your Order',
        text: 'Please Try Agin!'})
}

function main(){
  router.push({ name: 'home' })
}

watch(
    props, () => {
    getMassagerJob()
}
)
async function getMassagerJob() {
  const { data } = await supabase
    .from('job')
    .select().gte('created_at',currentDate).eq('mid',props['mid']).order('startTime',{ascending: true})
    massagerJob.value=data
  }
  

  onMounted(() => {
  getMassagerJob()
    runHour()
  
})
</script>

<style lang="scss" scoped>
 
</style>
