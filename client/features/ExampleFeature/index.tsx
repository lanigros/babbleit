import { useState } from 'react'
import ExampleComponent from '../../components/ExampleComponent'
import { ExampleFeatureButton } from './ExampleFeature.styled'

export default function ExampleFeature() {
  const [isVisible, setIsVisible] = useState(false)
  return (
    <>
      <div>
        <h1>This is a feature</h1>
      </div>
      <ExampleFeatureButton onClick={() => setIsVisible((prev) => !prev)}>
        Click me
      </ExampleFeatureButton>
      {isVisible && <ExampleComponent />}
    </>
  )
}
