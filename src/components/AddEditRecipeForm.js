import { useState } from "react";

function AddEditRecipeForm({ handleAddRecipe }) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [publishDate, setPublishDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [directions, setdirections] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");

  const handleRecipeFormSubmit = (e) => {
    e.preventDefault();
    if (ingredients.length === 0) {
      alert("Ingredients cannot be empty. Please add at least 1 ingredient");
      return;
    }

    const isPublished = new Date(publishDate) <= new Date() ? true : false;

    const newRecipe = {
      name,
      category,
      directions,
      publishDate: new Date(publishDate),
      isPublished,
      ingredients,
    };

    handleAddRecipe(newRecipe);
  };

  const handleAddIngredient = (e) => {
    if (e.key && e.key !== "Enter") {
      return;
    }
    e.preventDefault();
    if (!ingredientName) {
      alert("Missing ingredient. Please double check!");
      return;
    }

    setIngredients([...ingredients, ingredientName]);
    setIngredientName("");
  };

  return (
    <form
      onSubmit={handleRecipeFormSubmit}
      className="add-edit-recipe-form-container"
    >
      <h2>Add a New Recipe</h2>
      <div className="top-form-section">
        <div className="fields">
          <label className="recipe-label input-label">
            Recipe Name:
            <input
              type="text"
              required
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="input-text"
            />
          </label>
          <label className="recipe-label input-label">
            Category:
            <select
              required
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
              className="select"
            >
              <option value=""></option>
              <option value="breadsSandwichesAndPizza">
                Breads, Sandwiches, and Pizza
              </option>
              <option value="eggsAndBreakfast">Eggs & Breakfast</option>
              <option value="dessertsAndBakedGoods">
                Desserts & Baked Goods
              </option>
              <option value="fishAndSeafood">Fish & Seafood</option>
              <option value="vegetables">Vegetables</option>
            </select>
          </label>
          <label className="recipe-label input-label">
            Directions:
            <textarea
              type="text"
              required
              value={directions}
              onChange={(e) => {
                setdirections(e.target.value);
              }}
              className="input-text directions"
            />
          </label>
          <label className="recipe-label input-label">
            Publish Date:
            <input
              type="date"
              required
              value={publishDate}
              onChange={(e) => {
                setPublishDate(e.target.value);
              }}
              className="input-text"
            />
          </label>
        </div>
      </div>
      <div className="ingredients-list">
        <h3 className="text-center">Ingredients</h3>
        <table className="ingredients-table">
          <thead>
            <tr>
              <th className="table-header">Ingredient</th>
              <th className="table-header">Delete</th>
            </tr>
          </thead>
          <tbody>
            {ingredients && ingredients.length > 0
              ? ingredients.map((ingredient, i) => {
                  return (
                    <tr key={ingredient + i}>
                      <td className="table-data text-center">{ingredient}</td>
                      <td className="table-data text-center">
                        <button
                          type="button"
                          className="secondary-button ingredient-delete-button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        {ingredients && ingredients.length === 0 ? (
          <h3 className="text-center no-ingredients">
            No ingredients added yet
          </h3>
        ) : null}
        <div className="ingredient-form">
          <label className="ingredient-label">
            Ingredient:
            <input
              type="text"
              value={ingredientName}
              onChange={(e) => {
                setIngredientName(e.target.value);
              }}
              onKeyDown={handleAddIngredient}
              className="input-text"
              placeholder="ex. 1 cup of sugar"
            />
          </label>
          <button
            type="button"
            className="primary-button add-ingredient-button"
            onClick={handleAddIngredient}
          >
            Add Ingredient
          </button>
        </div>
      </div>
      <div className="action-buttons">
        <button type="submit" className="primary-button action-button">
          Create Recipe
        </button>
      </div>
    </form>
  );
}

export default AddEditRecipeForm;
