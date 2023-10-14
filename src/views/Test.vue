<template>
  <div>
    <div id="printable-content">
      <!-- <p>This is the content that will be printed.</p> -->
    </div>
    <button @click="printContent">Print Page</button>
</div>
</template>

<script setup>
  const printContent=()=> {
          const printWindow = window.open('', '', 'height=1000,width=1000')
          // const printWindow = window.open('', 'Print Window', 'width=600,height=400,resizable=yes,scrollbars=yes');
          
    // const printWindow = window.open('', 'Print Window', 'width=600,height=400,resizable=yes,scrollbars=yes');
    printWindow.document.write('<html><head><title>Print Page</title></head><body>');
    printWindow.document.write('<style>');
    printWindow.document.write('@page { size: 30mm 30mm; margin: 0; }'); // Custom A4 size in millimeters
    printWindow.document.write('@media print { body { font-size: 9pt; } }'); // Custom print styles
    printWindow.document.write('.centered-text { text-align: center; color:red; }'); // Center-ali
    printWindow.document.write('</style>');
    printWindow.document.write('<div id="printable-content" class="centered-text">');
    printWindow.document.write('<p>This is the content that will be printed.'+'p</p>');
    printWindow.document.write('<p>This is the content</p>');
    printWindow.document.write('</div>');
    printWindow.document.write('</body></html>');
    // printWindow.print();
    // printWindow.close();
  
    }
</script>

<style lang="scss" scoped>

</style>