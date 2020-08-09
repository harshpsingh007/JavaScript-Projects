// console.log(`hello`)
noteshow()
// adding notes in localStorage
let addnotebtn = document.getElementById('addbtn')
addnotebtn.addEventListener('click', function () {
    let topic = document.getElementById('inputtopic')
    let text = document.getElementById('inputtext')
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        noteobj = [];
    }
    else {
        noteobj = JSON.parse(notes)
    }
    let myobj = {
        title:topic.value,
        text:text.value
    }
    // console.log(myobj)
    noteobj.push(myobj)
    localStorage.setItem('notes', JSON.stringify(noteobj))
    text.value = ""
    topic.value = ""
    // console.log(noteobj)
    noteshow()
})
// function to show notes on webpage// function to show notes on webpage
function noteshow() {
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        noteobj = [];
    }
    else {
        noteobj = JSON.parse(notes)
    }
    let html = ''
    noteobj.forEach(function (element, index) {

        html += `<div id="noteshowdiv" class="cardboard border border-success mx-2 mt-2 my" style="width: 18rem">
     <div class="card-body">
         <h5 class="card-title">${element.title}</h5>
         <p class="card-text">${element.text}</p>
         <button id="${index}" onclick="deletenote(this.id)" class="btn btn-primary">Delete Note</a>
     </div>
 </div>`
 console.log(element.title)
    });
    let divcard = document.getElementById('divcard')
    if (noteobj.length != 0) {
        divcard.innerHTML = html;
    } else {
        divcard.innerHTML = `<p>You don't have any notes,please create your notes. </p>`
    }
}
// function to delete notes
function deletenote(index) {
    let notes = localStorage.getItem('notes')
    if (notes == null) {
        noteobj = [];
    }
    else {
        noteobj = JSON.parse(notes)
    }
    noteobj.splice(index,1)
    localStorage.setItem('notes', JSON.stringify(noteobj))
    noteshow()
}

// function for search
let search = document.getElementById('searchtxt')
// console.log(searchtxt.value)
search.addEventListener('input',function () {
    let searchtext = search.value
    let searchelem = document.getElementsByClassName('cardboard')
    // console.log(searchtext)
    Array.from(searchelem).forEach(function(element){
        let topictxt = element.getElementsByTagName('h5')[0].innerText
        let searchabletxt = element.getElementsByTagName('p')[0].innerText
        console.log(element.getElementsByTagName('p').value)
        if(searchabletxt.includes(searchtext) || topictxt.includes(searchtext)){
            element.style.display = "block"
        } else {
            element.style.display = "none"
        }
    })
})