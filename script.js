const cards = document.querySelectorAll(".card");

let cardOne, cardTwo;
let isMatching = false;
let cardSet;

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

cards.forEach((c) => c.addEventListener("click", flipCard));
