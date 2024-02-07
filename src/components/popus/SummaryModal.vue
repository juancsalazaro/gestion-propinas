<template>
    <div class="modal" v-if="show">
        <div class="modal-content">
            <h2 style="color:#eb6f63">Resumen de Compra</h2>
            <h3><strong>Total de Propinas:</strong> <span style="color:#eb6f63">${{ registroPropina.totalPropinas }}</span>
            </h3>
            <h3><strong>Número de Personas:</strong> <span style="color:#eb6f63">{{ registroPropina.numPersonas
            }}</span></h3>
            <h2>Métodos de Pago:</h2>
            <ul>
                <li v-for="metodo in registroPropina.metodosPago" :key="metodo.tipo">
                    <h3><strong>{{ metodo.tipo }} - <span style="color:#eb6f63">${{ metodo.monto }}</span></strong></h3>
                </li>
            </ul>
            <br />
            <button class="btn-value2" @click="close">
                <strong>Cerrar</strong>
            </button>
        </div>
    </div>
</template>
  
<script>

export default {
    props: {
        show: Boolean,
        registroPropina: Object
    },
    methods: {
        close() {
            this.$emit('close');
        }
    }
};
</script>
  
<style>
.modal {
    display: block;
    position: fixed;
    z-index: 99;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 30%;
    border-radius: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
}

.close:hover,
.close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

.container {
    max-width: 600px;
    margin: 20px auto;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 20px;
}

.modal h1,
h2,
h3 {
    color: #333;
}

.modal h2 {
    border-bottom: 2px solid #333;
    padding-bottom: 10px;
    margin-bottom: 20px;
}

.modal p {
    margin: 10px 0;
}

.modal ul {
    padding-left: 20px;
}

.modal li {
    list-style-type: none;
}

.total {
    font-size: 1.2em;
    font-weight: bold;
    color: #009688;
}

.btn-value2 {
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
  