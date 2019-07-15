/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { actionSetSession, actionLogout } from '../../store/ACTIONS';
import { connect } from 'react-redux';
import { authentication } from '../../store/Services/Firebase';
import { authenticatedRoutes } from './authenticatedRoutes';

class Selection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: 'VRTourism',
        };
      }

    componentDidMount() {
        this.props.authenticationUser();
        // this._authUser();
    }

    // _authUser() {
    //     if (this.props.user =! null) {
    //         console.log(this.props.user);
    //         this.props.navigation.navigate('Auth');
    //     }
    //     else {
    //         console.log(this.props.user);
    //         this.props.navigation.navigate('App');
    //     }
    //     // this.props.navigation.navigate(this.props.user ? 'Auth' : 'App');
    // }

    // authUser = () => {
    //     this.props.navigation.navigate(this.props.user ? 'App' : 'Auth');
    // }

    render() {
        
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' />
                {/* {this.props.user? <Text>Iniciado</Text> : <Text>No ha iniciado</Text>} */}
                {/* {this.props.navigation.navigate(this.props.user? 'Auth' : 'Interest')} */}
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
});


const mapStateToProps = state => ({
    user: state.reducerSesion,
  });
  
const mapDispatchToProps = dispatch => ({
    authenticationUser: () => {
        authentication.onAuthStateChanged((user) => {
        if (user) {
            console.log(user.toJSON());
            dispatch(actionSetSession(user));
            // dispatch( console.log(NavigationActions.navigate({ routeName: 'App'})));
                // NavigationActions.navigate({routeName: 'App' }));
        } else {
            console.log('No existe sesión');
            dispatch(actionLogout());
        }
        });
    },
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Selection);