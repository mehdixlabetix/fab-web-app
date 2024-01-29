import {Box, Image} from "@chakra-ui/react";

const Header = () => {
    return (<Box
        id="header"
        position="fixed"
        top={0}
        left={0}
        right={0}
        translateY={0}
        transitionProperty="transform"
        transitionDuration=".1s"
        transitionTimingFunction="ease"
    >


        <Image width={window.innerWidth-window.innerWidth/12} src="/header.png"/>


    </Box>)
}

export default Header;