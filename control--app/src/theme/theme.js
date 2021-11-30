import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette : {
        primary : {
            light : "#63a4fff",
            main : "#009900", //botones verde
            dark : "#1e88e5",
            contrastText : "#ecfad8" //letra botones
        }
    },
});

export default theme;