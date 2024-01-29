import {useNavigate} from "react-router-dom";
import {Button} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {Player} from "@lottiefiles/react-lottie-player";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBan} from '@fortawesome/free-solid-svg-icons'
import {onValue, ref} from 'firebase/database'
import {dbRealTime} from "./Firebase.tsx";

const Listen = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.removeItem('token');
        navigate('/', {replace: true});

    }
    useEffect(() => {
            if (!localStorage.getItem("token")) {
                navigate('/', {replace: true})
            }

        },
        []
    )
    const [isListening, setIsListening] = useState(1)

    const pythonRef = ref(dbRealTime, 'python')
    onValue(pythonRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
    })
    const espRef = ref(dbRealTime, 'esp32')
    onValue(espRef, (snapshot) => {
        const data = snapshot.val();
        console.log(data)
    })


    function play(message: string) {
        new Audio(message).play()
    }

    return (
        <div
            style={{
                width: window.innerWidth,
                height: window.innerHeight,
                backgroundColor: isListening ? "red" : "green",
            }}>
            <div style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: window.innerWidth,

            }}>
                <Button style={{
                    width: '80px',
                    alignSelf: 'end',
                    margin: '10px 10px 0 0',
                    fontSize: "12px"
                }} onClick={handleClick}>Déconnexion</Button>
                {isListening ? <h1
                    style={{
                        paddingTop: "10%",
                        paddingBottom: "10%",
                        fontSize: "50px"

                    }}>Pas de consigne</h1> : <h1
                    style={{
                        paddingTop: "10%",
                        paddingBottom: "10%",
                        fontSize: "50px"

                    }}>En écoute</h1>}


            </div>
            {isListening ? (
                <FontAwesomeIcon style={{alignSelf: 'center', paddingTop: "20%"}} size="10x" icon={faBan}/>) : (
                <Player autoplay loop src="https://lottie.host/e4735555-e559-4890-a9ec-f306da688198/9bUdUvVfh6.json">

                </Player>)}


        </div>
    );
}

export default Listen;