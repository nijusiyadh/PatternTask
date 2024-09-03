const containers = document.querySelector(".containers");
const numbers = document.querySelector(".numbers");
const guidecontaier = document.querySelector(".guide");

const numberOfcontainers = 3;
const numberArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const defalutSelectedContainer = 1;
let popingContainer = 2;
let selectedContainer = defalutSelectedContainer;
let selectedNumberArray = [];

const displayNumberInContainer = (inputContainer, numberArraySelected) => {
  const container = document.querySelector(`.container-${inputContainer}`);
  container.innerHTML = "";
  numberArraySelected.forEach((number) => {
    const span = document.createElement("span");
    span.classList.add("number");
    span.id = "number";
    span.innerHTML = number;
    container.appendChild(span);
  });
};

const selectNumber = (number) => {
  selectedNumberArray.push(number);
  let filteredNumberArray = numberArray.filter(
    (number) => !selectedNumberArray.includes(number)
  );
  if (filteredNumberArray.length <= 0) {
    numbers.style.display = "none";
    guidecontaier.style.transform = "translateY(0)";
  }
  displayNumbers(filteredNumberArray);
  displayNumberInContainer(defalutSelectedContainer, selectedNumberArray);
};

const displayNumbers = (Array) => {
  numbers.innerHTML = "";
  Array.forEach((number) => {
    const span = document.createElement("span");
    span.classList.add("number");
    span.id = "number";
    span.innerText = number;

    span.addEventListener("click", () => selectNumber(number));
    numbers.appendChild(span);
  });
};
displayNumbers(numberArray);

let firstClick = true;
let click = 0;
let popedArray = [];

const addSelected = (i) => {
  const containers = document.querySelectorAll(".container");
  containers.forEach((cont) => {
    cont.classList.remove("selected");
  });
  const selectedContainer = document.querySelector(`.container-${i}`);
  selectedContainer.classList.add("selected");
};

const changeContainer = (index) => {
  selectedContainer = index;
  let ContainerSpans = [];
  popedArray = [];
  //   addSelected(selectedContainer);
  const popingContainerSpans = document.querySelectorAll(
    `.container-${popingContainer} span`
  );

  if (popingContainerSpans.length > 0) {
    popingContainerSpans.forEach((span) => {
      popedArray.push(span.innerHTML);
    });
  }

  if (popingContainer !== index) {
    const container = document.querySelectorAll(`.container-${index} span`);
    if (container.length > 0) {
      container.forEach((cont) => {
        // console.log(cont);
        ContainerSpans.push(cont.innerHTML);
        // console.log(ContainerSpans);
      });

      let poped = ContainerSpans.pop();
      popedArray.push(poped);

      //   console.log(ContainerSpans);
      displayNumberInContainer(selectedContainer, ContainerSpans);
      //   selectedNumberArray = selectedNumberArray.filter(
      //     (number) => !popedArray.includes(number)
      //   );
      displayNumberInContainer(popingContainer, popedArray);
    }
  }
};

const addActive = (i) => {
  const containers = document.querySelectorAll(".container");
  containers.forEach((cont) => {
    cont.classList.remove("active");
  });
  const activeContainer = document.querySelector(`.container-${i}`);
  activeContainer.classList.add("active");
};

const displayContainers = () => {
  for (let i = 1; i <= numberOfcontainers; i++) {
    const container = document.createElement("div");
    container.classList.add("container");
    container.classList.add(`container-${i}`);

    if (popingContainer === i) {
      container.classList.add("active");
    }

    // if (selectedContainer === i) {
    //   container.classList.add("selected");
    // }

    container.addEventListener("click", (e) => {
      if (selectedNumberArray.length >= 9) {
        changeContainer(i);
      } else {
        alert("Add all elements first");
      }
    });

    // container.addEventListener("dblclick", (e) => {
    //   if (popingContainer !== i) {
    //     popingContainer = i;
    //     addActive(i);
    //   }
    // });
    containers.appendChild(container);
  }
};

displayContainers();

window.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    if (popingContainer + 1 <= 3) {
      popingContainer++;
    } else {
      popingContainer = 1;
    }
  }
  if (e.key === "ArrowLeft") {
    if (popingContainer - 1 >= 1) {
      popingContainer--;
    } else {
      popingContainer = 3;
    }
  }
  console.log(popingContainer);
  addActive(popingContainer);
});
