document.getElementById("container");

document.querySelector("#container");

document.getElementsByClassName("second");
document.querySelectorAll(".second");

document.querySelector("ol.third");

let numberFiveDiv = document.querySelector("container");
numberFiveDiv.innerText = "Hello";

let footer = document.querySelector(".footer");
footer.classList.add("main");

let footer = document.querySelector(".footer");
footer.classList.remove("main");

let newLiElement = document.createElement("li");

newLiElement.innerText = "four";

let list = document.querySelector("ul");
list.appendChild(newLiElement);

let liElementsInOl = document.querySelectorAll("ol .li");
for (let liElementInOl of liElementsInOl) {
  liElementInOl.style.backgroundColor = "green";
}

let footer = document.querySelector(".footer");
footer.remove();
