<template>
  <div>
    <h3>Project Details</h3>
    <div class="pmp">
      <table class="pmp-table">
      <thead>
        <tr>
          <th class="small">ID</th>
          <th class="large">Name</th>
          <th class="extra-large">Description</th>
          <th class="medium">Date</th>
          <th class="medium">Employee</th>
          <th class="small"></th>
        </tr>
      </thead>
        <tr v-for="td in tableData" :key="td._id">
          <td>{{td._id}}</td>
          <td>{{td.name}}</td>
          <td>{{td.description}}</td>
          <td>{{td.sDate.slice(0,10)}}</td>
          <td>{{td.employe.toString()}}</td>
          <td><button v-on:click="editDetails(td)">Edit</button></td>
        </tr>
    </table>
    </div>
    <div class="emp">
      <h3>Employee Details</h3>
      <div class="pmp">
        <table class="pmp-table">
        <thead>
          <tr>
            <th class="small">ID</th>
            <th clas="medium">Name</th>
            <th class="small"></th>
          </tr>
        </thead>
          <tr v-for="td in empTableData" :key="td._id">
            <td>{{td._id}}</td>
            <td>{{td.fName}}</td>
            <td><button v-on:click="editDetails(td)">Edit</button></td>
          </tr>
        </table>
      </div>
    </div>
    <div class="edit-details">
      <EditDetails :formObj="formObj" @update-number="update"/>
    </div>

  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { Component, Vue } from 'vue-property-decorator'
import Employee from './Employee.vue'
import Project from './Project.vue'
import EditDetails from './EditDetails.vue'

@Component({
  components: {
    Employee,
    Project,
    EditDetails
  }
})
export default class Details extends Vue {
  public tableData = {}
  public empTableData = {}
  public formObj = {}
  created ():void {
    this.getTableData()
  }

  public editDetails (e: Record<string, string>):void {
    if (Object.prototype.hasOwnProperty.call(e, 'sDate')) {
      e.sDate = e.sDate.slice(0, 10)
    }
    this.formObj = e
  }

  public getTableData ():void {
    axios.get('https://pmp-nk.herokuapp.com/api/project')
      .then(res => {
        this.tableData = res.data
      })

    axios.get('https://pmp-nk.herokuapp.com/api/employee')
      .then(res => {
        this.empTableData = res.data
      })
  }

  public update (obj: Record<string, string>):void {
    this.formObj = obj
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pmp {
  height:320px;
  overflow:auto
}

.small{
  width:60px
}

.medium {
  width:150px
}

.large {
  width: 250px;
}

.emp{
  width: 50%;
  float: left;
}

.edit-details {
  width: 50%;
  float: right;
}

.pmp-table {
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
  height: 0%;
  overflow-y: scroll;
}

.pmp-table td, .pmp th {
  border: 1px solid #ddd;
  padding: 3px;
}

.pmp-table tr:nth-child(even){background-color: #f2f2f2;}

.pmp-table tr:hover {background-color: #ddd;}

.pmp-table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}

table{
  max-height: 50%;
}

td {
  word-break: break-all;
}

button {
  background: #0b6dff;
  border: 0;
  padding: 5px 10px;
  color: white;
  border-radius: 10px;
}

</style>
