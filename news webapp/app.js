// console.log('hello app.js');


// console.log(newscontainer)

const xhr = new XMLHttpRequest();
xhr.open('GET', 'http://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=fd2a908d14fa451e9a897ac740fea7dc', true);
xhr.onload = function () {
    let newscontainer = document.getElementById('newscontainer');
    let obj = JSON.parse(this.responseText);
    let articles = obj.articles
    let html = "";
    // console.log(articles);
    articles.forEach(function (element, index) {
        html += `
        <div class="accordion my-2" id="accordionExample">
            <div class="card border-success">
                <div class="card-header" id="heading${index}">
                    <h2 class="mb-0">
                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                            <img src="${element.urlToImage}" alt="Responsive Image" width="100" height="80" align="left">
                            <span style="margin-left: 50px;" class="badge badge-primary">Breaking News ${index + 1} : </span>
                            ${element.title}
                        </button>
                    </h2>
                </div>
                <div id="collapse${index}" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
                    <div class="card-body">
                        ${element.description} <a href="${element.url}">Click Here To Know More</a>
                        <hr>
                        <div style="background-color:LightGray;">
                            <i>
                                <p style="text-align:right;"> Published At :- ${element.publishedAt}, Source :- ${element.source.name}</p>
                            </i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
        newscontainer.innerHTML = html

    })
}
xhr.send();