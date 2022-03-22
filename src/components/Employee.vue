<template>
  <div>
    <form>
      <label class='required'>Name</label>
      <input type='text' v-model="fName" required/><br />
      <label class='required'>Employee Id</label>
      <input type='text' v-model="eid"/><br />
      <button class='button' v-on:click="postData">Submit</button>
    </form>
    <div v-if="errors.length" class="errors">
      <p v-for="e in errors" v-bind:key="e.id"> {{e}} </p>
    </div>
  </div>
</template>

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios'
@Component
export default class Employee extends Vue {
  public fName = ''
  public eid = ''
  public sDate = ''
  public errors:string[] = []

  public validation ():boolean {
    this.errors = []
    if (!this.fName || !this.eid) {
      this.errors.push('Please enter all the required fields')
    }
    if (this.fName.length < 3 || this.fName.length > 50) {
      this.errors.push('Name should be between 3 to 50 characters')
    }
    if (this.eid.length !== 6) {
      this.errors.push('Id should be 6 characters')
    }
    if (!new RegExp('^[a-zA-Z ]+$').test(this.fName)) {
      this.errors.push('Name should contain only characters')
    }
    if (this.errors.length === 0) {
      return false
    } else {
      return true
    }
  }

  public postData (e: Event):void {
    if (this.validation()) {
      e.preventDefault()
    } else {
      axios.post('https://pmp-nk.herokuapp.com/api/employee', { fName: this.fName, _id: this.eid })
        .then(() => {
          this.fName = ''
          this.eid = ''
        })
    }
  }
}
</script>
<style scoped>
form {
  max-width: 420px;
  margin: 30px auto;
  background: white;
  text-align: left;
  padding: 40px;
  border-radius: 10px;
}
label{
  color: #aaa;
  display: inline-block;
  margin: 25px 0 15px;
  font-size: 0.6em;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bold;
}
input{
  display: block;
  padding: 10px 6px;
  width: 100%;
  box-sizing: border-box;
  border: none;
  border-bottom: 1px solid #ddd;
  color: #555;
}
button {
  background: #0b6dff;
  border: 0;
  padding: 10px 20px;
  margin-top: 20px;
  color: white;
  border-radius: 20px;
}
.required:after {
  content: "*";
  color: red;
}

.errors {
  padding-left: 500px;
  color:red;
  text-align: left;
  font-size: 10px;
}
</style>
