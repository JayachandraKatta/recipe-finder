import {useNavigate} from 'react-router-dom'
import './index.css'

const RecipeCard = ({recipe}) => {
  const navigate = useNavigate()

  const shortText =
    recipe.strInstructions.length > 120
      ? recipe.strInstructions.slice(0, 120) + '...'
      : recipe.strInstructions

  const goToProductPage = () => {
    navigate(`/recipe/${recipe.idMeal}`)
  }

  return (
    <div className="recipe-card" onClick={goToProductPage}>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="recipe-image"
      />

      <div className="recipe-content">
        <h3 className="recipe-title">{recipe.strMeal}</h3>

        <div className="tags">
          {recipe.strCategory && (
            <span className="tag category">{recipe.strCategory}</span>
          )}
          {recipe.strArea && (
            <span className="tag area">{recipe.strArea}</span>
          )}
        </div>

        <p className="recipe-desc">{shortText}</p>

        <p className="recipe-link">Click for full recipe →</p>
      </div>
    </div>
  )
}

export default RecipeCard
