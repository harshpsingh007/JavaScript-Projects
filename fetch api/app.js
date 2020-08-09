// Fetch aPi Program
// console.log('Fetch API')


// function getData(){
//     url = "http://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=fd2a908d14fa451e9a897ac740fea7dc";
//     fetch(url).then((response)=>{
//         console.log(response)
//         return response.json();
//     }).then((data)=>{
//         console.log(data)
//     })
// }
// getData()


// Async & Await Program
console.log('Async & Await');

async function harsh(){
    console.log('inside harsh function');
    const response = await fetch('harsh.txt');
    console.log('before response');
    const users = await response.text();
    console.log('after response');
    return users;
}

console.log('before calling harsh');
let a = harsh();
console.log('after calling harsh ')
console.log(a);
a.then(data => console.log(data))
console.log('___________THE END_____________')