const apiKey = "4b62a7b9dbaa45658301f53972e3f5a7"; // my Spoonacular API key
async function getRandomRecipe() {
  const recipeSection = document.getElementById("recipe-section");
  const goButton = document.getElementById("go-button");
  const homeButton = document.getElementById("home-button");

  try {
      const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${apiKey}`);
      const data = await response.json();
      const recipe = data.recipes[0];

      // Update the recipe section with fetched data
      document.getElementById("recipe-image").src = recipe.image;
      document.getElementById("recipe-title").textContent = recipe.title;

      const ingredientsList = document.getElementById("ingredients-list");
      ingredientsList.innerHTML = "";
      recipe.extendedIngredients.forEach(ingredient => {
          const listItem = document.createElement("li");
          listItem.textContent = ingredient.original;
          ingredientsList.appendChild(listItem);
      });

      const instructionsList = document.getElementById("instructions-list");
      instructionsList.innerHTML = ""; // Clear previous instructions

      // Remove unwanted <ol> or <li> tags from the instructions text
      const instructionsText = recipe.instructions.replace(/<\/?ol>/g, '').replace(/<\/?li>/g, '');
      instructionsText.split('\n').forEach(instruction => {
          const instructionParagraph = document.createElement("p");
          instructionParagraph.textContent = instruction.trim();
          if (instructionParagraph.textContent) {
              instructionsList.appendChild(instructionParagraph);
          }
      });

      // Show the recipe section and the home button, hide the landing page
      recipeSection.style.display = "block";
      homeButton.style.display = "block";
      goButton.style.display = "none"; // Hide the 'Go' button
  } catch (error) {
      console.error("Error fetching the recipe:", error);
  }
}
// Add event listener for the Go button
document.getElementById("go-button").addEventListener("click", () => {
    getRandomRecipe();
    document.querySelector(".landing-page").style.display = "none";
});

// Home button event to go back to the landing page
document.getElementById("home-button").addEventListener("click", () => {
    document.querySelector(".landing-page").style.display = "block";
    document.getElementById("recipe-section").style.display = "none";
    document.getElementById("home-button").style.display = "none"; // Hide the 'Home' button
    document.getElementById("go-button").style.display = "block"; // Show the 'Go' button again
});
