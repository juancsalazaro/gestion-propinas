<template>
    <div class="navbar">
        <div class="navbar-section section-logo">
            <div class="logo">
                <img src="@/assets/logoSoftii.png" alt="LogoSofti">
            </div>
        </div>
        <div class="navbar-section section-icons">
            <div class="icon" :class="{ 'focussed': focusedIcon === icon }" v-for="(icon, index) in middleIcons"
                :key="index" @click="toggleFocus(icon)">
                <i class="mdi mdi-36px" :class="'mdi-' + icon"></i>
            </div>
        </div>
        <div class="navbar-section section-logout">
            <div class="icon" :class="{ 'focussed': focusedIcon === icon }" v-for="(icon, index) in middleIcons2"
                :key="index" @click="toggleFocus(icon)">
                <i class="mdi mdi-36px" :class="'mdi-' + icon"></i>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            middleIcons: [
                'cash', 'finance', 'calculator', 'credit-card', 'chart-line',
                'wallet', 'bank', 'currency-usd', 'cart-outline', 'shopping-search-outline'
            ],
            middleIcons2: [
                'cog', 'logout'
            ],
            focusedIcon: 'calculator'
        };
    },
    methods: {
        toggleFocus(icon) {
            this.focusedIcon = icon === this.focusedIcon ? null : icon;
        }
    }
};
</script>
  
<style scoped>
.navbar {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.navbar-section {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    height: 75%;
}

.icon {
    margin: 10px 0;
    color: #c2c2c2;
    cursor: pointer;
}

.focussed {
    color: #ffffff;
    background-color: #eb6f63;
    border-radius: 15px;
    padding: 5px 10px;
}

.section-logo {
    justify-content: flex-start;
    padding-top: 10px;
}

.section-logo {
    height: 15%;
}

.section-logout {
    justify-content: flex-end;
    height: 20%;
}
</style>