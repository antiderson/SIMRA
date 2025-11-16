import { XStack, YStack, Button } from "tamagui";
import styles from './index.module.css';
import { useNavigate } from "react-router-dom"
import { CopyrightIcon, InfoIcon } from "@phosphor-icons/react"
import { useRef, useState } from "react";
import fundoLogin from '../../assets/banner.jpg';
import logo from '../../assets/LogoSimra.png';
import { Toast } from 'primereact/toast';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error] = useState('');
    const navigate = useNavigate();
    const toast = useRef<Toast>(null);

    const handleLogin = () => {
        console.log(email, password);
        if (email === 'andersondaniel.adfa@gmail.com' && password === '123456') {
            toast.current?.show({ severity: 'success', summary: 'Login realizado com sucesso!', life: 3000 });
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
        } else {
            toast.current?.show({ severity: 'error', summary: 'Erro no login', detail: 'Email ou senha incorretos.', life: 3000 });
        }
    }

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
                <Toast ref={toast} position="bottom-center" />
                <YStack className={styles.formLayout}  >
                    <YStack width="100%" h={'50px'} alignItems="flex-end" >
                        <InfoIcon size={32} color="#7a7a7a" />
                        {/* <SheetInfo /> */}
                    </YStack>
                    <YStack alignItems="center">
                        {/* <image src={logo} alt="" h={'300px'} w={'300px'}  /> */}
                        <img src={logo} className={styles.logo} />
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
                    <Button className={styles.btnLog} onPress={handleLogin} fontFamily={'$body'} color={'$white1'} unstyled>
                        Entrar
                    </Button>
                    <YStack width="100%" h={'70px'} alignItems="flex-end" justifyContent="flex-end" >
                        {/* <SheetPsswd /> */}
                    </YStack>
                    {error && <p>{error}</p>}
                </YStack>
                <XStack alignItems="center">
                    <CopyrightIcon size={32} color="#7a7a7a" />
                    <p color="#7a7a7a"> 2025 — Todos os direitos reservados — Desenvolvido por SIMRA</p>
                </XStack>
            </YStack>
        </XStack>
    )
}