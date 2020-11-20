let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  handleCards()
  displayForm()
  formEvent();
});


let inputName, inputImage;

function formEvent(){
  const submitButton = document.querySelector(".submit");

  submitButton.addEventListener("click", function(event){
    event.preventDefault();
    const inputTextFields = document.querySelectorAll(".input-text");
    inputTextFields.forEach(function(item){

      if (item.name === "name"){
        inputName = item.value;
      }
      else{
        inputImage = item.value
      }
    })

    postRequestToy(inputName, inputImage);

  })
}

function displayForm() {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
}

const handleCards = () => {
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(cards => {
    cards.forEach(card => renderCard(card))
  })
}

const renderCard = (card) => {
  const toyCollection = document.querySelector("#toy-collection");
  toyCollection.innerHTML = ""

  const toyCard = document.createElement('div')
  toyCard.className = "card"
  
  const toyName = document.createElement('h1')
  toyName.innerText = card.name
  
  const toyImage = document.createElement('img')
  toyImage.src = card.image
  toyImage.className = "toy-avatar"
  
  const like = document.createElement('p')
  like.innerText = `${card.likes} likes`
  
  
  const likeBtn  = document.createElement('button')
  likeBtn.innerText = '💖'



  toyCollection.appendChild(toyCard)
  toyCard.appendChild(toyName)
  toyCard.appendChild(toyImage)
  toyCard.appendChild(like)
  toyCard.appendChild(likeBtn)
}
const postRequestToy = () => {

  fetch('http://localhost:3000/toys', 
    {method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "name": inputName,
      "image": inputImage,
      "likes": "0"
    })
  }
  ).then();
}
