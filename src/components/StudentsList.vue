<template>
    <div class="max-w-screen-xl mx-auto px-4 md:px-8">
      <div class="items-start justify-between md:flex">
        <div class="max-w-lg">
          <h3 class="text-gray-800 text-xl font-bold sm:text-2xl">Team members</h3>
          <p class="text-gray-600 mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
        </div>
        <div class="mt-3 md:mt-0">
          <a href="javascript:void(0)" class="inline-block px-4 py-2 text-white duration-150 font-medium bg-indigo-600 rounded-lg hover:bg-indigo-500 active:bg-indigo-700 md:text-sm">
            Add member
          </a>
        </div>
      </div>
      <div class="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table class="w-full table-auto text-sm text-left">
          <thead class="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th class="py-3 px-6">Username</th>
              <th class="py-3 px-6">Email</th>
              <th class="py-3 px-6">Position</th>
              <th class="py-3 px-6">Salary</th>
              <th class="py-3 px-6"></th>
            </tr>
          </thead>
          <tbody class="text-gray-600 divide-y">
            <tr v-for="(item, idx) in tableItems" :key="idx">
              <td class="flex items-center gap-x-3 py-3 px-6 whitespace-nowrap">
                <img :src="item.avatar" class="w-10 h-10 rounded-full" />
                <div>
                  <span class="block text-gray-700 text-sm font-medium">{{ item.name }}</span>
                  <span class="block text-gray-700 text-xs">{{ item.email }}</span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ item.phone_nimber }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ item.position }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ item.salary }}</td>
              <td class="text-right px-6 whitespace-nowrap">
                <a href="javascript:void(0)" class="py-2 px-3 font-medium text-indigo-600 hover:text-indigo-500 duration-150 hover:bg-gray-50 rounded-lg">
                  Edit
                </a>
                <button class="py-2 leading-none px-3 font-medium text-red-600 hover:text-red-500 duration-150 hover:bg-gray-50 rounded-lg">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        tableItems: [
          {
            avatar: "https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
            name: "Liam James",
            email: "liamjames@example.com",
            phone_nimber: "+1 (555) 000-000",
            position: "Software engineer",
            salary: "$100K"
          },
          {
            avatar: "https://randomuser.me/api/portraits/men/86.jpg",
            name: "Olivia Emma",
            email: "oliviaemma@example.com",
            phone_nimber: "+1 (555) 000-000",
            position: "Product designer",
            salary: "$90K"
          },
          {
            avatar: "https://randomuser.me/api/portraits/women/79.jpg",
            name: "William Benjamin",
            email: "william.benjamin@example.com",
            phone_nimber: "+1 (555) 000-000",
            position: "Front-end developer",
            salary: "$80K"
          },
          {
            avatar: "https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg",
            name: "Henry Theodore",
            email: "henrytheodore@example.com",
            phone_nimber: "+1 (555) 000-000",
            position: "Laravel engineer",
            salary: "$120K"
          },
          {
            avatar: "https://images.unsplash.com/photo-1439911767590-c724b615299d?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ",
            name: "Amelia Elijah",
            email: "amelia.elijah@example.com",
            phone_nimber: "+1 (555) 000-000",
            position: "Open source manager",
            salary: "$75K"
          }
        ]
      }
    }
  }
  </script>