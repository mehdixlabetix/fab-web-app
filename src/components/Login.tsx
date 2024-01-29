import {SubmitHandler, useForm} from "react-hook-form"
import {Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, useToast} from "@chakra-ui/react";
import {useState} from "react";
import bcrypt from 'bcryptjs'
import {doc, getDoc} from "firebase/firestore";
import {db} from "./Firebase.tsx";
import {useNavigate} from "react-router-dom";
import Header from "./Header.tsx";

interface IFormInput {

    username: string
    password: string

}

export default function Login() {
    const navigate = useNavigate();
    const toast = useToast();
    const {register, handleSubmit} = useForm<IFormInput>()
    const [show, setShow] = useState(false)
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        const user = await getDoc(doc(db, "users", data.username))
        if (!user.exists()) {
            toast({
                title: "Utilisateur inexistant",
                description: "Veuillez créer un compte",
                status: "error",
                duration: 6000,
                isClosable: true,
            });
            throw new Error("User does not exist");
        } else {
            const hash = bcrypt.hashSync(data.password, user.data().salt)
            if (hash !== user.data().password) {
                toast({
                    title: "Mot de passe erroné",
                    description: "Please try again",
                    status: "error",
                    duration: 6000,
                    isClosable: true,
                });
                throw new Error("Wrong password");
            } else {
                toast({
                    title: "Connexion réussie",
                    description: "Bienvenue",
                    status: "success",
                    duration: 6000,
                    isClosable: true,
                });
                localStorage.setItem('token', user.data().username);
                navigate('/listen', {replace: true});
            }
        }
    }

    const handleClick = () => setShow(!show)
    const handleClick2 = () => navigate('/register')
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            justifyItems: 'center'
        }}>
            <Header/>

            <form style={{
                marginTop: '70%'
            }} onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <FormLabel>Nom d'utilisateur</FormLabel>
                    <Input
                        placeholder="Entrer Nom d'utilisateur"
                        {...register("username")} />
                </FormControl>
                <FormControl>
                    <FormLabel>Mot de passe</FormLabel>
                    <InputGroup size='md'>
                        <Input
                            {...register("password")}
                            pr='4.5rem'
                            type={show ? 'text' : 'password'}
                            placeholder='Enterer Mot de passe'
                        />
                        <InputRightElement width='4rem' marginRight="5px">
                            <Button h='1.75rem' size='sm' onClick={handleClick}>
                                {show ? 'Cacher' : 'Montrer'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>

                <Button marginTop="30px" marginBottom="30px" type="submit" colorScheme='green'>Connexion</Button>

            </form>
            <a onClick={handleClick2}>Créer un compte</a>
        </div>)
}