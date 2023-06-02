import "./App.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { useGlobalState } from "./components/GlobalState";
import Login from "./components/Login";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
    brand: {
        900: "#1a365d",
        800: "#153e75",
        700: "#2a69ac",
    },
};
const theme = extendTheme({ colors });

function App() {
    const [globalState, setGlobalState] = useGlobalState(
        <Login />,
    );

    return (
        <ChakraProvider theme={theme}>
            {globalState}
        </ChakraProvider>
    );
}

export default App;
