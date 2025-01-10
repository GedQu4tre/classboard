<template>
    <div class="h-screen flex bg-blue-50">
        <SideBar class="" />
        <component class="flex-grow" :is="currentView"></component>
    </div>
</template>

<script>
import SideBar from '../components/SideBar.vue'
import HomeAdmin from '../components/HomeAdmin.vue'
import StudentsAdmin from '../components/StudentsAdmin.vue'
import FraisAdmin from '../components/FraisAdmin.vue'
import TeachersAdmin from '../components/TeachersAdmin.vue'
import HoraireAdmin from '../components/HoraireAdmin.vue'
import OnlyPremium from '../components/OnlyPremium.vue'
import SchoolsAdmin from '../components/SchoolsAdmin.vue'
export default {
    name: 'IndexView',
    components: {SideBar, HomeAdmin, StudentsAdmin, FraisAdmin, TeachersAdmin, HoraireAdmin, OnlyPremium, SchoolsAdmin},
    data() {
        return {
            navigation: 'StudentsAdmin'
        }
    },
    computed: {
        currentView() {
            return this.$store.state.currentView
        }
    }
}
</script>