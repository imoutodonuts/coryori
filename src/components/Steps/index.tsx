import { IconButton, TextField } from '@fluentui/react'
import { useEffect, useState } from 'react'
import { Recipe } from '../../api'
import { getRandomId } from '../../utils'
import Heading from '../Heading'
import { StepContainer, stepInputStyles } from './styles'

export interface Step {
  key: string
  value: Recipe['steps'][number]
}

interface Props {
  isPreview?: boolean
  steps: Step[]
  setSteps?: (steps: this['steps']) => void
}

const Steps = ({ isPreview, steps, setSteps }: Props) => {
  const [focusedInput, setFocusedInput] = useState<number>()

  useEffect(() => {
    if (isPreview) return
    for (let i = 0; i < 3; ++i) {
      steps.push({ key: getRandomId(4), value: '' })
    }
    setSteps?.([...steps])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!isPreview && focusedInput !== undefined) {
      document.getElementById(`step-input-${focusedInput}`)?.focus()
      setFocusedInput(undefined)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.length])

  const handleAddStep = (index: number) => {
    steps.splice(index + 1, 0, { key: getRandomId(4), value: '' })
    setSteps?.([...steps])
    setFocusedInput(index + 1)
  }

  const handleRemoveStep = (index: number) => {
    steps.splice(index, 1)
    setSteps?.([...steps])
  }

  return (
    <div>
      {steps.map((step, index, steps) => (
        <div key={step.key}>
          <Heading level={2}>{`步骤 ${index + 1}/${steps.length}`}</Heading>
          {isPreview ? (
            <p>{step.value}</p>
          ) : (
            <StepContainer>
              <TextField
                id={`step-input-${index}`}
                autoAdjustHeight
                borderless
                multiline
                resizable={false}
                spellCheck="false"
                styles={stepInputStyles}
                onChange={(e, value) => {
                  steps[index].value = value ?? ''
                  setSteps?.([...steps])
                }}
              />
              <div className="step-actions">
                <IconButton
                  iconProps={{ iconName: 'Add' }}
                  onClick={() => handleAddStep(index)}
                />
                <IconButton
                  iconProps={{ iconName: 'Delete' }}
                  tabIndex={-1}
                  title="删除"
                  onClick={() => handleRemoveStep(index)}
                />
              </div>
            </StepContainer>
          )}
        </div>
      ))}
    </div>
  )
}

export default Steps
