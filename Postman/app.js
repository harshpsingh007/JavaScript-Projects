console.log("hello postman");

function createDomElement(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

let addedParamCount = 2;

document.getElementById('Contentbox').style.display ='none';
document.getElementById('jsonbox').style.display ='none';
document.getElementById('post').addEventListener('click',()=>{
  document.getElementById('Contentbox').style.display ='flex';
  document.getElementById('jsonbox').style.display ='flex';
})
document.getElementById('get').addEventListener('click',()=>{
  document.getElementById('Contentbox').style.display ='none';
  document.getElementById('jsonbox').style.display ='none';
  document.getElementById('parameterbox').style.display ='none';

})



let jsonbox = document.getElementById("jsonbox");
let parameterbox = document.getElementById("parameterbox");
parameterbox.style.display = "none";

let jsonradio = document.getElementById("JSON");
jsonradio.addEventListener("click", () => {
  jsonbox.style.display = "flex";
  parameterbox.style.display = "none";
  document.getElementById("params").style.display = "none";
});
let parameterradio = document.getElementById("parameter");
parameterradio.addEventListener("click", () => {
  jsonbox.style.display = "none";
  parameterbox.style.display = "flex";
  document.getElementById("params").style.display = "block";
});

let params = document.getElementById("params");
// console.log(params);
let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", () => {
  let string = `
  <div class="parameterbox row" id="parameterbox">
  <label for="parameterbox" class="col-sm-2 col-form-label ">Parameter${
    addedParamCount + 1
  }</label>
  <div class="row col-sm-8 ">
      <div class="col-sm-4">
          <input type="text" class="form-control" id="parameterkey${
            addedParamCount + 1
          }" placeholder='"Enter the key${addedParamCount + 1}"'>
      </div>
      <div class="col-sm-4">
          <input type="text" class="form-control" id="parametervalue${
            addedParamCount + 1
          }" placeholder='"Enter the value${addedParamCount + 1}"'>
      </div>
      </div>
      <button type="button" id="deletebtn" class="deletebtn col-sm-1 btn btn-warning mt-2"><b>-</b></button>
</div>
    `;
  let createdelement = createDomElement(string);
  // console.log(createdelement);
  params.appendChild(createdelement);

  let deletebtn = document.getElementsByClassName("deletebtn");
  for (item of deletebtn) {
    item.addEventListener("click", (e) => {
      e.target.parentElement.remove();
    });
  }
  addedParamCount++;
});

document.getElementById('responseJsonText').innerHTML =` Your response will apear here.....................`;


let submitbtn = document.getElementById("submitbtn");
submitbtn.addEventListener("click", () => {
  // document.getElementById("responsetext").innerHTML =
  //   "fetching .................";
  document.getElementById('responseJsonText').innerHTML = `Fetching data ................ `;


  // getting value from our page
  let url = document.getElementById("url").value;
  let requestradio;
  let contentradio;
  if (document.getElementById("get").checked) {
    requestradio = document.getElementById("get").value;
  } else {
    requestradio = document.getElementById("post").value;
  }
  if (document.getElementById("JSON").checked) {
    contentradio = document.getElementById("JSON").value;
  } else {
    contentradio = document.getElementById("parameter").value;
  }

  if (contentradio == "parameter") {
    data = {};
    for (let i = 1; i < addedParamCount + 1; i++) {
      if (document.getElementById("parametervalue" + i) != undefined) {
        let key = document.getElementById("parameterkey" + i).value;
        let value = document.getElementById("parametervalue" + i).value;
        data[key] = value;
      }
    }
    data = JSON.stringify(data);
  } else {
    data = document.getElementById("jsontext").value;
  }

  console.log(url.length, requestradio, contentradio, data);
  if (url.length != 0){
        if (requestradio == "GET") {
          fetch(url, {
            method: "GET",
          })
            .then(response => response.text())
            .then((text) => {
              document.getElementById("responseJsonText").innerHTML = text;
              sessionStorage.setItem("copy",text);
              Prism.highlightAll();
            });
        } else{
          fetch(url,{
            method:"POST",
            body:data,
            headers:{
              "Content-type": "application/json; charset=UTF-8"
            }
          })
          .then(response => response.text())
          .then((text)=>{
            document.getElementById('responseJsonText').innerHTML = text;
            Prism.highlightAll();
          })
        }
} 
else 
{
  document.getElementById('responseJsonText').value = "Please Provide a valid URL"

}
});
function CopyFunction() {
  let a = sessionStorage.getItem('copy')
  console.log(a)

  document.execCommand("copy")
  sessionStorage.removeItem('copy')
}
