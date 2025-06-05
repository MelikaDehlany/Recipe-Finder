import Link from 'next/link'
import FavoriteButton from './FavoriteButton'
import styles from '../styles/Search.module.css'

interface RecipeCardProps {
  recipe: {
    id: number
    title: string
    image: string
    readyInMinutes?: number
    servings?: number
  }
  onRemove?: () => void
}

export default function RecipeCard({ recipe, onRemove }: RecipeCardProps) {
  return (
    <div className={styles.recipeCard}>
      <div className={styles.cardImageContainer}>
        <img 
          src={recipe.image || '/images/recipe-placeholder.jpg'} 
          alt={recipe.title} 
          className={styles.cardImage}
        />
        <FavoriteButton recipe={recipe} />
      </div>
      
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{recipe.title}</h3>
        
        <div className={styles.recipeMeta}>
          {recipe.readyInMinutes && (
            <span className={styles.metaItem}>
              <i className="icon-clock">⏱️</i> {recipe.readyInMinutes} min
            </span>
          )}
          {recipe.servings && (
            <span className={styles.metaItem}>
              <i className="icon-people">👨‍👩‍👧‍👦</i> {recipe.servings} servings
            </span>
          )}
        </div>

        <div style={{ flex: 1 }} /> 

        <div className={styles.cardActions}>
          <Link href={`/recipe/${recipe.id}`} className={styles.detailsButton}>
            View Recipe
          </Link>
          {onRemove && (
            <button onClick={onRemove} className={styles.removeButton}>
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  )
}