<template>
    <div class="max-w-xs bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-neutral-800 dark:border-neutral-700" role="alert" tabindex="-1" aria-labelledby="hs-toast-stack-toggle-update-label">
        <div class="flex p-4">
            <div class="shrink-0">
                <component :class="variant === 'success' ? 'text-green-500' : 'text-red-500'" class="size-5" :is="variantIcon"></component>
            </div>
            
            <div class="ms-3">
                <p id="hs-toast-stack-toggle-update-label" :class="variant === 'success' ? 'text-green-500' : 'text-red-500'" class="text-sm text-gray-700 dark:text-neutral-400">
                    {{ message }}
                </p>
            </div>

            <div class="shrink-0 ms-10">
                <button title="Fermer" @click.prevent="$emit('closeToast')"><XMarkIcon class="size-4 text-gray-800" /></button>
            </div>
        </div>
    </div>
</template>

<script>
import {CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XMarkIcon} from '@heroicons/vue/20/solid'
export default {
    components: {CheckCircleIcon, ExclamationCircleIcon, InformationCircleIcon, XMarkIcon},
    props: ['variant', 'message'],
    name: 'ToastSuccess',
    data() {
        return {

        }
    },
    computed: {
        variantIcon() {
            if (this.variant === 'info') {return 'InformationCircleIcon' }
            else if (this.variant === 'error') {return 'ExclamationCircleIcon' } 
            else if (this.variant === 'success') { return 'CheckCircleIcon' }
        }
    }
}
</script>