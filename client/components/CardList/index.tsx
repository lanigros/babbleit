import { CardListWrapper } from './CardList.styled'

type CardListProps = {
  children?: JSX.Element | JSX.Element[]
}

export default function CardList({ children }: CardListProps) {
  return <CardListWrapper>{children}</CardListWrapper>
}
