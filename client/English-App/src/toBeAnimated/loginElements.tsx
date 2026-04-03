import { nanoid } from 'nanoid';
import studyIllustration from "../assets/Study.png"
import mentalHealthIllustration from "../assets/Mental-health.png"
import loginSuccessIllustration from "../assets/Login-success.png"
const loginElements = [{
    img: < img key={nanoid()} className='sliding-image' src={studyIllustration} alt="A clay person studying." />,
    p: <p key={nanoid()}>Welcome to Hope!<br/> Parabéns pela decisão de aprender um novo idioma!</p>
},
{
    img: < img key={nanoid()} className='sliding-image' src={mentalHealthIllustration} alt="A clay person's head with a green heart in it." />,
    p: <p key={nanoid()}>Estudos apontam que após apenas 3 meses de estudo de um novo idioma,<br/> ocorrem aumentos na densidade da matéria cinzenta e no volume do hipocampo.</p>
},
{
    img: < img key={nanoid()} className='sliding-image' src={loginSuccessIllustration} alt="A clay person's head with a green heart in it." />,
    p: <p key={nanoid()}>Faça o login e descubra o Inglês conosco!</p>
}
]

export default loginElements