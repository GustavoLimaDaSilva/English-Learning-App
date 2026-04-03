 import { nanoid } from 'nanoid';
const loginElements = [{
    img: < img key={nanoid()} className='sliding-image' src="../../assets/Study.webp" alt="A clay person studying." />,
    p: <p key={nanoid()}>Descubra o Inglês conosco</p>
},
{
    img: < img key={nanoid()} className='sliding-image' src="../../assets/mental-health.png" alt="A clay person's head with a green heart in it." />,
    p: <p key={nanoid()}>Aprender um novo idioma melhora sua saúde mental</p>
},
{
    img: < img key={nanoid()} className='sliding-image' src="../../assets/Login-success.png" alt="A clay person's head with a green heart in it." />,
    p: <p key={nanoid()}>Faça o login e descubra o Inglês conosco</p>
}
]

export default loginElements