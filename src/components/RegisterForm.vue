<template>
<div>
      <div class="bg-white text-left  w-full shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
            <label class="block text-center text-black text-xl py-2 font-bold mb-2" for="emailaddress">
              Add profile to become my friends.
            </label>
          
          <form @submit="onFormSubmit">
            <div class="form-group">
              <label class="text-left block text-blue-600 
              py-2 font-bold mt-2 items-start" htmlFor="username"> Username</label>
              <input
              class="shadow text-left justify-start appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                type="text" placeholder="input your name.."
                :class="getInputClass('username')"
                id="username"
                name="username"
                v-model="formElements.username.value"
                @keyup="onFormChange($event)"
              />
              <div class="invalid-feedback">
                {{ getErrorMessage("username") }}
              </div>
            </div>
           

            <div class="form-group">
              <label class="text-left block mt-4 text-blue-600
              font-bold  items-start" htmlFor="email">Email</label>
              <input class="mt-2 shadow text-left appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out invalid-feedback"
                type="email"
                :class="getInputClass('email')"
                id="email"
                name="email"
                v-model="formElements.email.value"
                @keyup="onFormChange($event)"
                placeholder="Input your email.."
              />
              <div>
                {{ getErrorMessage("email") }}
              </div>
            </div>
            <div class="form-group">
                <label class="text-left block text-blue-600 
                py-2 font-bold mt-2 items-start" htmlFor="describe">Describe</label>
                <input
                class="shadow text-left justify-start appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:ring transform transition hover:scale-105 duration-300 ease-in-out"
                  type="text" placeholder="input your describe.."
                  :class="getInputClass('describe')"
                  id="describe"
                  name="describe"
                  v-model="formElements.describe.value"
                  @keyup="onFormChange($event)" />
                <div class="invalid-feedback">
                  {{ getErrorMessage("describe") }}
                </div>
              </div>
    <div>
        <label class="text-left block mt-4 text-blue-600
        font-bold  items-start" htmlFor="image">Image</label>
  
        <input type="file"
                    class="w-80 mt-4 focus:outline-none" 
                    @change="uploadImg"
                />
            </div>
            <div class="text-center">
              <button 
                type="submit"
                class="mt-4 bg-gradient-to-r from-purple-800 
                to-green-500 hover:from-pink-500 hover:to-green-500
                 text-white font-bold py-2 px-4 rounded 
                 focus:ring transform transition hover:scale-105
                  duration-300 ease-in-out btn btn-primary"
                :disabled="!formValid"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
<script>
  export default {
    name: "RegisterForm",
    data() {
      return {
        image : null ,
        formElements: {
          username: {
            type: "text",
            value: null,
            validator: {
              required: true,
              minLength: 5,
              maxLength: 15
            },
            touched: false,
            error: { status: true, message: "" }
          },
          describe: {
            type: "text",
            value: null,
            validator: {
              required: true,
              minLength: 5,
              maxLength: 300
            },
            touched: false,
            error: { status: true, message: "" }
          },
          email: {
          type: "email",
          value: null,
          validator: {
            required: true,
            pattern: "email"
          },
          touched: false,
          error: { status: true, message: "" }
        },
  
       } , formValid: false
   };
},

    methods: {
        uploadImg(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        this.image = event.target.result;
      };
      reader.readAsDataURL(file);
    },
      onFormChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        let updatedForm = { ...this.formElements };
        updatedForm[name].value = value;
        updatedForm[name].touched = true;
        const validatorObject = this.checkValidator(
          value,
          updatedForm[name].validator
        );
        updatedForm[name].error = {
          status: validatorObject.status,
          message: validatorObject.message
        };
        let formStatus = true;
        for (let name in updatedForm) {
          if (updatedForm[name].validator.required === true) {
             formStatus = !updatedForm[name].error.status && formStatus;
          }
        }
        this.formElements = updatedForm;
        this.formValid = formStatus;
      },
      checkValidator(value, rule) {
        let valid = true;
        let message = "";
        if (value.trim().length === 0 && rule.required) {
          valid = false;
          message = "Required";
        }
        if (value.length < rule.minLength && valid) {
          valid = false;
          message = `Less than ${rule.minLength} Letters`;
        }
        if (value.length > rule.maxLength && valid) {
          valid = false;
          message = `More than ${rule.maxLength} Letters`;
        }
        if (rule.pattern === "email" && valid) {
          if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) === false) {
            valid = false;
            message = "Incorrect Email";
          }
        }
        return { status: !valid, message: message };
      },
      getInputClass(name) {
        const elementErrorStatus = this.formElements[name].error.status;
        if (!this.formElements[name].touched) {
          return ["form-control"];
        } else {
          return elementErrorStatus && this.formElements[name].touched
            ? ["form-control", "is-invalid"]
            : ["form-control", "is-valid"];
        }
      },
      getErrorMessage(name) {
        return this.formElements[name].error.message;
      },
      async onFormSubmit() {
        const formData = {};
        for (let name in this.formElements) {
          formData[name] = this.formElements[name].value;
        }
        //console.log(formData);
     
      try {
        await fetch("http://localhost:3000/friends", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            image: this.image,
            username: formData.username,
            email: formData.email,
            describe: formData.describe
          }),
        });
      } catch (error) {
        console.log(`Could not save! ${error}`);
      }
    }
        //{username: "efefefefef", describe: "efeffff", 
        //email: "pinmasa_kushina@hotmail.com"} 
  }
}
  </script>
<style>
  #login-logo {
    width: 100%;
    height: 200px;
    object-fit: scale-down;
  }
  .card {
    max-width: 450px;
  }
  </style>
  
  
  