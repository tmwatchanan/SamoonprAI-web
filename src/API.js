const axios = require('axios')

const fetchHerbImageURLs = function () {
    return axios.get('http://localhost:5050/herb-image-url')//https://samoonprai-api.herokuapp.com
        .then(response => { // flattening the response
            return response.data
            // this.fetchedData = response.data
            // console.log(this.fetchedData)
        }) // you can also make a chain.
        .catch(function (error) { // handle error
            console.log(error)
        })
}

const appendHerbImageURLs = function (submittingData) {
    return axios.post('http://localhost:5050/herb-image-url', submittingData)
        .then(response => { // flattening the response
            return response
        }) // you can also make a chain.
        .catch(function (error) { // handle error
            console.log(error)
        })
}

export default {
    fetchHerbImageURLs: fetchHerbImageURLs,
    appendHerbImageURLs: appendHerbImageURLs
}
