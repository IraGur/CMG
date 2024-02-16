const cards = document.querySelectorAll(".card");

let cardOne, cardTwo;
let isMatching = false;
let cardSet;

function shuffleNodeList(nodeList) {
   // Convert the NodeList to an array
   const array = Array.from(nodeList);

   for (let i = array.length - 1; i > 0; i--) {
      // Generate a random index between 0 and i (inclusive)
      const randomIndex = Math.floor(Math.random() * (i + 1));

      // Swap elements at randomIndex and i
      [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
   }

   // Convert the array back to a NodeList
   const shuffledNodeList = document.createDocumentFragment();
   array.forEach((node) => shuffledNodeList.appendChild(node.cloneNode(true)));

   return shuffledNodeList.childNodes;
}

function shuffeCards() {
   const cardBacks = document.querySelectorAll(".card-back");
   const shuffledImages = shuffleNodeList(document.querySelectorAll("img"));

   cardBacks.forEach((cb, i) => {
      cb.innerHTML = shuffledImages[i].outerHTML;
   });
}

function flipCard(e) {
   if (!isMatching) {
      let clickedCard = e.currentTarget;

      if (clickedCard !== cardOne) {
         clickedCard.classList.add("flip");

         if (!cardOne) {
            return (cardOne = clickedCard);
         }

         cardTwo = clickedCard;

         let cardOneImg = cardOne.querySelector("img").src;
         let cardTwoImg = cardTwo.querySelector("img").src;
         matchCards(cardOneImg, cardTwoImg);
      }
   }
}

function matchCards(img1, img2) {
   isMatching = true;
   if (img1 == img2) {
      cardOne.removeEventListener("click", flipCard);
      cardTwo.removeEventListener("click", flipCard);
      reset();
   } else {
      setTimeout(() => {
         cardOne.classList.remove("flip");
         cardTwo.classList.remove("flip");
         reset();
      }, 1200);
   }
}

function reset() {
   cardOne = null;
   cardTwo = null;
   isMatching = false;
}

function restartGame() {
   cards.forEach((card) => {
      card.classList.remove("flip");
      card.addEventListener("click", flipCard);
   });
   shuffeCards();
}

cards.forEach((c) => c.addEventListener("click", flipCard));
