import slogan from '../../assets/slogan.png'
import { Button, XStack } from "tamagui";
import { useNavigate } from "react-router-dom"
// import styles from './index.module.css'

export default function Header() {
    const navigate = useNavigate();


    const handleLogoff = () => {
        setTimeout(() => {
            navigate('/');
        })
    }



    return (
        <XStack h={40} w="100%" mt='$4' justifyContent="center">
            <XStack w="80%" alignItems="center" gap="$2" justifyContent="space-between">
                <img src={slogan} alt="" />
                <Button onPress={handleLogoff} fontFamily={'$body'} color={'$white1'} bg={'#016f84'}>
                    Sair
                </Button>
            </XStack>
        </XStack>
    )
}
