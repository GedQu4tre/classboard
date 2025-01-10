<template>
    <div class="flex flex-col bg-gray-50">
        <div class="bg-white border border-zinc-100 shadow-sm py-3 px-10">
            <h3 class="font-bold text-2xl text-indigo-950">Gestionnaire des employés et enseignant</h3>
        </div>
        <div class="h-full overflow-hidden">
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
import TeachersList from './TeachersList.vue'
import TeachersAdd from './TeachersAdd.vue'
import TeachersDetail from './TeachersDetail.vue'
import TeachersUpdate from './TeachersUpdate.vue'

export default {
    name: 'StudentsAdmin',
    components: {TeachersList, TeachersAdd, TeachersDetail, TeachersUpdate},
    data() {
        return {
            navigation: ['TeachersList', ],
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