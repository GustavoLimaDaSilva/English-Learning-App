 import { nanoid } from 'nanoid';
 import studyIllustration from "../assets/Study.png"
 import mentalHealthIllustration from "../assets/Mental-health.png"
 import loginSuccessIllustration from "../assets/Login-success.png"
const loginElements = [{
    img: < img key={nanoid()} className='sliding-image' src={studyIllustration} alt="A clay person studying." />,
    p: <p key={nanoid()}>Descubra o Inglês conosco</p>
},
{
    img: < img key={nanoid()} className='sliding-image' src={mentalHealthIllustration} alt="A clay person's head with a green heart in it." />,
    p: <p key={nanoid()}>Aprender um novo idioma melhora sua saúde mental</p>
},
{
    img: < img key={nanoid()} className='sliding-image' src={loginSuccessIllustration} alt="A clay person's head with a green heart in it." />,
    p: <p key={nanoid()}>Faça o login e descubra o Inglês conosco</p>
}
]

export default loginElements