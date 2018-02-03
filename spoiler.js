//defining all the constants that hold true throughout the web app
const args = process.argv
const request = require('request')
const cheerio = require('cheerio')
const axios = require('axios')
const api = 'd706a7b45b225a06e23296584454ba57'

//defining all constants that depends on terminal input
let movieName = args[2]
let waitTime = Number(args[3])
let googleUrl = `https://www.google.ca/search?q=${movieName}`
let url = `https://api.themoviedb.org/3/search/movie?api_key=${api}&query=${movieName}`


//part1 loads spoiler warning first before actual spoiler
console.log(`\*\*spoiler warning\*\* about to spoil the movie "${movieName}" in ${waitTime} seconds.`)

//part4 getting movie title and spoiler from movieDB's API
axios.get(url).then((res) => {
    let movieList = res.data

    let movieTitle = movieList.results[0].title
    let movieSpoiler = movieList.results[0].overview

    //part2 loads actual spoiler message after a timeout defined at the terminal input
    setTimeout(function () {
        console.log(`Here's your well deserved spoiler: ${movieSpoiler}`)
    }, waitTime * 1000)

})


//part3 scrapping google to show search result titles(class .r on google) while timer runs
request(googleUrl, (error, response, body)=>{
    if (!error){
        let $ = cheerio.load(body)

        console.log(`${movieName} is such an EPIC movie, here's some search results for you to gnaw on:`)
        
        $('.r').each(function(index,element){
            console.log($(this).text())
        })
    } else {
        console.log(`We've encountered an ERROR!!!!: ${error}`)
    }
})














// request.get(url, function(error, response, body){

//     console.log(body.data)   
//     })