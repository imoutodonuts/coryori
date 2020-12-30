import { PrimaryButton, Stack, Text, TextField } from '@fluentui/react'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Recipe } from '../../api'
import { SyncStatus } from '../../App'
import Container from '../../components/Container'
import Ingredients, { Ingredient } from '../../components/Ingredients'
import Steps, { Step } from '../../components/Steps'
import { isNull, standardize } from '../../utils'
import { buttonStyles, errorMessageStyles, titleStyles } from './styles'

interface Props {
  author: string
  setSyncStatus: (syncStatus: SyncStatus) => void
}

const Upload = ({ author, setSyncStatus }: Props) => {
  const [title, setTitle] = useState('')
  const [titleError, setTitleError] = useState<string>()
  const [ingredients, setIngredients] = useState<Ingredient[]>([])
  const [ingredientsError, setIngredientsError] = useState<string>()
  const [steps, setSteps] = useState<Step[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const history = useHistory()

  useEffect(() => {
    setIngredientsError(undefined)
  }, [ingredients])

  const submit = async () => {
    setIsSubmitting(true)
    const recipe = new Recipe(
      title.trim(),
      author,
      ingredients.map((ingredient) => {
        if (
          ingredient.value.number === undefined ||
          typeof ingredient.value.number === 'number'
        ) {
          return ingredient.value
        }
        const amount = standardize(ingredient.value.number)
        ingredient.value.number = amount[0]
        ingredient.value.unit = amount[1]
        return ingredient.value
      }),
      steps.map((step) => step.value.trim())
    )
    if (isNull(recipe.title)) {
      setIsSubmitting(false)
      setTitleError('请填写标题')
      return
    }
    if (recipe.ingredients.length === 0) {
      setIsSubmitting(false)
      setIngredientsError('请填写食材')
      return
    }
    try {
      const res = await Recipe.put(recipe)
      if (res.ok) {
        setSyncStatus('unsynced')
        history.push(`/recipes/${recipe.author}/${recipe.title}`)
      }
    } catch (ex) {
      setIsSubmitting(false)
      switch (ex.status) {
        case 409:
          setTitleError('食谱名已存在')
          break
        default:
          setTitleError(ex.message)
      }
    }
  }

  return (
    <Container>
      <TextField
        autoFocus
        borderless
        errorMessage={titleError}
        placeholder="标题"
        spellCheck="false"
        styles={titleStyles}
        onChange={(e, value) => {
          setTitleError(undefined)
          setTitle(value ?? '')
        }}
      />
      <Ingredients ingredients={ingredients} setIngredients={setIngredients} />
      <Text block styles={errorMessageStyles}>
        {ingredientsError}
      </Text>
      <Steps steps={steps} setSteps={setSteps} />
      <Stack horizontal horizontalAlign="end">
        <PrimaryButton
          disabled={isSubmitting}
          styles={buttonStyles}
          onClick={submit}
        >
          上传
        </PrimaryButton>
      </Stack>
    </Container>
  )
}

export default Upload
