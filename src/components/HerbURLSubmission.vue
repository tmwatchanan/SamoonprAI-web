// Thanks for https://stackoverflow.com/a/47321810/7150241

<template>
    <div>
    <h1>Herb Submission</h1>
    <table id="herb-url-submission-table">
        <tr>
            <th>No.</th>
            <th>URL</th>
            <th>Label</th>
        </tr>
        <div v-for="(find, count) in finds" v-bind:key="find">
            <tr>
                <td>{{count+1}}</td>
                <td><input v-model="find.value"></td>
                <td><input v-model="find.approval"></td>
            </tr>
        </div>
    </table>
    <button @click="addFind">
        New Find
    </button>
    <pre>{{ $data | json }}</pre>
    </div>
</template>

<script>
export default {
  data() {
      return {
        finds: []
      }
  },
  methods: {
    addFind: function () {
      this.finds.push({ value: '' });
    }
  }
}
</script>

<style scoped>
    #herb-url-submission-table {
        border: 1px solid black;
        margin-left:auto;
        margin-right:auto;
    }
</style>
