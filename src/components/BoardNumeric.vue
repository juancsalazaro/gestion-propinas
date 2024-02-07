<template>
    <div class="calculator">
        <div class="toolbar">
            <input type="text" v-model="inputValue" readonly>
            <button class="btn-delete" @click="handleClear">⌫</button>
        </div>
        <div class="keyboard">
            <div class="row" v-for="row in keyboardLayout" :key="row">
                <button v-for="key in row" :key="key" @click="handleKeyPress(key)">{{ key }}</button>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            inputValue: '',
            keyboardLayout: [
                ['1', '2', '3'],
                ['4', '5', '6'],
                ['7', '8', '9'],
                ['00', '0', '✅']
            ]
        };
    },
    props: {
        inputId: {
            type: String,
            required: true
        }
    },
    methods: {
        handleKeyPress(key) {
            if (key === '✅') {
                this.handleConfirm();
                return;
            }
            if (key === '⌫') {
                // Eliminar el último carácter del valor de entrada
                this.inputValue = this.inputValue.slice(0, -1);
            } else {
                // Agregar el carácter al valor de entrada
                if (this.inputValue.length < 10) { // Limita el número de caracteres
                    this.inputValue += key;
                }
            }
        },
        handleClear() {
            // Limpiar el valor de entrada
            this.inputValue = '';
        },
        handleConfirm() {
            const valorConfirmado = this.inputValue;
            this.$emit('confirm', { inputId: this.inputId, valor: valorConfirmado });
            this.inputValue = '';
        }
    }
};
</script>
  
<style scoped>
.calculator {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #e6e6e6;
    padding: 35px;
    border-radius: 15px;
    max-width: 450px;
}

.toolbar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 10px;
}

input {
    height: 40px;
    margin-right: 10px;
    text-align: right;
    padding: 5px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid;
    font-size: 1rem;
    font-weight: bold;
}

.btn-delete {
    background-color: transparent;
    border: none;
}

.keyboard {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: 15px;
}

.keyboard button {
    margin: 10px;
    /* Si deseas un margen interno dentro de cada botón */
}

.row {
    display: flex;
    justify-content: space-around;
}

.confirm-row {
    display: flex;
    justify-content: center;
}

button {
    width: 80px;
    height: 60px;
    font-size: 1.5rem;
    background-color: #f0f0f0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #ccc;
}
</style>
  