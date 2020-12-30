import { IconButton } from '@fluentui/react'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Recipe } from '../../api'
import Container from '../../components/Container'
import Heading from '../../components/Heading'
import Ingredients, { Ingredient } from '../../components/Ingredients'
import Steps, { Step } from '../../components/Steps'
import { getRandomId } from '../../utils'
import { HeadingContainer } from './styles'

interface PreviewRecipe
  extends PouchDB.Core.GetMeta,
    Omit<Recipe, 'ingredients' | 'steps'> {
  ingredients: Ingredient[]
  steps: Step[]
}

interface Props {
  username?: string
}

const Preview = ({ username }: Props) => {
  const [recipe, setRecipe] = useState<PreviewRecipe>()
  const [isDeleting, setIsDeleting] = useState(false)
  const history = useHistory()
  const params = useParams<{ author: string; title: string }>()

  const getRecipe = async (id: Recipe['_id']) => {
    const res = await Recipe.get(id)
    for (const [key, value] of Object.entries(res)) {
      if (key === 'ingredients') {
        res[key] = value.map((ingredient: Recipe['ingredients']) => {
          return { key: getRandomId(4), value: ingredient }
        })
        continue
      }
      if (key === 'steps') {
        res[key] = value.map((step: Recipe['steps']) => {
          return { key: getRandomId(4), value: step }
        })
        continue
      }
    }
    setRecipe((res as unknown) as PreviewRecipe)
  }

  useEffect(() => {
    getRecipe(`recipe:${params.author}_${params.title}`)
  }, [params])

  return (
    <Container>
      {recipe && (
        <>
          <HeadingContainer>
            <Heading inline level={1}>
              {recipe.title}
            </Heading>
            {recipe.author === username && (
              <IconButton
                disabled={isDeleting}
                className="delete-button"
                styles={{ root: { '&&': { marginLeft: '0.5rem' } } }}
                iconProps={{ iconName: 'Delete' }}
                title="删除"
                onClick={async () => {
                  setIsDeleting(true)
                  await Recipe.remove(recipe)
                  history.push('/')
                }}
              />
            )}
          </HeadingContainer>
          <Ingredients isPreview ingredients={recipe.ingredients} />
          <Steps isPreview steps={recipe.steps} />
        </>
      )}
    </Container>
  )
}

export default Preview
