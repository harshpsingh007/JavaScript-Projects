console.log('Rig Veda');

let veda = {};
function getdata(){
    let url = "https://sheetlabs.com/IND/vs";
    fetch(url).then((response)=>{
        return response.json()
    })
    .then((data)=>{
        let html= "";
        let htmlelem = document.getElementById('vedbody')
        console.log(data)
        data.forEach(function(element,index){
            html+=`
            <tr>
            <th scope="row">${index}</th>
            <td>${element.word}</td>
            <td>${element.nagari}</td>
            <td>${element.description}</td>
            </tr>`
        });
        htmlelem.innerHTML = html
        console.log(html)
    })
}
getdata();
console.log(htmlelem)