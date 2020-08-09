console.log('ajax start console');

let fetchbtn = document.getElementById('fetchbtn');
fetchbtn.addEventListener('click', fetchFunc);

function fetchFunc() {
    console.log('You clicked Fetch Button');

    const xhr = new XMLHttpRequest();
    xhr.open('Get', 'harsh.txt', true);
    let h5tag = document.getElementById('h5tag');
    xhr.onload = function () {
        console.log(this.responseText)
        h5tag.innerHTML = this.responseText;
    }
    xhr.send();
}


let popbtn = document.getElementById('popbtn');
popbtn.addEventListener('click', popFunc);

function popFunc() {
    console.log('You clicked Pop Button')
    const xtm = new XMLHttpRequest();
    xtm.open('GET', 'harsh.json', true);
    xtm.onload = function () {
        if (this.status === 200) {
            let obj = JSON.parse(this.responseText);
            console.log(obj);
            let list = document.getElementById('list');
            str = "";
            for (key in obj) {
                str += `<tr>
                <td>${obj[key].id}</td>
                <td>${obj[key].employee_name}</td>
                <td>${obj[key].employee_salary}</td>
                <td>${obj[key].employee_age}</td></tr>`;
            }
            list.innerHTML = str;
        }
        else {
            console.log("Some error occured")
        }
    }
    xtm.send();
}