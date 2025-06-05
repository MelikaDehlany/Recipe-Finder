import { useFavorites } from '../context/FavoritesContext'
import styles from '../styles/Search.module.css'

interface FavoriteButtonProps {
  recipe: {
    id: number
    title: string
    image: string
  }
}

export default function FavoriteButton({ recipe }: FavoriteButtonProps) {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites()
  const fav = isFavorite(recipe.id)

  const handleClick = () => {
    if (fav) {
      removeFavorite(recipe.id)
    } else {
      addFavorite(recipe)
    }
  }

  return (
    <button 
      onClick={handleClick}
      className={`${styles.favoriteButton} ${fav ? styles.active : ''}`}
      aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
      type="button"
    >
      {fav ? '❤️' : '🤍'}
    </button>
  )
}