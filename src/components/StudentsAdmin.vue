<template>
    <div class="flex flex-col bg-gray-100">
        <div class="bg-white border border-zinc-100 shadow-sm py-3 px-10">
            <h3 class="font-bold text-2xl text-indigo-950">Gestionnaire des élèves</h3>
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
import StudentsList from './StudentsList.vue'
import StudentsAdd from './StudentsAdd.vue'
import StudentsDetail from './StudentsDetail.vue'
import StudentsUpdate from './StudentsUpdate.vue'

export default {
    name: 'StudentsAdmin',
    components: {StudentsList, StudentsAdd, StudentsDetail, StudentsUpdate},
    data() {
        return {
            navigation: ['StudentsList', ],
            currentStudent: null
        }
    },
    methods: {
        changeComponent(newComponent, value) {
            this.currentStudent = value;
            this.navigation.push(newComponent)
        },
        removeComponent() {
            this.navigation.pop()
        },
        showUpdateStudent() {
            this.navigation.push('StudentsUpdate')
        }
    }
}
</script>