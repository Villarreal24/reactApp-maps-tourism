import { Stitch } from 'mongodb-stitch-react-native-sdk';

export const defaultAppClient = Stitch.initializeDefaultAppClient('tourism-xovop');

//  emailPassClient = StitchAppClient
    // .getProviderClient(UserPasswordAuthProviderClient.factory);

export const factory = {
    authRequestClient: StitchAuthRequestClient,
    requestClient: StitchRequestClient,
    routes: StitchAuthRoutes
}
const UserPasswordAuthProviderClient = () => UserPasswordAuthProviderClientImpl(requestClient, routes);