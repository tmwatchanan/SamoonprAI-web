// Thanks to https://codepen.io/jjelic/pen/yevNLZ
<template>
    <div class="panel-body">
        <!-- <input id="labelInput" class="dropdown-input"/> -->

        <h1>Herb Submission</h1>
        <div id="multipleOperations">
            <!-- <input type="checkbox" @click="checkMultipleCheckboxes()"> -->
            <button @click="addRow(-1)" class="fa fa-plus-square"> New</button>
            &nbsp;&nbsp;&nbsp;&nbsp; Change labels of checked rows to
            <vue-tags-input v-model.trim="tag" :tags="tags" :autocomplete-items="filteredLabelList" @tags-changed="newTags => tags = newTags"
                :max-tags=1 :placeholder="''" class="multipleInput"></vue-tags-input>
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
                    <th style="width: 45%;">Image URL</th>
                    <th style="width: 1%;">Image</th>
                    <th>Label</th>
                    <th style="width: 1%;"></th>
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
                        <a v-bind:href="row.url" target="_blank">
                            <img v-bind:src="row.url" alt="" v-on:click.stop>
                        </a>
                    </td>
                    <td>
                        <!-- <input :id="'dropdown-input-' + count" v-model.trim="row.label" style="width:100%;" v-on:click.stop> -->
                        <vue-tags-input v-model.trim="row.tag" :tags="row.tags" :autocomplete-items="rowsSuggestion[count].filteredLabelList" @tags-changed="newTags => row.tags = newTags"
                            :max-tags=1 :placeholder="''" v-on:click.stop></vue-tags-input>
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
        <modal name="successful-modal" :height="260" :width="260">
            <h2 style="text-align: center;">Successful!</h2>
            <img src="../../static/img/successful.gif" alt="successful">
            <br>
        </modal>
        <br>
        <br>
        <hr>
        <pre style="background-color:snow;">{{ $data }}</pre>

    </div>
</template>

<script>
    import API from '../API.js'
    import VueTagsInput from '@johmun/vue-tags-input'
    import HerbList from '../../data/herbs.json'

    export default {
        components: {
            VueTagsInput
        },
        mounted() {
            const thisComponent = this
        },
        created() {
            // API.fetchHerbImageURLs().then(fetchedData => {
            //     this.onlineURLs = fetchedData
            // })
            // .catch(error => {
            //     console.log(error)
            // })
        },
        data() {
            return {
                tag: '',
                tags: [],
                onlineURLs: [],
                labelList: HerbList,
                rows: [
                    {
                        url: '',
                        tag: ' ',
                        tags: [],
                        checked: false
                    }
                ],
                checkAll: false
            }
        },
        computed: {
            filteredLabelList: function () {
                return this.labelList.filter(i => new RegExp(this.tag, 'i').test(i.text))
            },
            rowsSuggestion: function () {
                const rows = this.rows
                let newRows = []
                rows.forEach(row => {
                    let newRow = row
                    newRow.filteredLabelList = this.labelList.filter(i => new RegExp(row.tag, 'i').test(i.text))
                    newRows.push(newRow)
                })
                return newRows
            }
        },
        methods: {
            addRow: function (index) {
                try {
                    this.rows.splice(index + 1, 0, {
                        url: '',
                        tag: ' ',
                        tags: [],
                        checked: false
                    })
                    const thisComponent = this
                    // this.$nextTick(() => {
                    //     let comboplete = new Awesomplete('input#dropdown-input-' + index, {
                    //         minChars: 0,
                    //         list: thisComponent.labelList,
                    //         replace: function (text) {
                    //             thisComponent.$set(thisComponent.rows[index], 'label', text.value)
                    //         }
                    //     })

                    // })
                } catch (e) {
                    console.log(e)
                }
            },
            removeRow: function (index) {
                this.rows.splice(index, 1)
            },
            submitData: function (e) {
                let submittingData = {
                    values: []
                }
                for (let index = 0; index < this.rows.length; index++) {
                    const row = this.rows[index]
                    if (row.url.length > 0 && row.tags.length > 0) {
                        const structuredRow = {
                            url: row.url,
                            label: row.tags[0].text
                        }
                        console.log(structuredRow)
                        submittingData.values.push(structuredRow)
                    }
                }
                API.appendHerbImageURLs(submittingData).then(response => {
                    if (response.status == 200) {

                    }
                })
                    .catch(error => {
                        console.log(error)
                    })
                this.$modal.show('successful-modal')
                this.rows = [
                    {
                        url: '',
                        tag: ' ',
                        tags: [],
                        checked: false
                    }
                ]
            },
            setMultipleLabels: function () {
                this.rows.forEach(row => {
                    if (row.checked) {
                        this.$set(row, 'tags', this.tags)
                    }
                })
            },
            removeMultipleRows: function () {
                for (let index = 0; index < this.rows.length; index++) {
                    const row = this.rows[index]
                    if (row.checked) {
                        this.rows.splice(index, 1)
                    }
                }
            },
            clickRow: function (row) {
                this.$set(row, 'checked', !row.checked)
            },
            checkMultipleCheckboxes: function () {

            }
        }
    }
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
        max-height: 100%;
        height: auto;
        width: auto;
        display: block;
        margin-left: auto;
        margin-right: auto;
    }

    #multipleOperations {
        text-align: left;
    }

    .multipleInput {
        display: inline-block;
        margin: 0 5px 0 5px;
    }
</style>