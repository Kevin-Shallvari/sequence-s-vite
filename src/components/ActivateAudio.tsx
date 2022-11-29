import { styled } from 'goober'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { audio } from '../globals/audio'
import { colors } from '../utils/colors'
import { borderRadius } from '../utils/common-styles'
import { PrimaryButton } from './Buttons.tsx'

export const Container = styled('section')`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  background: ${colors.blue.dark};
  background: ${`linear-gradient(
    90deg,
    ${colors.blue.dark} 0%,
    ${colors.blue.base} 51%,
    ${colors.blue.dark} 97%
  )`};
  height: 100vh;
  color: ${colors.white.base};
`

const WelcomeContainer = styled('div')`
  border: 1px solid ${colors.gray.dark};
  grid-column: 3/11;
  height: fit-content;
  margin: auto 0;
  padding: 1rem 2rem;
  text-align: center;
  background-color: ${colors.blue.dark};
  box-shadow: 0px 2px 1.625rem 0.25rem ${colors.white.base}10;
`

export const ActivateAudio: FC = () => {
  const navigate = useNavigate()

  return (
    <Container>
      <WelcomeContainer className={borderRadius}>
        <h2>Welcome To Sequence-S</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore dolor molestiae aut praesentium, ipsa nobis
          labore alias voluptas voluptatum saepe quo! Consequatur odit dignissimos corporis, pariatur natus autem
          provident aliquam, eaque facere doloremque laudantium reiciendis quisquam impedit animi, neque aperiam
          blanditiis officiis magni? Doloribus fugit accusamus impedit, maxime possimus atque vel animi molestias
          quibusdam et esse! Unde maiores repudiandae accusamus earum saepe voluptatum id rerum aperiam ducimus
          consequatur hic ratione possimus, laudantium illo mollitia, quae corrupti harum qui placeat, nulla esse
          expedita? Dolores laboriosam, repellat, cumque deleniti natus reiciendis nesciunt, neque illum doloremque
          nobis facere explicabo necessitatibus veniam quas voluptatum?
        </p>
        <PrimaryButton
          onClick={() => {
            audio.resume().then(() => navigate('sequence-s'))
          }}
        >
          Resume audio
        </PrimaryButton>
      </WelcomeContainer>
    </Container>
  )
}
