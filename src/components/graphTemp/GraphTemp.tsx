// https://nearform.com/open-source/victory/docs/examples/polar-progress-bar/
// historico : https://nearform.com/open-source/victory/docs/examples/histogram-with-slider

import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../../services/firebaseConfig";
import { Text, View } from "react-native";


export default function GraphTemp() {
    const [temp, setTemp] = useState<number | null> (null);

    useEffect(() => {
        const tempRef = ref(db, 'sensores/temperatura');
        onValue(tempRef, snapshot => setTemp(snapshot.val())); 
        
    })
    if (temp !== null && temp > 30) {
     console.error("Temperatura acima do limite seguro");
    } if( temp !==null && temp < 8){
        console.error("Temperatura abaixo do limite seguro");
    }

    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Temperatura: {temp ?? '...'} C°</Text>
        </View>
    )
}