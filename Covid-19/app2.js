console.log('hello app.js');


// console.log(newscontainer)

const xhr = new XMLHttpRequest();
xhr.open('GET', 'https://api.covid19india.org/data.json', true);
xhr.onload = function () {
    let newscontainer = document.getElementById('corona');
    let obj = JSON.parse(this.responseText);
    console.log(obj)
    let articles = (obj.statewise)
    console.log(articles)
    let html = "";
    articles.forEach(function (element, index) {
        html += `
        <tr>
                <td>${element.state}</td>
                <td>${element.confirmed}</td>
                <td>${element.active}</td>
                <td>${element.recovered}</td>
                <td>${element.deaths}</td>
                <td><i>${element.lastupdatedtime}</i></td>
              </tr>
        `
        newscontainer.innerHTML = html

    })
}
xhr.send();