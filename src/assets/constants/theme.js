import colors from './colors';

export default mode => ({
    Button : {
        containerStyle : {
            width        : '100%',
            height       : 46,
            borderRadius : 5
        },
        buttonStyle : {
            borderRadius : 5,
            width        : '100%',
            height       : 46
        },
        titleStyle : {
            fontSize : 16,
            width    : '100%'
        },
        disabledStyle : {
            backgroundColor : 'transparent',
            borderWidth     : 1,
            borderColor     : '#848484',
            color           : '#848484'
        }
    },
    colors : {
        primary : colors[mode].PRIMARY
    }
});
