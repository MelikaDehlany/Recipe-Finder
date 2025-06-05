import { useFavorites } from '../context/FavoritesContext'
import RecipeCard from '../components/RecipeCard'
import styles from '../styles/Favorites.module.css'

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites()

  return (
    <div className={styles.favoritesContainer}>
      <h1 className={styles.favoritesTitle}>Your Favorite Recipes</h1>
      
      {favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <p>You haven't saved any recipes yet.</p>
          <a href="/" className={styles.browseLink}>Browse recipes</a>
        </div>
      ) : (
        <div className={styles.favoritesGrid}>
          {favorites.map(recipe => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              onRemove={() => removeFavorite(recipe.id)}
            />
          ))}
        </div>
      )}
    </div>
  )
}