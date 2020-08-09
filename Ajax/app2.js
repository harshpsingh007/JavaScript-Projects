let popbtn = document.getElementById('popbtn');
popbtn.addEventListener('click', popFunc);

function popFunc() {
    console.log('You clicked Pop Button')
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=fd2a908d14fa451e9a897ac740fea7dc', true);
    xhr.onload = function () {
        let list = document.getElementById('list');
        let obj = JSON.parse(this.responseText);
        let articles = obj.articles
        let html = "";
        console.log(articles);
        articles.forEach(function (element, index) {
            html += `
            <tr>
                <td>${element.title}</td>
                <td><img src="${element.urlToImage}" alt="Responsive Image" width="100" height="80" align="left"></td>
                <td></td>
                <td></td></tr>
            `
            list.innerHTML = html
    
        })
    }
    xhr.send();
}