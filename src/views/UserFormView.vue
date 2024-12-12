<template>
  <div class="p-6 bg-white shadow rounded-md max-w-lg mx-auto">
    <h2 class="text-2xl font-bold mb-6">{{ isEditing ? 'Edit User' : 'Add User' }}</h2>
    <form @submit.prevent="saveUser" class="space-y-4">
      <div>
        <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
        <input
          id="email"
          type="email"
          v-model="user.email"
          required
          class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <!-- First Name -->
      <div>
        <label for="firstname" class="block text-sm font-medium text-gray-700">First Name:</label>
        <input
          id="firstname"
          v-model="user.firstname"
          required
          class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      
      <!-- Last Name -->
      <div>
        <label for="lastname" class="block text-sm font-medium text-gray-700">Last Name:</label>
        <input
          id="lastname"
          v-model="user.lastname"
          required
          class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Age -->
      <div>
        <label for="age" class="block text-sm font-medium text-gray-700">Age:</label>
        <input
          id="age"
          type="number"
          v-model="user.age"
          required
          class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Gender -->
      <div>
        <label for="gender" class="block text-sm font-medium text-gray-700">Gender:</label>
        <select
          id="gender"
          v-model="user.gender"
          required
          class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="" disabled>Select Gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <!-- Phone -->
      <div>
        <label for="phone" class="block text-sm font-medium text-gray-700">Phone:</label>
        <input
          id="phone"
          type="tel"
          v-model="user.phone"
          required
          class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Profile Picture -->
      <div>
        <label for="profile-picture" class="block text-sm font-medium text-gray-700">Profile Picture:</label>
        <input
          id="profile-picture"
          type="file"
          @change="handleFileUpload"
          class="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Profile Picture Preview -->
      <div v-if="imagePreview" class="mt-4 text-center">
        <img :src="imagePreview" alt="Profile Picture Preview" class="w-32 h-32 object-cover rounded-full border-2 border-gray-300"/>
      </div>

      <button type="submit" class="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
        Save
      </button>
    </form>
  </div>
</template>

<script setup>
import { useUserStore } from '../stores/user';
import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';

const userStore = useUserStore();
const route = useRoute();
const router = useRouter();

const isEditing = computed(() => !!route.params.id);
const user = ref(
  isEditing.value
    ? { ...userStore.users.find(u => u.id === Number(route.params.id)) }
    : { id: Date.now(), email: '', firstname: '', lastname: '', age: '', gender: '', phone: '', profilePicture: '' }
);

const imagePreview = ref(null);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      imagePreview.value = reader.result;
      user.value.profilePicture = reader.result;  // Store the base64 image in the user object
    };
    reader.readAsDataURL(file);
  }
};

const saveUser = async () => {
  if (isEditing.value) {
    await userStore.updateUser(user.value);
  } else {
    await userStore.addUser(user.value);
  }
  router.push('/');
};
</script>
