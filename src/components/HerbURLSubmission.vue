// Thanks to https://codepen.io/jjelic/pen/yevNLZ
<template>
    <div class="panel-body">
        <!-- <input id="labelInput" class="dropdown-input"/> -->

        <h1>Herb Submission</h1>
        <div id="multipleOperations">
            <!-- <input type="checkbox" @click="checkMultipleCheckboxes()"> -->
            <button @click="addRow(-1)" class="fa fa-plus-square"> New</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            Change labels of checked rows to 
            <input type="text" id="multiple-labels-input" size=10 v-model="setLabel">
            <button id="multiple-labels-btn" type="button">
                <span class="caret"></span>
            </button>
            <button @click="setMultipleLabels()">Set Selected Rows</button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <button @click="removeMultipleRows()" class="fa fa-times"> Delete Selected</button>
        </div>
        <br>
        
        <table class="ink-table alternating hover">
            <thead>
            <tr>
                <th style="width: 3%;"></th>
                <th style="width: 1%;">No.</th>
                <th>Image URL</th>
                <th style="width: 1%;">Image</th>
                <th style="width: 10%;">Label</th>
                <th style="width: 5%;">Remove</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(row, count) in rows" :key="count" @click="clickRow(row)">
                <td>
                    <input type="checkbox" :name="'checkbox-' + count" v-model="row.checked">
                </td>
                <td>
                    {{ count + 1 }}
                </td>
                <td>
                    <input class="form-control" v-model="row.url" style="width:100%" v-on:click.stop>
                </td>
                <td>
                    <a v-bind:href="row.url" target="_blank"><img v-bind:src="row.url" alt="" v-on:click.stop></a>
                </td>
                <td>
                    <input :id="'dropdown-input-' + count" v-model.trim="row.label" style="width:100%;" v-on:click.stop>
                    <!-- <button :id="'dropdown-btn-' + count" type="button">
                        <span class="caret"></span>
                    </button> -->
                </td>
                <td>
                    <!-- <button class="btn btn-primary btn-xs" @click="addRow(count)">add row</button> -->
                    <i class="fa fa-minus-circle" @click="removeRow(count)" v-on:click.stop></i>
                </td>
            </tr>
            </tbody>
            <tfoot>
                <tr>
                    <!-- <td colspan="2" class="text-right"><strong>TOTAL</strong></td>
                    <td colspan="1" class="text-right"><strong>{{ total}}</strong></td>
                    <td></td> -->
                </tr>
            </tfoot>
        </table>
        <button @click.prevent="submitData" class="ink-button green">Submit</button>
        <br><br>
        <hr>
        <pre>{{ $data }}</pre>
    </div>
</template>

<script>
import awesomplete from "awesomplete"

export default {
  mounted() {
      const thisComponent = this
      var comboplete = new Awesomplete('input#multiple-labels-input', {
            minChars: 0,
            list: this.labelList,
            replace: function(text) {
                thisComponent.setLabel = text.value
            }
        });
        Awesomplete.$('#multiple-labels-btn').addEventListener("click", function() {
            if (comboplete.ul.childNodes.length === 0) {
                comboplete.minChars = 0;
                comboplete.evaluate();
            }
            else if (comboplete.ul.hasAttribute('hidden')) {
                comboplete.open();
            }
            else {
                comboplete.close();
            }
        });

      this.autoComplete()
  },
  data() {
    return {
      labelList: [
    "Ada",
    "Java",
    "JavaScript",
    "Brainfuck",
    "LOLCODE",
    "Node.js",
    "Ruby on Rails"
    ],
      rows: [
        {
          url:
            "https://medthai.com/wp-content/uploads/2013/07/Butterfly-pea-3.jpg",
          label: ""
        },
        {
          url: "test",
          label: ""
        }
      ],
      setLabel: null,
      checkAll: false
    };
  },
  computed: {
    //   checkAll: function() {
    //       return false
    //   }
  },
  methods: {
    addRow: function(index) {
      try {
        this.rows.splice(index + 1, 0 , {})
        const thisComponent = this
        this.$nextTick(() => {
            let comboplete = new Awesomplete('input#dropdown-input-' + index, {
                minChars: 0,
                list: thisComponent.labelList,
                replace: function(text) {
                    thisComponent.$set(thisComponent.rows[index], 'label', text.value)
                }
            })
            
        })
      } catch (e) {
        console.log(e)
      }
    },
    removeRow: function(index) {
      this.rows.splice(index, 1)
      this.$nextTick(() => {
        // this.autoComplete()
      })
    },
    submitData: function(e) {
      let submittedData = this.rows.filter(function(element) {
        return element.url !== "" && element.label !== ""
      });
      console.log(submittedData);
      // this.$http.post('api/outbox', {messages:this.messages})
      // .then(function(response){
      // 		//handle success
      // 		console.log(response);
      // }).error(function(response){
      // 		//handle error
      // 		console.log(response)
      // });
      // this.submitted = true;
    },
    autoComplete: function() {
        const thisComponent = this
        for (let index = 0; index < this.rows.length; index++) {
          let comboplete = new Awesomplete('input#dropdown-input-' + index, {
                minChars: 0,
                list: thisComponent.labelList,
                replace: function(text) {
                    thisComponent.$set(thisComponent.rows[index], 'label', text.value)
                }
            })
      }
    },
    setMultipleLabels: function() {
        this.rows.forEach(row => {
            if (row.checked) {
                this.$set(row, 'label', this.setLabel)
            }
        });
    },
    removeMultipleRows: function() {
        for (let index = 0; index < this.rows.length; index++) {
            const row = this.rows[index];
            if (row.checked) {
                this.rows.splice(index, 1)
            }
        }
    },
    clickRow: function(row) {
        this.$set(row, 'checked', !row.checked)
    },
    checkMultipleCheckboxes: function() {
        
    }
  }
};
</script>

<style scoped>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/css/ink.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/css/ink-ie.min.css");

#herb-url-submission-table {
  border: 1px solid black;
  margin-left: auto;
  margin-right: auto;
}

.caret {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 2px;
  vertical-align: middle;
  border-top: 4px dashed;
  border-top: 4px solid;
  border-right: 4px solid transparent;
  border-left: 4px solid transparent;
}

img {
  height: 50px;
  width: auto;
}

#multipleOperations {
    text-align: left;
}
</style>
