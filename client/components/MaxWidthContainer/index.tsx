import { MaxWidthContainerWrapper } from './MaxWidthContainer.styled'

type MaxWidthContainerProps = {
  children: JSX.Element
}

export function MaxWidthContainer({ children }: MaxWidthContainerProps) {
  return <MaxWidthContainerWrapper>{children}</MaxWidthContainerWrapper>
}
