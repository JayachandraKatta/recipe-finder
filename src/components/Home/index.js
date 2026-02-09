import {useState} from 'react'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import RecipeCard from '../RecipeCard'
import './index.css'

const categories = ['Chicken', 'Pasta', 'Chocolate', 'Beef', 'Salad', 'Soup']

const Home = () => {
  const [search, setSearch] = useState('')
  const [recipes, setRecipes] = useState([])
  const navigate = useNavigate()

  const fetchRecipes = async query => {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
    )
    const data = await res.json()
    setRecipes(data.meals || [])
  }

  const logout = () => {
    Cookies.remove('jwt_token')
    navigate('/login', {replace: true})
  }

  return (
    <>
      <header className="top-header">
        <h1>🔍 Recipe Finder</h1>
        <p>Discover delicious recipes by ingredient or dish name</p>
        <button onClick={logout} className="logout">
          Logout
        </button>
      </header>

      <div className="search-area">
        <input
          placeholder="Search recipes..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button onClick={() => fetchRecipes(search)}>Search</button>
      </div>

      {recipes.length === 0 && (
        <div className="empty-state">
          <div className="chef">👨‍🍳</div>
          <h2>Ready to cook something amazing?</h2>
          <p>
            Search for recipes by entering an ingredient you have or the name of
            a dish you'd like to make.
          </p>

          <div className="categories">
            {categories.map(each => (
              <button key={each} onClick={() => fetchRecipes(each)}>
                {each}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="recipes-grid">
        {recipes.map(each => (
          <RecipeCard key={each.idMeal} recipe={each} />
        ))}
      </div>
    </>
  )
}

export default Home
