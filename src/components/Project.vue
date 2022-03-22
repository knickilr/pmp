<template>
  <div>
    <p v-if="errors.length">
      <p v-for="e in errors" v-bind:key="e.id"> {{e}} </p>
    <form >
      <label class='required'>Project Name</label>
      <input type='text' v-model="pName"><br />
      <label class='required'>Description</label>
      <input type='text' v-model="description"/><br />
      <label class='required'>Start Date</label>
      <input type='date' v-model="sDate"/><br />
      <label>Employee</label>
      <input type='text' placeholder="press space to add multiple" v-model="emp" v-on:keyup.space="addEmployee"/><br />
      <button type='submit' v-on:click="postData">Submit</button>
    </form>
  </div>
</template>vue create

<script lang='ts'>
import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios'
@Component
export default class Project extends Vue {
  public pName = '';
  public description = '';
  public sDate = '';
  public employee:string[] = [];
  public emp = '';
  public errors:string[] = [];

  public validation ():boolean {
    this.errors = []
    if (!this.pName || !this.description || !this.sDate) {
      this.errors.push('Please enter all the required fields')
    }
    if (!new RegExp('^[a-zA-Z0-9 ]+$').test(this.pName)) {
      this.errors.push('Name should contain only alphanumeric characters')
    }
    if (this.pName.length < 10 || this.pName.length > 80) {
      this.errors.push('Name should be between 10 to 80 characters')
    }
    if (this.description.length < 50 || this.description.length > 300) {
      this.errors.push('Name description be between 50 to 300 characters')
    }
    if (this.errors.length === 0) {
      return false
    } else {
      return true
    }
  }

  public addEmployee ():void {
    if (this.emp) {
      this.employee.push(this.emp.trim() as string)
      this.emp = ''
    }
  }

  public postData (e: Event):void {
    if (this.validation()) {
      e.preventDefault()
    } else {
      axios.post('https://pmp-nk.herokuapp.com/api/project', { name: this.pName, description: this.description, sDate: this.sDate, employe: this.employee })
        .then(() => {
          this.pName = ''
          this.description = ''
          this.sDate = ''
          this.employee = []
        })
    }
  }
}
</script>

<style scoped>
<style>
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
</style>
