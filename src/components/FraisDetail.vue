<template>
    <div class="p-6">
        <h2 class="text-xl font-bold mb-4">Détail du Frais</h2>
        <p><strong>Nom:</strong> {{ fee.name }}</p>
        <p><strong>Montant:</strong> {{ fee.amount }} USD</p>
        <button @click="$emit('removeComponent')" class="bg-gray-500 text-white px-4 py-2 rounded-md mt-4">Retour</button>
    </div>
</template>

<script>
export default {
    name: 'FraisDetail',
    props: {
        fee: Object
    }
};
</script>
