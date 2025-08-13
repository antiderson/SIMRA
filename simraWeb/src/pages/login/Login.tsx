import { XStack, YStack, Button, Image } from "tamagui";
import styles from './index.module.css';
import { CopyrightIcon, InfoIcon } from "@phosphor-icons/react"
import { useState } from "react";
import fundoLogin from '../../assets/banner.jpg';
import logo from '../../assets/LogoSimra2.png';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error] = useState('');
    // const toast = useRef<Toast>(null);


    return (
        <XStack style={{ maxWidth: "100%" }} >
            <YStack style={{
                backgroundImage: `url(${fundoLogin})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: "60%",
                height: '100vh'
            }} />
            <YStack width={'40%'} h="100vh" justifyContent="space-around" alignItems="center" >
                {/* <Toast ref={toast} position="top-center" /> */}
                <YStack className={styles.formLayout}  >
                    <YStack width="100%" h={'50px'} alignItems="flex-end" >
                        <InfoIcon size={32} color="#7a7a7a" />
                        {/* <SheetInfo /> */}
                    </YStack>
                    <YStack h={'200px'} alignItems="center">
                        <Image src={logo} alt="" h={'90%'} w={'60%'} />
                    </YStack>
                    <YStack h={'20%'} justifyContent="space-between">
                        <input className={styles.input}
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                        />
                        <input className={styles.input}
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Senha"
                        />
                    </YStack>
                    {/* <Button className={styles.btnLog} onPress={handleLogin} fontFamily={'$body'} color={'$white1'} unstyled>
                        Entrar
                    </Button> */}
                    <YStack width="100%" h={'70px'} alignItems="flex-end" justifyContent="flex-end" >
                        {/* <SheetPsswd /> */}
                    </YStack>
                    {error && <p>{error}</p>}
                </YStack>
                <XStack alignItems="center">
                    <CopyrightIcon size={32} color="#7a7a7a" />
                    <p color="#7a7a7a"> 2024 - Todos os direitos reservados - desenvolvido por IASD petrópolis</p>
                </XStack>
            </YStack>
        </XStack>
    )
}