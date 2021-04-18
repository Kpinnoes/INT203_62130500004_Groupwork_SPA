<template>
    <div
    class=" flex justify-center items-center fixed z-50 inset-0 overflow-y-auto"
  >
    <div class="w-5/12 h-96 bg-white rounded-3xl shadow-lg ">
      <div class="cursor-pointer mt-4  mr-8  focus:ring transform transition hover:scale-105 
      duration-300 ease-out  mr-4 flex flex-row-reverse   " @click="close">
        <span class="material-icons  ">
          close
          </span>
      </div>
      <img
        class=" ml-2 w-72 h-72 transform -rotate-6 transition 
  hover:scale-105 duration-700 ease-in-out hover:rotate-6" :src="friend.image"
      />
 
      <div class="w-96 flex flex-row-reverse ml-64 text-left">
    
         
    
        <div
          class=" ml-12 -mt-72  mr-16  ext-left block text-gray-800 
            py-2 font-bold mt-2 items-start"
        >
       
          <p class="my-2 text-black">
            Name : <input class="shadow text-left justify-start appearance-none border rounded w-56 h-4 p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out" type="text" placeholder="input your name.." 
             v-if="isEdit"
              id="username" 
              name="username" v-model="usernameEnter"
            />
            <span v-else class="text-pink-500"> {{ friend.username }} </span>
          </p>

          <p class="my-2 text-black ">
            E-mail : <input class="shadow text-left justify-start appearance-none border rounded w-56 h-4 p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out" type="text" placeholder="input your name.." 
            v-if="isEdit"
             id="email" 
             name="email" v-model="emailEnter"
           />
           <span  v-else class=" text-pink-500">{{ friend.email }} </span>
          </p>

          <p class="my-2 text-black ">
            Describe :<textarea class="shadow text-left justify-start appearance-none border h-24 rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out" type="text" placeholder="input your name.." 
            v-if="isEdit"
             id="describe" 
             name="describe" v-model="describeEnter"
           />
           <span  v-else class=" text-pink-500">{{
              friend.describe
            }}</span>
          </p>
        </div>
      </div>
      <div class=" flex flex-row-reverse mr-4">
        <button
          class="justify-center btn btn-primary mt-2 bg-gradient-to-b from-green-500 
    to-green-800 hover:from-blue-500 hover:to-green-500 text-white font-bold 
    py-2 px-4 rounded focus:ring transform transition hover:scale-105 
    duration-300 ease-in-out "
          type="button "
          @click.prevent="submit(friend)">
          Submit
        </button>


        <button
          class="mx-4 justify-center btn btn-primary mt-2 bg-gradient-to-b from-blue-500 
  to-blue-800 hover:from-pink-500 hover:to-blue-500 text-white font-bold 
  py-2 px-4 rounded focus:ring transform transition hover:scale-105 
  duration-300 ease-in-out "
          type="button " 
          @click="edit" 
        >
          Edit
        </button>
      </div>
    </div>
  </div>
</template>
<script>
    export default {   
     data() {
    return {
      usernameEnter: "",
      emailEnter: "",
      describeEnter: "",
      isEdit: false
      
    };
  },
        props: ["friend"],
        methods: {
           close(){

            this.$emit("close-popup", false);
            this.isEdit = false;

           },
           edit(){
             this.isEdit = true;
             this.usernameEnter = this.friend.username ;
             this.emailEnter = this.friend.email;
             this.describeEnter = this.friend.describe;
           },
           submit(friend){
               if(this.isEdit){ 
               this.$emit("friend-submit", { 
                image: friend.image,
                username:  this.usernameEnter ,
                email:    this.emailEnter ,
                describe:    this.describeEnter,
                id: friend.id });
               this.close();
              } 

           }
        }
    }

    </script>