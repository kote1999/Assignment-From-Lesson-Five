//Assignment from lesson 5, By Konstantine Kirkitadze


function getMovies(name){
    return fetch(`http://www.omdbapi.com/?t=${name}&apikey=469ad1a3`).then(
        (result) => result.json());
}

function getCountry(name){
    return fetch(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
    .then((result) => result.json());
}



//1. დაწერეთ ფუნქცია, რომელსაც გადავცემთ ფილმის სახელს და გვეტყვის რამდენი  წლის წინ გამოვიდა ეს ფილმი.

async function getMovieYear(name){
    const myData = await getMovies(name);
    const result = `The movie: ${name} is released ${2021 - myData['Year']} year(s) ago.`;
    console.log(result);
}

getMovieYear('Avatar');


//2. დაწერეთ ფუნქცია, რომელსაც გადავცემთ ფილმის 
//   სახელს და დაგვიბრუნებს ამ  ფილმის მსახიობების სახელების მასივს (გვარების გარეშე)

async function getActorsName(name){
    const myData = await getMovies(name);
    const actorsName = myData['Actors'].split(' ').filter((el, index) => !(index%2));
    console.log(actorsName);
}


getActorsName('avatar');


//დაწერეთ ფუნქცია, რომელიც დააბრუნებს იმ ქვეყნის ვალუტას, 
// საიდანაც თქვენი  ერთერთი საყვარელი ფილმია. 
//(თუ რამდენიმე ქვეყანაა ფილმზე მითითებული,  ავიღოთ პირველი)


async function getCurr(name){
    const movieData = await getMovies(name);
    const movieCountry = movieData['Country'].split(", ")[0];

    const countyData = await getCountry(movieCountry);
    const currency = countyData[0]['currencies'][0]['name'];

    console.log(currency);
}


getCurr('Gladiator');



//4. დაწერეთ ფუნქცია, რომელსაც 
//გადავცემთ 3 ფილმის სახელს, და გვეტყვის ჯამში 
//რამდენი საათი და რამდენი წუთია ყველა ფილმის ხანგრძლივობა ერთად.

async function getMovieLength(first, second, third){
    const firstMovie = await getMovies(first);
    const lengthForFirst = Number(firstMovie['Runtime'].split(" ")[0]);

    const secondtMovie = await getMovies(second);
    const lengthForSecond = Number(secondtMovie['Runtime'].split(" ")[0]);

    const thirdMovie = await getMovies(third);
    const lengthForThird = Number(thirdMovie['Runtime'].split(" ")[0]);

    sum = lengthForFirst + lengthForSecond + lengthForThird;

    const result = `The length of these three movies is ${Math.floor(sum/60)} hour(s) and ${Math.floor(sum%60)} minute(s).`;
    console.log(result);


}

getMovieLength('gladiator', 'avatar', 'moonlight');

//5. დაწერეთ ფუნქცია, რომელსაც გადავცემთ 3 ფილმის სახელს, და დაგვიბრუნებს 
//იმ ქვეყნების მოსახლეობების ჯამს, საიდანაც ეს ფილმებია. 
//(თუ რამდენიმე ქვეყანაა ფილმზე მითითებული, ავიღოთ პირველი)


async function getPeopleQuantity(first, second, third){
    const firstMovie = await getMovies(first);
    const countryForFirst = firstMovie['Country'].split(", ")[0];
    const dataFromFirstCountry = await getCountry(countryForFirst);
    const populationForFirst = dataFromFirstCountry[0]['population'];


    const secondMovie = await getMovies(second);
    const countryForSecond = secondMovie['Country'].split(", ")[0];
    const dataFromSecondCountry = await getCountry(countryForSecond);
    const populationForSecond = dataFromSecondCountry[0]['population'];
    

    const thirdMovie = await getMovies(third);
    const countryForThird = thirdMovie['Country'].split(", ")[0];
    const dataFromThirdCountry = await getCountry(countryForThird);
    const populationForThird = dataFromThirdCountry[0]['population'];

    const sumOfPopulation = populationForFirst + populationForSecond + populationForThird;

    console.log(`The sum of quantities of the countries' population from which these movies are is ${sumOfPopulation}.`);
}


getPeopleQuantity('Gladiator', 'avatar', 'all about my mother');