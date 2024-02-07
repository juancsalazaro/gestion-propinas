<template>
    <button class="btn-back" @click="goBack">
        <i class="mdi mdi-24px mdi-chevron-left"></i>
        <span>Atrás</span>
    </button>
</template>
  
<script>
export default {
    methods: {
        goBack() {
        }
    }
};
</script>
  
<style scoped>
.btn-back {
    display: flex;
    align-items: center;
    background-color: transparent;
    color: #eb6f63;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 15px;
}

.btn-back i {
    color: #eb6f63;
}
</style>
  