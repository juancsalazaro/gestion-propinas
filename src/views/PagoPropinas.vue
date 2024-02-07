<template>
    <section>
        <div>
            <HeaderPage titulo="Pago de Propinas" />
        </div>
        <SummaryModal :registroPropina="registroPropina" :show="showModal" @close="showModal = false" />
        <div class="board">
            <div class="board-left">
                <div style="display:flex;align-items: center;">
                    <div class="btn-value" @click="handleInputFocus({ inputType: 'totalPropinas' })">
                        <strong>Total de Propinas</strong>
                        <btnValue :value="totalPropinas" />
                    </div>
                    <i @click="handleInputFocus({ inputType: 'totalPropinas' })" class="mdi mdi-pencil"></i>
                </div>
                <br>
                <div>
                    <strong class="subTitle">¿Entre cuantos quieres dividir las <br> Propinas?</strong>
                </div>
                <br>
                <div class="form-divider">
                    <div class="input-number-wrapper">
                        <input type="number" class="input-number" min="0" max="100" step="1" v-model="totalPersonas"
                            @focus="handleInputFocus({ inputType: 'personas' })">
                    </div>
                    <strong style="color:#e45b4f">${{ propinaCorrespondiente }} x Persona</strong>
                </div>
                <br><br>
                <div class="payment-method">
                    <div>
                        <i class="subTitle mdi mdi-wallet-bifold-outline"></i>
                        <strong class="subTitle">Elige el Método de Pago</strong>
                    </div>
                    <div class="payment-methods">
                        <btnPayment
                            @click="handleInputFocus({ inputType: 'metodoPago', paymentSelected: 'Efectivo', iconSelected: 'mdi-cash-multiple' })"
                            text="Efectivo" icon="cash-multiple" :modelValue="isFocused['efectivo']"
                            @update:modelValue="updateIsFocused('efectivo', $event)" />
                        <btnPayment
                            @click="handleInputFocus({ inputType: 'metodoPago', paymentSelected: 'Debito', iconSelected: 'mdi-credit-card-check' })"
                            text="Debito" icon="credit-card-check" :modelValue="isFocused['bbva']"
                            @update:modelValue="updateIsFocused('bbva', $event)" />
                    </div>
                    <div class="payment-methods">
                        <btnPayment
                            @click="handleInputFocus({ inputType: 'metodoPago', paymentSelected: 'Credito', iconSelected: 'mdi-credit-card-check' })"
                            text="Credito" icon="credit-card-check" :modelValue="isFocused['santander']"
                            @update:modelValue="updateIsFocused('santander', $event)" />
                    </div>
                </div>
            </div>
            <div class="board-center">
                <BoardNumeric :inputId="inputSelected" @confirm="handleConfirmBoardNumeric" />
            </div>
            <div class="board-right">
                <div>
                    <strong class="subTitle" style="font-size: 1.5rem;margin-left: 10%;">Pagos</strong>
                </div>
                <PaymentMethodList :items="listItems" @delete="handleDeleteItem" />
            </div>
        </div>
        <div class="footer">
            <FooterPage @add-item="handleConfirmPropinas" :totalPagado="totalPagado" :restantePorPagar="restantePorPagar"
                :valorAPagar="valorAPagar" />
        </div>
    </section>
</template>
  
<script>
import SummaryModal from '@/components/popus/SummaryModal.vue';
import HeaderPage from '@/components/HeaderPage.vue';
import btnValue from '@/components/buttons/btnValue.vue';
import btnPayment from '@/components/buttons/btnPayment.vue';
import BoardNumeric from '@/components/BoardNumeric.vue';
import PaymentMethodList from '@/components/PaymentMethodList.vue';
import FooterPage from '@/components/FooterPage.vue';
import axios from 'axios';

