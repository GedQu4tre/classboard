<template>
    <div class="p-6">
        <h2 class="text-xl font-bold mb-4">Modifier le Frais</h2>
        <div class="mb-4">
            <label class="block mb-1 text-sm font-medium">Nom du Frais</label>
            <input v-model="updatedFee.name" type="text" class="w-full border border-gray-300 rounded-md px-2 py-1">
        </div>
        <div class="mb-4">
            <label class="block mb-1 text-sm font-medium">Montant (USD)</label>
            <input v-model="updatedFee.amount" type="number" class="w-full border border-gray-300 rounded-md px-2 py-1">
        </div>
        <div class="flex justify-end space-x-2">
            <button @click="$emit('removeComponent')" class="bg-gray-500 text-white px-4 py-2 rounded-md">Annuler</button>
            <button @click="updateFee" class="bg-blue-500 text-white px-4 py-2 rounded-md">Sauvegarder</button>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FraisUpdate',
    props: {
        fee: Object
    },
    data() {
        return {
            updatedFee: { ...this.fee }
        };
    },
    methods: {
        updateFee() {
            this.$emit('changeComponent', 'FraisList', this.updatedFee);
        }
    }
};
</script>
