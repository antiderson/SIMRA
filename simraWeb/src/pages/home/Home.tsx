import { Button, XStack, YStack } from "tamagui";
import styles from './index.module.css'
import slogan from '../../assets/slogan.png'
import GraphLuz from "../../components/graphLuminosity/GraphLuminosity";
import Header from "../../components/header/Header";
import GraphTemp from "../../components/graphTemp/GraphTemp";

export default function Home() {
  return (
    <YStack className={styles.container}> 
      <Header />
      <XStack margin={'auto'} w={'100%'} justifyContent="space-around" >
        <GraphLuz />
        <GraphTemp />
      </XStack>
    </YStack>
  );
}