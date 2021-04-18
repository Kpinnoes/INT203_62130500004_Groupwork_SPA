<template>

<div class="flex flex-row flex-wrap">

<div v-for="friend in friends" :key="friend.id" > 
  <blog-friend @friend-popup="toggleVisibility" :friend="friend" @delete="deleteFriend" ></blog-friend></div> 

</div>  
<div class="details" v-show="isVisible">
<popup @friend-submit="edit" @close-popup="closePopup" :friend="friendPopup"></popup>
</div>
</template>
<script>

 

import BlogFriend from './BlogFriend.vue'
import Popup from './Popup.vue'
export default {
  components: {
   BlogFriend,Popup
  },
  data(){
    return {
      friendPopup: [],
      isVisible: false,
      ifEdit: false,
     friends: [],
     url: "http://localhost:3000/friends"
    }
  },
  methods:{  
   async edit(friend){
      try {
        const res = await fetch(`${this.url}/${friend.id}`, {
          method: 'PUT',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify({
            image: friend.image,
            username:  friend.username,
            email:  friend.email,
            describe:  friend.describe
          })
        })
        const data = await res.json()
        this.friends = this.friends.map((f) =>
          f.id === data.id
            ? { ...f, 
            image: data.image,
            username:  data.username,
            email:  data.email,
            describe:  data.describe
            }
            : f
        )
      } catch (error) {
        console.log(`Could not edit! ${error}`)
      }
    } ,
    closePopup(fals){
      this.isVisible = fals;
      this.friendPopup = " ";
    },
    toggleVisibility(friend) {
      this.isVisible = true;
      this.friendPopup = friend;

    },
    async deleteFriend(payload) {
            try {
                await fetch(`${this.url}/${payload}`, {
                    method: 'DELETE'
                })
                this.friends = this.friends.filter(friend => {
        return friend.id !== payload;
      });  } catch (error) {
                console.log(error)
            }
        },
    async fetchFriends() {
      const res= await fetch(this.url)
      const data=await res.json()
      return data}
    
}
, async created() {
  this.friends = await this.fetchFriends()
}
  
}
</script>
