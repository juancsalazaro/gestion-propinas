<template>
    <div class="list">
        <div class="list-item" v-for="(item, index) in items" :key="index">
            <div class="item-icon">
                <i :class="'mdi ' + item.icon"></i>
            </div>
            <div class="item-info">
                <div class="item-name">{{ item.name }}</div>
                <div class="item-value"><strong>${{ item.value }}</strong></div>
            </div>
            <button class="delete-button" @click="deleteItem(index)">
                <i class="mdi mdi-24px mdi-close"></i>
            </button>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    methods: {
        deleteItem(index) {
            this.$emit('delete', index);
        }
    }
};
</script>
  
<style scoped>
.list {
    width: 100%;
}

.list-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    align-items: center;
    justify-content: center;
    color: #3d3d3d;
    background-color: #ffffff;
    border: none;
    padding: 10px 18px;
    margin: 10px 18px;
    cursor: pointer;
    font-size: 1.5rem;
    border-radius: 10px;
    -webkit-box-shadow: 0px 5px 15px 1px rgba(153, 153, 153, 0.99);
    -moz-box-shadow: 0px 5px 15px 1px rgba(153, 153, 153, 0.99);
    box-shadow: 0px 5px 15px 1px rgba(153, 153, 153, 0.99);
    min-width: 115px;
}

.item-icon {
    margin-right: 10px;
}

.item-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;
}

.item-name {
    font-weight: bold;
}

.item-value {
    color: #3d3d3d;
    font-weight: bold;
}

.delete-button {
    border: none;
    background: none;
    cursor: pointer;
    color: #e64031;
}

.delete-button i {
    font-weight: bold;
}
</style>
  