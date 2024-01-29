import './App.css'
import {Route, Routes} from "react-router-dom";
import Login from "./components/Login.tsx";
import {ChakraProvider} from "@chakra-ui/react";
import Register from "./components/Register.tsx";
import {lazy, Suspense} from "react";


function App() {
    const LazyListen = lazy(() => import("./components/Listen.tsx"))

    return (
        <ChakraProvider>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/listen" element={<Suspense fallback={<div>waiting for load</div>}>
                    <LazyListen/>
                </Suspense>}/>
                <Route path="/register" element={<Register/>}/>
            </Routes>
        </ChakraProvider>
    )
}

export default App
