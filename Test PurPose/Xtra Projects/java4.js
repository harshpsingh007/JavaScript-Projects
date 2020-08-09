console.log(`hello from java 4`)

/*
You have to create a div and inject it into the page which contains a heading.
whenever someone clicks on the div, it should be converted into an editable item. whenever user clicks away (blur). save the note into the local storage.

*/

let divelm = document.createElement('div');
divelm.setAttribute('class', 'elm');
divelm.setAttribute('id', 'elm');
divelm.setAttribute('style', 'border:2px solid black; margin: 34px; padding:80px;');
let val = localStorage.getItem('textnode')
let textnode
if (val == null) {
    textnode = document.createTextNode('This Is A NoteMaker Click To Create Yours');
} else {
    textnode = document.createTextNode(val)
}
divelm.appendChild(textnode)
// console.log(divelm);

let nav = document.querySelector('body');
let div = document.querySelector('div.container');
nav.insertBefore(divelm, div)
// console.log(nav);
// console.log(div);

divelm.addEventListener('click', function() {
    let notextarea = document.getElementsByClassName('textarea').length
    if (notextarea == 0) {
        let html = divelm.innerHTML
        divelm.innerHTML = `<textarea id="textarea" class="textarea" style="width: 100%;display: block" rows="10">${html}</textarea>`
    }
    let textarea = document.getElementById('textarea')
    // console.log(textarea.value)
    textarea.addEventListener('blur', function() {
        divelm.innerHTML = textarea.value
        localStorage.setItem('textnode', textarea.value)
    })
})