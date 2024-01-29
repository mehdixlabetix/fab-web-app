import {SubmitHandler, useForm} from "react-hook-form"
import {Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Select, useToast} from "@chakra-ui/react";
import {useState} from "react";
import bcrypt from 'bcryptjs'
import {db} from "./Firebase.tsx";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {useNavigate} from "react-router-dom";
import Header from "./Header.tsx";

enum GenderEnum {
    female = "female",
    male = "male",
    other = "other",
}

interface IFormInput {
    firstName: string
    lastName: string
    username: string
    password: string
    gender: GenderEnum
}

export default function Register() {
    const toast = useToast()
    const {register, handleSubmit} = useForm<IFormInput>()
    const [show, setShow] = useState(false)
    const salt = bcrypt.genSaltSync(10);
    const navigate = useNavigate();
    const addUser = async (data: IFormInput) => {
        await setDoc(doc(db, "users", data.username), data)
        navigate('/');
    }
    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        data.password = bcrypt.hashSync(data.password, salt);
        const finalData = {salt, ...data}
        const existingUser = await getDoc(doc(db, "users", finalData.username))
        if (existingUser.exists()) {
            toast({
                title: "Nom d'utilisateur déjà utilisé",
                description: "Prière de choisir un autre nom d'utilisateur",
                status: "error",
                duration: 6000,
                isClosable: true,
            })
        } else {
            await addUser(finalData)
        }
    }

    const handleClick = () => setShow(!show)
    return (
        <div>
            <Header/>
            <form style={{marginTop: '50%'}} onSubmit={handleSubmit(onSubmit)}>
                <FormControl>
                    <FormLabel>Prénom</FormLabel>
                    <Input {...register("firstName")} />
                </FormControl>
                <FormControl>
                    <FormLabel>Nom</FormLabel>
                    <Input {...register("lastName")} />
                </FormControl>
                <FormControl>
                    <FormLabel>Nom d'utilisateur</FormLabel>
                    <Input {...register("username")} />
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
                            <Button h='1.7rem'  size='sm' onClick={handleClick}>
                                {show ? 'Cacher' : 'Montrer'}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Genre</FormLabel>
                    <Select {...register("gender")}>
                        <option value="female">femelle</option>
                        <option value="male">male</option>
                        <option value="other">Autre</option>
                    </Select>
                </FormControl>

                <Button marginTop="20px" type="submit" colorScheme='green'>Créer votre compte</Button>
            </form>
        </div>)
}