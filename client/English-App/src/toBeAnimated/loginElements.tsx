import { nanoid } from 'nanoid';
import WelcomeCharacter from "../assets/Welcome-character.png"
import World from "../assets/Globe.png"
import mentalHealthIllustration from "../assets/Mental-health.png"
import loginSuccessIllustration from "../assets/Login-success.png"
const loginElements = [{
    img: < img key={nanoid()} className='sliding-image' src={WelcomeCharacter} alt="Uma pessoa de massinha estudando." />,
    p: <p className='flowing-text' key={nanoid()}>Welcome to Hope!<br /> Parabéns pela decisão de aprender um novo idioma!</p>
},
{
    img: < img key={nanoid()} className='sliding-image' src={World} alt="O planeta Terra de massinha." />,
    p: <p className='flowing-text' key={nanoid()}>O Inglês se tornou a língua franca do mundo.<br/>Aprendê-lo se tornou uma habilidade essencial.</p>
},
{
    img: < img key={nanoid()} className='sliding-image' src={mentalHealthIllustration} alt="Uma pessoa de massinha com um coração roxo e um cérebro ao lado." />,
    p: <p className='flowing-text' key={nanoid()}>Além disso, aprender um segundo idioma traz diversos benefícios,<br />Como melhora da memória e maior criatividade.</p>
},
{
    img: < img key={nanoid()} className='sliding-image' src={loginSuccessIllustration} alt="Uma pessoa de massinha fazendo login com sucesso." />,
    p: <p className='flowing-text' key={nanoid()}>Faça o login e descubra o Inglês conosco!</p>
}
]

export default loginElements