export default {
    components: {
        HeaderPage,
        btnValue,
        btnPayment,
        BoardNumeric,
        PaymentMethodList,
        FooterPage,
        SummaryModal
    },
    data() {
        return {
            totalPropinas: 0,
            totalPersonas: 1,
            propinaCorrespondiente: 0,
            valorAPagar: 0,
            iconSelected: '',
            paymentSelected: '',
            inputSelected: 'totalPropinas',
            isFocused: {
                efectivo: false,
                bbva: false,
                santander: false
            },
            listItems: [],
            totalPagado: 0,
            restantePorPagar: 0,
            registroId: 0,
            showModal: false,
            registroPropina: {
                "ID": 1,
                "Total de Propinas": 4,
                "Número de Personas": 1,
                "Métodos de Pago": "Efectivo - 4",
                "Restante por Pagar": 0,
            }
        };
    },
    methods: {
        updateIsFocused(key, value) {
            console.log(key, value);
            if (!value) {
                this.isFocused[key] = value;
                return;
            }

            for (const buttonKey in this.isFocused) {
                if (buttonKey !== key) {
                    this.isFocused[buttonKey] = false;
                }
            }

            this.isFocused[key] = value;
        },
        handleDeleteItem(index) {
            this.listItems.splice(index, 1);
        },
        handleConfirmBoardNumeric({ inputId, valor }) {
            if (inputId == 'totalPropinas') {
                console.log("ENTRA")
                this.totalPropinas = valor;
                this.propinaCorrespondiente = this.totalPropinas / this.totalPersonas;
                this.restantePorPagar = parseInt(this.totalPropinas);
            } else if (inputId == 'personas') {
                this.totalPersonas = valor;
                this.propinaCorrespondiente = this.totalPropinas / this.totalPersonas;
            } else if (inputId == 'metodoPago') {
                this.valorAPagar = valor;
            }
        },
        handleInputFocus({ inputType, paymentSelected = null, iconSelected = null }) {
            this.inputSelected = inputType;
            console.log(this.inputSelected)
            if (inputType == 'totalPropinas') {
                this.totalPropinas = 0;
            } else if (inputType == 'metodoPago') {
                this.paymentSelected = paymentSelected;
                this.iconSelected = iconSelected;
            }
        },
        addItemToList(newItem) {
            this.listItems.push(newItem);
        },
        handleConfirmPropinas() {
            const newItem = {
                icon: this.iconSelected,
                name: this.paymentSelected,
                value: this.valorAPagar
            };
            this.addItemToList(newItem);

            if (this.registroId === 0) {
                const newItemPost = {
                    totalPropinas: parseInt(this.totalPropinas),
                    numPersonas: this.totalPersonas,
                    metodosPago: [{ tipo: this.paymentSelected, monto: parseInt(this.valorAPagar) }],
                };

                axios.post('http://localhost:3000/pagar-propina', newItemPost)
                    .then(response => {
                        this.registroId = response.data.registro.id;
                        this.totalPagado = response.data.registro.totalPropinas - response.data.restantePorPagar;
                        this.restantePorPagar = response.data.restantePorPagar;
                        this.valorAPagar = 0;
                        for (const key in this.isFocused) {
                            this.isFocused[key] = false;
                        }
                        this.iconSelected = '';
                        this.paymentSelected = '';
                        if (this.restantePorPagar == 0) {
                            this.reset();
                        }
                    })
                    .catch(error => {
                        console.error('Error al realizar la solicitud:', error);
                    });
            } else {
                const newItemPut = {
                    id: this.registroId,
                    metodoPago: { tipoPago: this.paymentSelected, monto: parseInt(this.valorAPagar) },
                };
                console.log(newItemPut)
                axios.put('http://localhost:3000/pagar-propina/' + this.registroId, newItemPut)
                    .then(response => {
                        this.registroId = response.data.registro.id;
                        this.totalPagado = response.data.registro.totalPropinas - response.data.restantePorPagar;
                        this.restantePorPagar = response.data.restantePorPagar;
                        this.valorAPagar = 0;
                        for (const key in this.isFocused) {
                            this.isFocused[key] = false;
                        }
                        this.iconSelected = '';
                        this.paymentSelected = '';
                        if (this.restantePorPagar == 0) {
                            this.reset();
                        }
                    })
                    .catch(error => {
                        console.error('Error al realizar la solicitud:', error);
                    });
            }
        },
        async reset() {
            this.totalPropinas = 0;
            this.totalPersonas = 1;
            this.propinaCorrespondiente = 0;
            this.valorAPagar = 0;
            this.iconSelected = '';
            this.paymentSelected = '';
            this.inputSelected = 'totalPropinas';
            this.isFocused = {
                efectivo: false,
                bbva: false,
                santander: false
            };
            this.listItems = [];
            this.totalPagado = 0;
            this.restantePorPagar = 0;
            this.showModal = true;
            try {
                const response = await axios.get('http://localhost:3000/registro-propina/' + this.registroId);
                this.registroPropina = response.data.registro;
            } catch (error) {
                console.error('Error al obtener el efectivo en caja:', error);
            }
            this.registroId = 0;
        }
    }
};
</script>
  
<style>
.subTitle {
    color: #3d3d3d;
}

.board {
    display: flex;
    width: 100%;
}

.board-left,
.board-center,
.board-right {
    width: 33.3%;
    flex-direction: column;
    padding-top: 5%;
}

.board-left {
    display: flex;
    justify-content: center;
    align-items: center;
}

.board-left i {
    font-size: 30px;
    margin-left: 15px;
    color: #3d3d3d;
}

.board-left strong {
    font-size: 1.5em;
}

.btn-value {
    text-align: start;
    color: #eb6f63;
}

.form-divider {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.input-number-wrapper {
    position: relative;
    width: 100px;
    margin-right: 20px;
}

.input-number {
    width: calc(100% - 40px);
    padding: 8px;
    padding-left: 30px;
    font-size: 1.5rem;
    border: 1px solid #3d3d3d;
    border-radius: 15px;
    outline: none;
    transition: border-color 0.3s;
    color: #eb6f63;
    font-weight: bold;
    min-width: 40px;
}

.payment-method div {
    display: flex;
    align-items: center;
    justify-content: center;
}

.payment-methods {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-self: flex-start;
}

.payment-method i {
    margin-right: 10px;
    margin-left: -10%;
}

.input-number:focus {
    border-color: #eb6f63;
}

.input-number-wrapper::before {
    content: "#";
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    font-size: 1.5rem;
    color: #3d3d3d;
}

.input-number::-webkit-inner-spin-button,
.input-number::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
}

.footer {
    padding: 50px;
    padding-top: 5%;
}
</style>