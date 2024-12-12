import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
  }),
  actions: {
    async fetchUsers() {
      try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        this.users = await response.json();
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    async fetchUserById(userId) {
      try {
        const response = await fetch(`http://localhost:3000/users/${userId}`);
        if (!response.ok) throw new Error('Failed to fetch user');
        return await response.json();
      } catch (error) {
        console.error('Error fetching user:', error);
        return null;
      }
    },
    async addUser(user) {
      try {
        const response = await fetch('http://localhost:3000/users/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error('Failed to add user');
        const newUser = await response.json();
        this.users.push(newUser);
      } catch (error) {
        console.error('Error adding user:', error);
      }
    },
    async updateUser(user) {
      try {
        const response = await fetch(`http://localhost:3000/users/update/${user.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error('Failed to update user');
        const updatedUser = await response.json();
        const index = this.users.findIndex((u) => u.id === updatedUser.id);
        if (index !== -1) {
          this.users[index] = updatedUser;
        }
      } catch (error) {
        console.error('Error updating user:', error);
      }
    },
    async removeUser(userId) {
      try {
        const response = await fetch(`http://localhost:3000/users/delete/${userId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete user');
        this.users = this.users.filter((user) => user.id !== userId);
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    },
  },
});
