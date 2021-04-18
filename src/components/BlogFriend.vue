<template>
  <div
    class="bg-white hover:bg-blue-100 m-12 h-96 w-96 shadow-lg rounded-lg pb-4 "
  >
    <img
      class="ml-12 w-72 h-72 transform -rotate-6 transition hover:scale-105 duration-700 ease-in-out hover:rotate-6"
      :src="friend.image"
    />

    <span
      class="text-gray-600 font-sans text-xl
  py-2 font-bold mb-2 "
      >{{ friend.username }}</span
    >
    <br />
    <button
      class=" btn btn-primary mt-2 bg-gradient-to-r from-green-500 
  to-green-800 hover:from-blue-500 hover:to-pink-500 text-white font-bold 
  py-2 px-4 rounded focus:ring transform transition hover:scale-105 
  duration-300 ease-in-out"
      type="button "
      @click="toggleVisibility"
    >
      See More
    </button>

    <button
      class="mt-2 ml-4 bg-gradient-to-r from-red-500 to-red-500 hover:from-pink-500 hover:to-red-500 text-white font-bold py-2 px-4 rounded focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
      @click="deleteList(friend.id)"
      type="button"
    >
      Delete
    </button>
    
  </div>
</template>
<script>

export default {
  components: {

  },
  name: "BlogFriend",
  props: ["friend"],
  friends: Array,
  
  methods: {
    deleteList(id) {
      this.$emit("delete", id);
    },
    toggleVisibility() {
      this.$emit("friend-popup", this.friend);
    }, 
  },
};
</script>
