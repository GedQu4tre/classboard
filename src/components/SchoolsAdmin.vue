<template>
    <div class="flex flex-col bg-gray-100">
        <div class="bg-white border border-zinc-100 shadow-sm py-3 px-10">
            <h3 class="font-bold text-2xl text-indigo-950">Gestionnaire des écoles</h3>
        </div>
        <div class="h-full overflow-hidden flex justify-center">
            <component 
                :is="navigation[navigation.length - 1]"

                @changeComponent="changeComponent"
                @removeComponent="removeComponent()"

                @showUpdateStudent="showUpdateStudent"

                :student = currentStudent
            ></component>
        </div>
    </div>
</template>
    
<script>
import SchoolsList from './SchoolsList.vue';
import SchoolsAdd from './SchoolsAdd.vue'

export default {
    name: 'FraisAdmin',
    components: { SchoolsList, SchoolsAdd },
    data() {
        return {
            navigation: ['SchoolsList'],
            currentFee: null
        };
    },
    methods: {
        changeComponent(newComponent, value) {
            this.currentFee = value;
            this.navigation.push(newComponent);
        },
        removeComponent() {
            this.navigation.pop();
        },
        showUpdateFee() {
            this.navigation.push('FraisUpdate');
        }
    }
}
</script>
