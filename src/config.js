import Config from 'react-native-config';


function configConstruct({ config }) {
    const myConfig = {
        ...(config || {})
    };

    return myConfig;
}

const appConfig = configConstruct({ config: Config });


export default appConfig;
