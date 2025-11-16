import slogan from '../../assets/slogan.png'
import { Button, XStack, YStack } from "tamagui";
// import styles from './index.module.css'


export default function Header() {
    return (
        <XStack h={40} w="100%" mt='$4' justifyContent="center">
            <XStack w="80%" alignItems="center" gap="$2" justifyContent="space-between">
                <img src={slogan} alt="" />
                <Button fontFamily={'$body'} color={'$white1'} unstyled>
                    Entrar
                </Button>
            </XStack>
        </XStack>
    )
}
