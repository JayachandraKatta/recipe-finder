import {useParams, useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import './index.css'

const RecipeDetails = () => {
  const {id} = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then(res => res.json())
      .then(data => {
        setRecipe(data.meals[0])
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Loading recipe...</p>
      </div>
    )
  }

  if (!recipe) return null

  return (
    <div className="details-page">

      {/* ✅ FIXED BACK BUTTON */}
      <p
        className="back-link"
        onClick={() => navigate(-1)}
      >
        ← Back to results
      </p>

      {/* TOP CARD */}
      <div className="top-card">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="top-image"
        />

        <div className="top-info">
          <h1>{recipe.strMeal}</h1>

          <div className="tags">
            <span className="tag category">{recipe.strCategory}</span>
            <span className="tag area">
              {recipe.strArea} Cuisine
            </span>
          </div>

          <div className="meta">
            <span>⏱ Prep & Cook</span>
            <span>👥 Serves 4–6</span>
          </div>

          <a
            href={recipe.strYoutube}
            target="_blank"
            rel="noreferrer"
            className="video-btn"
          >
            Watch Video Tutorial
          </a>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="bottom-section">

        {/* INGREDIENTS */}
        <div className="ingredients-card">
          <h2>Ingredients</h2>

          {Array.from({length: 20}).map((_, i) => {
            const ing = recipe[`strIngredient${i + 1}`]
            const measure = recipe[`strMeasure${i + 1}`]

            if (!ing) return null

            return (
              <div key={i} className="ingredient-row">
                <span>{ing}</span>
                <span className="measure">{measure}</span>
              </div>
            )
          })}
        </div>

        {/* INSTRUCTIONS */}
        <div className="instructions-card">
          <h2>Instructions</h2>

          <div className="instruction-list">
            {recipe.strInstructions
              .replace(/\r/g, '')
              .split(/\n+/)
              .filter(line => line.trim())
              .map((line, index) => {
                const match = line.match(/^(\d+\.)\s*(.*)/)

                return (
                  <p key={index} className="instruction-step">
                    {match ? (
                      <>
                        <strong>{match[1]}</strong> {match[2]}
                      </>
                    ) : (
                      line
                    )}
                  </p>
                )
              })}
          </div>
        </div>
      </div>

      {recipe.strSource && (
        <a
          href={recipe.strSource}
          target="_blank"
          rel="noreferrer"
          className="source-link"
        >
          View Original Recipe Source →
        </a>
      )}
    </div>
  )
}

export default RecipeDetails