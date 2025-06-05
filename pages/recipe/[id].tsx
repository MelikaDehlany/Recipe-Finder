import { GetStaticPaths, GetStaticProps } from 'next'
import FavoriteButton from '../../components/FavoriteButton'
import styles from '../../styles/Recipe.module.css'

interface RecipeDetails {
  id: number
  title: string
  image: string
  readyInMinutes: number
  servings: number
  extendedIngredients: {
    id: number
    name: string
    amount: number
    unit: string
  }[]
  analyzedInstructions: {
    steps: {
      number: number
      step: string
    }[]
  }[]
  summary: string
}

interface RecipePageProps {
  recipe: RecipeDetails | null
}

export default function RecipePage({ recipe }: RecipePageProps) {
  if (!recipe) return <div className={styles.error}>Recipe not found</div>

  return (
    <div className={styles.recipeContainer}>
      <div className={styles.recipeHeader}>
        <img src={recipe.image} alt={recipe.title} className={styles.recipeImage} />
        <div className={styles.recipeTitleContainer}>
          <h1 className={styles.recipeTitle}>{recipe.title}</h1>
          <FavoriteButton recipe={recipe} />
        </div>
      </div>

      <div className={styles.recipeMeta}>
        <span>⏱️ Ready in {recipe.readyInMinutes} minutes</span>
        <span>👨‍👩‍👧‍👦 Serves {recipe.servings}</span>
      </div>

      <div className={styles.recipeSection}>
        <h2>About This Recipe</h2>
        <div dangerouslySetInnerHTML={{ __html: recipe.summary }} className={styles.recipeSummary} />
      </div>

      <div className={styles.recipeSection}>
        <h2>Ingredients</h2>
        <ul className={styles.ingredientsList}>
          {recipe.extendedIngredients.map(ingredient => (
            <li key={ingredient.id} className={styles.ingredientItem}>
              {ingredient.amount} {ingredient.unit} {ingredient.name}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.recipeSection}>
        <h2>Instructions</h2>
        <ol className={styles.instructionsList}>
          {recipe.analyzedInstructions[0]?.steps.map(step => (
            <li key={step.number} className={styles.instructionStep}>
              {step.step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // می‌تونی اینجا چند id نمونه بذاری یا از API بگیری
  // برای مثال فقط 10 دستور غذا را می‌گیریم
  const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY
  const res = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&number=10`)
  const data = await res.json()

  const paths = (data.results || []).map((recipe: { id: number }) => ({
    params: { id: recipe.id.toString() }
  }))

  return {
    paths,
    fallback: 'blocking', // اگر id نبود، صفحه را به صورت on-demand بساز
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params as { id: string }
  const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY

  try {
    const res = await fetch(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`)
    if (!res.ok) {
      return { notFound: true }
    }
    const recipe = await res.json()
    return {
      props: { recipe },
      revalidate: 60 * 60, // هر یک ساعت یک بار صفحه آپدیت شود
    }
  } catch (error) {
    return { props: { recipe: null } }
  }
}