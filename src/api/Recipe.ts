import { Temporal } from 'proposal-temporal'
import { isNull } from '../utils'
import Database from './Database'

class Recipe {
  _id: string
  type: 'recipe'
  title: string
  author: string
  ingredients: {
    name: string
    number?: string | number
    unit?: string
  }[]
  steps: string[]
  date: string

  constructor(
    title: Recipe['title'],
    author: Recipe['author'],
    ingredients: Recipe['ingredients'],
    steps: Recipe['steps']
  ) {
    this._id = `recipe:${author}_${title}`
    this.type = 'recipe'
    this.title = title
    this.author = author
    this.ingredients = ingredients.filter(
      (ingredient) => !isNull(ingredient.name)
    )
    this.steps = steps.filter((step) => !isNull(step))
    this.date = Temporal.now.instant().toJSON()
  }

  static async get(id: string) {
    return await Database.local.get<Recipe>(id)
  }

  static async put(recipe: Recipe) {
    return await Database.local.put(recipe)
  }

  static async remove(recipe: { _id: string; _rev: string }) {
    return await Database.local.remove(recipe)
  }

  static async random() {
    const res = await Database.local.allDocs<Recipe>()
    const recipes = res.rows.filter(
      (recipe) => recipe.id.slice(0, recipe.id.indexOf(':')) === 'recipe'
    )
    const random = Math.floor(Math.random() * recipes.length)
    return await this.get(recipes[random].id)
  }

  static async getAll(author?: string, limit?: number) {
    await Database.local.createIndex({
      index: {
        fields: ['date', 'type', 'author'],
      },
    })
    const request: Parameters<typeof Database.local.find>[0] = {
      selector: {
        type: { $eq: 'recipe' },
        date: { $exists: true },
      },
      sort: [{ date: 'desc' }],
      limit: limit,
    }
    if (author !== undefined) {
      request.selector.author = { $eq: author }
    }
    const res = await Database.local.find(request)
    return (res.docs as unknown) as Recipe[]
  }
}

export default Recipe
