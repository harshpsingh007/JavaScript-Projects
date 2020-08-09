let element = document.createElement('li')
element.className = 'listclass'
element.id = 'listid'
element.setAttribute('title', 'listtitle')
element.innerHTML = '<b>hello from list</b>'
let a = document.querySelector('div.container').lastElementChild.lastElementChild
a.id = 'formchildid'
let b = document.querySelector('div#formchildid')
b.appendChild(element)
let harsh = document.createElement('a')
harsh.setAttribute('href', "https://www.google.com")
harsh.innerHTML = '<b><i>Go to Google</i></b><br>'
b.appendChild(harsh)
let harry = document.createElement('a')
harry.setAttribute('href', "https://www.codewithharry.com/videos/javascript-tutorials-in-hindi-1")
harry.innerHTML = '<b><i>Go to Code with Harry</i></b><br>'
b.appendChild(harry)
document.querySelector('#subbtn').addEventListener('mouseenter', function() {
    document.querySelector('#subbtn').innerHTML = `Click ME  <img src="emoji.jfif" width="40px" style="border-radius: 110%;" alt="Avatar" srcset="">`
})
document.querySelector('#subbtn').addEventListener('mouseleave', function() {
    document.querySelector('#subbtn').innerHTML = 'Submit By Clicking Me <img src="clickimage.jfif" width="40px" style="border-radius: 100%;" alt="Avatar" srcset="">'
})
document.querySelector('div.container').addEventListener('mousemove', function(e) {
    document.body.style.backgroundColor = `rgb(${e.offsetX}, ${e.offsetY},250)`;
})
document.querySelector('h5#time').addEventListener('mouseover', function() {
    document.querySelector('h5#time').innerHTML = `<i>${Date()}</i>`
})
document.querySelector('h5#time').addEventListener('mouseout', function() {
    document.querySelector('h5#time').innerHTML = `<i>TO KNOW TIME MOVE YOUR MOUSE HERE</i>`
})