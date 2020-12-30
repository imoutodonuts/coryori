import { IconButton, Stack, Text, TextField } from '@fluentui/react'
import { useEffect, useState } from 'react'
import { Recipe } from '../../api'
import { getRandomId, standardize } from '../../utils'
import Heading from '../Heading'
import {
  addSubButtonStyles,
  IngredientContainer,
  itemInputStyles,
  servingsInputStyles,
  Table,
} from './styles'

export interface Ingredient {
  key: string
  value: Recipe['ingredients'][number]
}

interface Props {
  isPreview?: boolean
  ingredients: Ingredient[]
  setIngredients?: (ingredients: this['ingredients']) => void
}

const calculate = (amount: Recipe['ingredients'][number], servings: number) => {
  if (typeof amount.number === 'number') {
    let number = amount.number * (isNaN(servings) ? 0 : servings)
    let unit = amount.unit ?? ''
    number = number < 1 ? parseFloat(number.toFixed(1)) : Math.round(number)
    switch (unit) {
      case 'g':
        if (number >= 1000) {
          number = number / 1000
          number = parseFloat(number.toFixed(2))
          unit = ' 千克'
        } else unit = ' 克'
        break
      case 'ml':
        if (number >= 1000) {
          number = number / 1000
          number = parseFloat(number.toFixed(2))
          unit = ' 升'
        } else unit = ' 毫升'
        break
    }
    return number + unit
  }
  return amount.number
}

const Ingredients = ({ isPreview, ingredients, setIngredients }: Props) => {
  const [focusedInput, setFocusedInput] = useState<number>()
  const [servings, setServings] = useState<number | string>(1)

  useEffect(() => {
    if (isPreview) return
    for (let i = 0; i < 3; ++i) {
      ingredients.push({ key: getRandomId(4), value: { name: '' } })
    }
    setIngredients?.([...ingredients])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isPreview && focusedInput !== undefined) {
      document.getElementById(`ingredient-input-${focusedInput}`)?.focus()
      setFocusedInput(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients.length])

  const handleServingsChange = (
    type: 'addition' | 'subtraction' | 'modification',
    newServings?: string
  ) => {
    if (newServings !== undefined) {
      newServings = newServings.slice(
        0,
        newServings.match(/^(\d+\.?\d*)|(\d*\.?\d+)/)?.[0].length ?? 0
      )
      setServings(newServings)
    } else {
      const newServings =
        typeof servings === 'string' ? parseFloat(servings) : servings
      if (type === 'subtraction' && servings <= 1) return
      setServings(type === 'addition' ? newServings + 1 : newServings - 1)
    }
  }

  const handleAmountChange = (value: string | undefined, index: number) => {
    if (value) {
      const ingredient = ingredients[index].value
      if (isPreview) {
        const amount = standardize(value)
        ingredient.number = amount[0]
        ingredient.unit = amount[1]
        setIngredients?.([...ingredients])
      } else {
        ingredient.number = value
        setIngredients?.([...ingredients])
      }
    }
  }

  const handleAddIngredient = (index: number) => {
    ingredients.splice(index + 1, 0, {
      key: getRandomId(4),
      value: { name: '' },
    })
    setIngredients?.([...ingredients])
    setFocusedInput(index + 1)
  }

  const handleRemoveIngredient = (index: number) => {
    ingredients.splice(index, 1)
    setIngredients?.([...ingredients])
  }

  return (
    <div>
      <Heading level={2}>食材</Heading>
      {isPreview && (
        <Stack horizontal verticalAlign="center">
          <Text>份数：</Text>
          <IconButton
            iconProps={{ iconName: 'CalculatorSubtract' }}
            styles={addSubButtonStyles}
            onClick={() => handleServingsChange('subtraction')}
          />
          <TextField
            borderless
            maxLength={3}
            value={servings.toString()}
            styles={servingsInputStyles}
            onChange={(e, value) => handleServingsChange('modification', value)}
          />
          <IconButton
            iconProps={{ iconName: 'CalculatorAddition' }}
            styles={addSubButtonStyles}
            onClick={() => handleServingsChange('addition')}
          />
        </Stack>
      )}
      <Table>
        <tbody>
          {ingredients.map((ingredient, index, ingredients) => (
            <IngredientContainer key={ingredient.key}>
              <td>
                <TextField
                  id={`ingredient-input-${index}`}
                  borderless
                  placeholder="食材"
                  readOnly={isPreview}
                  spellCheck="false"
                  value={ingredients[index].value.name}
                  styles={itemInputStyles}
                  onChange={(e, value) => {
                    ingredients[index].value.name = value ?? ''
                    setIngredients?.([...ingredients])
                  }}
                />
              </td>
              <td>
                <TextField
                  borderless
                  placeholder={isPreview ? '' : '用量'}
                  readOnly={isPreview}
                  spellCheck="false"
                  value={calculate(
                    ingredients[index].value,
                    typeof servings === 'string'
                      ? parseFloat(servings)
                      : servings
                  )}
                  styles={itemInputStyles}
                  onChange={(e, value) => handleAmountChange(value, index)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') handleAddIngredient(index)
                  }}
                />
              </td>
              <td>
                {isPreview || (
                  <div className="ingredient-actions">
                    <IconButton
                      iconProps={{ iconName: 'Add' }}
                      tabIndex={-1}
                      title="添加"
                      onClick={() => handleAddIngredient(index)}
                    />
                    <IconButton
                      iconProps={{ iconName: 'Delete' }}
                      tabIndex={-1}
                      title="删除"
                      onClick={() => handleRemoveIngredient(index)}
                    />
                  </div>
                )}
              </td>
            </IngredientContainer>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Ingredients
