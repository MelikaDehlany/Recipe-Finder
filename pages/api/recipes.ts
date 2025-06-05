import { NextApiRequest, NextApiResponse } from 'next'

const API_KEY = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY
if (!API_KEY) {
  throw new Error('API Key is not defined')
}

const BASE_URL = 'https://api.spoonacular.com/recipes'

interface RecipeResponse {
  id: number
  title: string
  image: string
  readyInMinutes?: number
  servings?: number
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query, ingredients, diet, sort, page = '1', number = '10' } = req.query

  // تبدیل مطمئن به string
  const queryStr = typeof query === 'string' ? query : ''
  const ingredientsStr = typeof ingredients === 'string' ? ingredients : ''
  const dietStr = typeof diet === 'string' ? diet : ''
  const sortStr = typeof sort === 'string' ? sort : ''
  const pageStr = typeof page === 'string' ? page : '1'
  const numberStr = typeof number === 'string' ? number : '10'

  const offset = (parseInt(pageStr) - 1) * parseInt(numberStr)

  try {
    const params = new URLSearchParams()
    params.append('apiKey', API_KEY as string)
    params.append('offset', offset.toString())
    params.append('number', numberStr)
    params.append('instructionsRequired', 'true')
    params.append('addRecipeInformation', 'true')

    // جستجوی محبوب
    if (queryStr.toLowerCase() === 'popular') {
      params.append('sort', 'popularity')
      params.append('sortDirection', 'desc')
    } 
    // جستجوی عادی
    else if (queryStr) {
      params.append('query', queryStr)
    } else if (ingredientsStr) {
      params.append('includeIngredients', ingredientsStr)
    }

    if (dietStr) params.append('diet', dietStr)
    if (sortStr) params.append('sort', sortStr)

    const response = await fetch(`${BASE_URL}/complexSearch?${params}`)
    const data = await response.json()

    res.status(200).json({
      results: data.results || [],
      totalResults: data.totalResults || 0
    })
  } catch (error) {
    console.error('Error fetching recipes:', error)
    res.status(500).json({ 
      error: 'Failed to fetch recipes',
      message: error instanceof Error ? error.message : 'Unknown error'
    })
  }
}