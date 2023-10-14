<template>
    <div class="container-fluid m-0">
        <div class="row">
            <div class="col-12 d-flex vh-100">
                <div class="col-2">
                    <SidebarVue></SidebarVue>
                </div>
                <div class="col-10 bg-body-tertiary overflow-auto">
                    <div class=" m-3 d-flex justify-content-between align-items-center">
                            <input type="text" v-model="searchKey" @keyup.enter="searchStart()" class="form-control" placeholder="Search" style="width:250px">
                           
                        <button v-if="isRefresh" class="btn btn-primary btn-sm ms-3" @click="getJob()">Refresh</button>
                    </div>
                    <div v-if="isMsgDetail" class="card m-3 p-2 pb-0 text-center border-0 bg-gradient" >
                                <p class="text-primary me-3"><i class="fa-solid fa-person"></i> Name : {{ massagers[0].name }}</p>
                                <p class="text-primary me-3"><i class="fa-solid fa-qrcode"></i> Code : {{ massagers[0].mcode }}</p>
                                <p class="text-primary"><i class="fa-solid fa-phone"></i> Phone No.: {{ massagers[0].phone }}</p>
                            </div>
                    <div class="card p-3 m-3">
                        <table class="table table-hover text-center align-middle">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Room No.</th>
                                <th>Massager Code</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Type</th>
                                <th>Control</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="job in allJobs" :key="job.id">
                                <td>{{ job.created_at.split('T')[0] }}</td>
                                <td>{{ job.rooms.roomname }}</td>
                                <td><a href="#" class="me-1" @click="searchMJob(job.mid)">{{ job.massager.name }}</a><i class="fa-solid fa-circle-info text-primary" @click="infoMsg(job.mid)"></i> </td>
                                <td>{{ job.startTime }}</td>
                                <td>{{ job.endTime }}</td>
                                <td v-if="job.type">Foot</td>
                                <td v-else>Body</td>
                                <td>
                                    <button v-if="!job.isConfirmed" class="btn btn-sm btn-success me-2" @click="confirmed(job.id)">
                                        <i class="fa-solid fa-check-double"></i>
                                        Confirm
                                    </button>
                                    <button class="btn btn-sm btn-danger" @click="deleteJob(job.id)">
                                        <i class="fa-solid fa-trash"></i>
                                        Cancel
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

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'vue-router';
import SidebarVue from '../components/Sidebar.vue';

const allJobs=ref([])
const searchKey=ref()
const searchJob=ref([])
const searchMsgJob=ref([])
const isRefresh=ref(false)
const isMsgDetail=ref(false)
const massagers=ref([])
const printJob=ref()

const date = new Date();
const currentYear = date.getFullYear();
const today = date.getDate();
const currentMonth = date.getMonth('mm') + 1; 
const currentDate=currentYear+'-'+currentMonth+'-'+today



async function getJob() {

const { data } = await supabase
  .from('job')
  .select('*,massager(name,mcode),rooms(roomname)').gte('created_at',currentDate).order('startTime',{ascending: true})
  allJobs.value=data
  isRefresh.value=false
  isMsgDetail.value=false
}
function searchStart(){
    searchJob.value=[]
    searchJob.value=allJobs.value.filter(el=>el.rooms.roomname==searchKey.value)
    searchKey.value=null
    allJobs.value=searchJob.value
    isRefresh.value=true
}
function searchMJob(id){
    searchMsgJob.value=[]
    searchMsgJob.value=allJobs.value.filter(el=>el.mid==id)
    allJobs.value=searchMsgJob.value
    isRefresh.value=true
    getMassager(id)
}
async function getMassager(id) {
    massagers.value=[]
    const { data } = await supabase
    .from('massager')
    .select().eq('id',id)
    massagers.value=data
    isMsgDetail.value=true
    isRefresh.value=true
}
async function confirmed(id) {
    const { data } = await supabase
    .from('job')
    .update({ isConfirmed: true})
    .eq('id', id)
    printContent(id)
    getJob()
}
async function deleteJob(id)
{
    const { error } = await supabase
    .from('job')
    .delete()
    .eq('id', id)
    getJob()
}
const printContent=(id)=> {

    printJob.value=[]
    printJob.value=allJobs.value.filter(el=>el.id==id)
    const type=ref()
    if(printJob.value[0].type){
        type.value="Body"
    }else{
        type.value="Foot"
    }
    const printWindow = window.open('', '', 'height=1000,width=1000')
    printWindow.document.write('<html><head><title>Print Page</title></head><body>');
    printWindow.document.write('<style>');
    printWindow.document.write('@page { size: 58mm 60mm; margin: 0; }'); // Custom A4 size in millimeters
    printWindow.document.write('@media print { body { font-size: 9pt; } }'); // Custom print styles
    printWindow.document.write('.centered-text { text-align: center; }'); // Center-align
    printWindow.document.write('</style>');
    printWindow.document.write('<div id="printable-content" class="centered-text">');
    printWindow.document.write('<p>Room No. : '+printJob.value[0].rooms.roomname+'</p>');
    printWindow.document.write('<p>Massager Code : '+printJob.value[0].massager.mcode+'</p>');
    printWindow.document.write('<p>Massage Time : '+printJob.value[0].startTime+' To '+printJob.value[0].endTime+'</p>');
    printWindow.document.write('<p>Massage Type : '+type.value+'</p>');
    printWindow.document.write('</div>');
    printWindow.document.write('</body></html>');
}

onMounted(()=>{
    getJob()
})

</script>

<style lang="scss" scoped>

</style>