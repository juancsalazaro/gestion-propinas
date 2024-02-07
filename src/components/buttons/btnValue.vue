<template>
    <button class="btn-value" @click="goBack">
        <strong>${{ value }}</strong>
    </button>
</template>
  
<script>
export default {
    methods: {
        goBack() {
        }
    },
    props: {
        value: {
            type: Number,
            required: true
        }
    }
};
</script>
  
<style scoped>
.btn-value {
    display: flex;
    align-items: center;
    color: #eb6f63;
    background-color: #fbdeda;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 2rem;
    border-radius: 10px;
    min-width: 170px;
    justify-content: center;
}
</style>
  