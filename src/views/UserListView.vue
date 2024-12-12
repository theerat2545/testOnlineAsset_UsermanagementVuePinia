<template>
  <div class="p-4 bg-white shadow rounded-md">
    <h2 class="text-2xl font-bold mb-4">User List</h2>
    <table class="table-auto w-full border-collapse border border-gray-300">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 px-4 py-2 text-left">Email</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Name</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Age</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Gender</th>
          <th class="border border-gray-300 px-4 py-2 text-left">Phone</th>
          <th class="border border-gray-300 px-4 py-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="odd:bg-white even:bg-gray-50">
          <td class="border border-gray-300 px-4 py-2">{{ user.email }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ user.firstname }} {{ user.lastname }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ user.age }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ user.gender }}</td>
          <td class="border border-gray-300 px-4 py-2">{{ user.phone }}</td>
          <td class="border border-gray-300 px-4 py-2 text-center">
            <div class="space-x-2">
              <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" @click="ViewUser(user.id)">
                View
              </button>
              <button class="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600" @click="editUser(user.id)">
                Edit
              </button>
              <button class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600" @click="deleteUser(user.id)">
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600" @click="addNewUser">
      Add User
    </button>
  </div>

  <Modal
  :isVisible="showModal"
  :headerName="'View User'"
  @close="closeModal"
>
  <template #body>
    
        <div class="flex justify-center">
          <img
            class="w-24 h-24 object-cover rounded-full border-2 border-white"
            :src="selectedUser?.profilePicture || '../../public/profile/image.png'"
            alt="Profile Picture"
          />
        </div>
    <div v-if="selectedUser">
      <h2 class="text-2xl font-semibold text-gray-800 text-center mt-4">
        {{ selectedUser.firstname }} {{ selectedUser.lastname }}
      </h2>
      <p class="text-gray-600 text-center">Age: {{ selectedUser.age }} Gender: {{ selectedUser.gender }}</p>
      <p class="text-gray-600 text-center mt-2">{{ selectedUser.email }}</p>
      <p class="text-gray-600 text-center mt-2">{{ selectedUser.phone }}</p>
    </div>
  </template>
  <template #footer>
    <button @click="closeModal" class="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
    > Close </button>
  </template>
</Modal>
</template>

<script setup>
import Modal from '../components/Modal.vue'
import { ref, onMounted, computed } from 'vue'; // Ensure computed is also imported
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router'; // Import useRouter

const userStore = useUserStore();
const router = useRouter(); // Initialize router

const selectedUser = ref(null);
const errorMessage = ref(null);


onMounted(() => {
  userStore.fetchUsers(); // Fetch users on component load
});

const users = computed(() => userStore.users);
const showModal = ref(false);

const editUser = (userId) => {
  router.push(`/edit/${userId}`);
};

const deleteUser = async (userId) => {
  if (confirm('Are you sure you want to delete this user?')) {
    try {
      await userStore.removeUser(userId);
    } catch (error) {
      errorMessage.value = 'Failed to delete the user.';
    }
  }
};

const addNewUser = () => {
  router.push('/add');
};


const ViewUser = (userId) => {
  selectedUser.value = userStore.users.find((user) => user.id === userId);
  showModal.value = true;
};

const closeModal = () => {
  selectedUser.value = null;
  showModal.value = false;
};

</script>
