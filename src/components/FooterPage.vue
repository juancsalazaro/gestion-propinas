<template>
    <footer class="footer">
        <div class="">
            <div>
                <strong style="color:#ed6a5a">Total Pagado: ${{ totalPagado }}</strong>
            </div>
            <div>
                <strong>Restante por Pagar: ${{ restantePorPagar }}</strong>
            </div>
        </div>
        <div>
            <button @click="addItem" class="btn-value" :class="{ 'btn-value-offfocus': valorAPagar === 0 }">
                <strong>Pagar ${{ valorAPagar }} en Propinas</strong>
            </button>
        </div>
    </footer>
</template>
  
<script>
export default {
    name: 'FooterPage',
    props: {
        totalPagado: {
            type: Number,
            required: true
        },
        restantePorPagar: {
            type: Number,
            required: true
        },
        valorAPagar: {
            type: Number,
            required: true
        }
    }, methods: {
        addItem() {
            this.$emit('add-item');
        }
    }
};
</script>
  
<style scoped>
.footer {
    display: flex;
    widows: 100%;
    justify-content: space-around;
    padding: 10px;
    font-size: 2rem;
}

.btn-value {
    display: flex;
    align-items: center;
    color: #ffffff;
    background-color: #ed6a5a;
    border: none;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 2rem;
    border-radius: 10px;
    min-width: 170px;
    justify-content: center;
}

.btn-value-offfocus {
    color: #c2c2c2;
    background-color: #ffffff;
    border: 1px solid #c2c2c2;
}
</style>
  