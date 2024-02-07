<template>
    <header class="header">
        <div class="header-title">
            <btnBack />
            <h2 style="color:#3d3d3d">{{ titulo }}</h2>
        </div>
        <div class="header-value">
            <strong>Efectivo en Caja</strong>
            <btnValue :value="efectivoEnCaja" />
        </div>
    </header>
</template>

<script>
import btnBack from '@/components/buttons/btnBack.vue';
import btnValue from '@/components/buttons/btnValue.vue';
import axios from 'axios';

export default {
    name: 'HeaderPage',
    components: {
        btnBack,
        btnValue
    },
    props: {
        titulo: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            efectivoEnCaja: '0.00' // Valor inicial
        };
    },
    mounted() {
        this.obtenerEfectivoEnCaja();
    },
    methods: {
        async obtenerEfectivoEnCaja() {
            try {
                const response = await axios.get('http://localhost:3000/efectivo-en-caja');
                this.efectivoEnCaja = response.data.efectivoEnCaja;
            } catch (error) {
                console.error('Error al obtener el efectivo en caja:', error);
            }
        }
    }
};
</script>

<style scoped>
.header {
    padding: 10px;
    text-align: center;
    display: flex;
    justify-content: space-between;
    border-bottom: 1.5px solid #999999;
}

.header {
    display: flex;
}

.header .header-title {
    display: flex;
}

.header .header-value {
    text-align: end;
    color: #eb6f63;
}

.header .header-value strong {
    padding-right: 10px;
}
</style>
