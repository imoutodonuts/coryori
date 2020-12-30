import { Stack } from '@fluentui/react'
import { Temporal } from 'proposal-temporal'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Recipe } from '../../api'
import cover from '../../assets/img/cover.png'
import Container from '../../components/Container'
import Heading from '../../components/Heading'
import { Author, Cover, StyledLink, Title } from './styles'

const randomPosition = () => Math.floor(Math.random() * 100) + '%'

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const { author } = useParams<{ author: string }>()

  useEffect(() => {
    getRecipes(author)
  }, [author])

  const getRecipes = async (author: string) => {
    const res = await Recipe.getAll(author)
    setRecipes(res)
  }

  return (
    <Container>
      <Heading level={1}>{`${author ? `${author}的` : ''}食谱`}</Heading>
      <Stack horizontal wrap tokens={{ childrenGap: '1.5rem' }}>
        {recipes.map((recipe) => (
          <Stack
            key={recipe._id}
            horizontalAlign="center"
            tokens={{ maxWidth: '11rem', maxHeight: '20rem' }}
          >
            <Link to={`/recipes/${recipe.author}/${recipe.title}`}>
              <Cover
                image={cover}
                position={`${randomPosition()} ${randomPosition()}`}
              />
            </Link>
            <StyledLink
              to={`/recipes/${recipe.author}/${recipe.title}`}
              title={`创作于 ${Temporal.PlainDate.from(
                recipe.date
              ).toString()}`}
            >
              <Title>{recipe.title}</Title>
            </StyledLink>
            <StyledLink to={`/recipes/${recipe.author}`}>
              <Author>{recipe.author}</Author>
            </StyledLink>
          </Stack>
        ))}
      </Stack>
    </Container>
  )
}

export default Recipes
