<template>
  <div v-show="showProject || showEmployee">
    <h3>Edit the details</h3>
    <div>
      <form v-if="showProject">
        <label>Project Name</label>
        <input type='text' v-model="localData.name"/><br />
        <label>Description</label>
        <input type='text' v-model="localData.description"/><br />
        <label>Start Date</label>
        <input type='date' v-model="localData.sDate"/><br />
        <label>Employee</label>
        <input type='text' placeholder="press space to add multiple" v-model="emp" v-on:keyup.space="addEmployee"/><br />
        <button type='submit' v-on:click="updateProject">Submit</button>
      </form>
      <form v-if="showEmployee">
        <label>Name</label>
        <input type='text' v-model="localData.fName" required/><br />
        <label>Employee Id</label>
        <input type='text' v-model="localData._id" :disabled="true"/><br />
        <button class='button' v-on:click="updateEmployee">Submit</button>
      </form>
      <div v-if="errors.length" class="errors">
        <p v-for="e in errors" v-bind:key="e.id"> {{e}} </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import axios from 'axios'
@Component
export default class EditDetails extends Vue {
    @Prop() private formObj!: Record<string, string>;
    @Watch('formObj')
    onvalueChnage ():void {
      this.localData = Object.assign({}, this.formObj)
    }

    public errors:string[] = []
    public emp=''
    public employee:string[] = []
    public localData:Record<string, string> = {}

    get showProject ():boolean {
      this.errors = []
      return Object.prototype.hasOwnProperty.call(this.localData, 'sDate')
    }

    get showEmployee ():boolean {
      this.errors = []
      return Object.prototype.hasOwnProperty.call(this.localData, 'fName')
    }

    public addEmployee ():void {
      if (this.emp) {
        this.employee.push(this.emp.trim() as string)
        this.emp = ''
      }
    }

    public empValidation ():boolean {
      this.errors = []
      if (this.localData.fName.length < 3 || this.localData.fName.length > 50) {
        this.errors.push('Name should be between 3 to 50 characters')
      }
      if (this.errors.length === 0) {
        return false
      } else {
        return true
      }
    }

    public projectValidation ():boolean {
      this.errors = []
      if (!this.localData.name || !this.localData.description || !this.localData.sDate) {
        this.errors.push('Please enter all the required fields')
      }
      if (this.localData.name.length < 10 || this.localData.name.length > 80) {
        this.errors.push('Name should be between 10 to 80 characters')
      }
      if (this.localData.description.length < 50 || this.localData.description.length > 300) {
        this.errors.push('Name description be between 50 to 300 characters')
      }
      if (this.errors.length === 0) {
        return false
      } else {
        return true
      }
    }

    public updateEmployee (e: Event):void {
      this.errors = []

      if (this.empValidation()) {
        e.preventDefault()
      } else {
        axios.put(`https://pmp-nk.herokuapp.com/api/employee/${this.localData._id}`, { fName: this.localData.fName })
          .then(() => {
            this.localData = {}
          })
        this.$emit('update-text', { newName: this.localData })
      }
    }

    public updateProject (e: Event):void {
      this.errors = []
      if (this.projectValidation()) {
        e.preventDefault()
      } else {
        axios.put(`https://pmp-nk.herokuapp.com/api/project/${this.localData._id}`, { name: this.localData.name, description: this.localData.description, sDate: this.localData.sDate, employe: this.localData.employee ?? [] })
          .then(() => {
            this.localData = {}
          })
      }
    }
}
</script>

<style>
form {
  max-width: 500px;
  margin: auto;
  background: white;
  text-align: left;
  padding: 10px;
  border-radius: 10px;
}
label{
  color: #aaa;
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
  color: white;
  border-radius: 20px;
}
.errors {
  color:red;
  font-size: 10px;
}
</style>
