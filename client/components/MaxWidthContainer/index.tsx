import { MaxWidthContainerWrapper } from './MaxWidthContainer.styled'

type MaxWidthContainerProps = {
  children: JSX.Element | (JSX.Element | boolean | null)[]
}

export default function MaxWidthContainer({
  children
}: MaxWidthContainerProps) {
  return <MaxWidthContainerWrapper>{children}</MaxWidthContainerWrapper>
}
