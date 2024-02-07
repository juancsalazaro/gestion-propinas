<template>
    <button class="btn-payment" :class="{ 'focussed': modelValue }" @click="toggleFocus">
        <i class="mdi" :class="'mdi-' + icon"></i>
        <strong>{{ text }}</strong>
    </button>
</template>
  
<script>
export default {
    props: {
        modelValue: Boolean,
        text: String,
        icon: String
    },
    methods: {
        toggleFocus() {
            this.$emit('update:modelValue', !this.modelValue);
        }
    }
};
</script>
  
<style scoped>
.btn-payment {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #3d3d3d;
    background-color: #ffffff;
    border: none;
    padding: 10px 18px;
    margin: 10px 18px;
    cursor: pointer;
    font-size: 1rem;
    border-radius: 10px;
    -webkit-box-shadow: 0px 5px 15px 1px rgba(153, 153, 153, 0.99);
    -moz-box-shadow: 0px 5px 15px 1px rgba(153, 153, 153, 0.99);
    box-shadow: 0px 5px 15px 1px rgba(153, 153, 153, 0.99);
    min-width: 115px;
}

.btn-payment i {
    margin: 0px;
    color: #3d3d3d;
}

.focussed {
    color: #ffffff;
    background-color: #eb6f63;
}

.focussed i {
    color: #ffffff;
}
</style>
  