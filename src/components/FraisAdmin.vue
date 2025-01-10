<template>
    <div class="flex flex-col bg-gray-50">
        <div class="bg-white border border-zinc-100 shadow-sm py-3 px-10">
            <h3 class="font-bold text-2xl text-indigo-950">Gestionnaire des frais scolaires</h3>
        </div>
        <div class="h-full overflow-hidden">
            <component 
                :is="navigation[navigation.length - 1]"
                @changeComponent="changeComponent"
                @removeComponent="removeComponent"
                @showUpdateFee="showUpdateFee"
                :fee="currentFee"
            ></component>
        </div>
    </div>
</template>
    
<script>
import FraisList from './FraisList.vue';
import FraisAdd from './FraisAdd.vue';
import FraisDetail from './FraisDetail.vue';
import FraisUpdate from './FraisUpdate.vue';

export default {
    name: 'FraisAdmin',
    components: { FraisList, FraisAdd, FraisDetail, FraisUpdate },
    data() {
        return {
            navigation: ['FraisList'],
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
