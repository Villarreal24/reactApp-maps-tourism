/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { actionSetSession, actionLogout } from '../../store/ACTIONS';
import { connect } from 'react-redux';
import { authentication } from '../../store/Services/Firebase';
import { NavigationActions } from 'react-navigation';

class Selection extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nombre: 'VRTourism',
        };
      }

    componentDidMount() {
        this.props.authenticationUser();
    }

    navAction = () => NavigationActions.navigate({ routeName: 'App' });

    render() {
        const { navigation } = this.props;
        const state = this.props.user? navigation.navigate('App') : navigation.navigate('Auth');
        return (
            <View style={styles.container}>
                <ActivityIndicator size='large' />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
});

const mapStateToProps = state => ({
    user: state.reducerSesion,
  });
  
const mapDispatchToProps = dispatch => ({
    authenticationUser: () => {
        authentication.onAuthStateChanged((user) => {
        if (user) {
            this.navAction();
            console.log(user.toJSON());
            dispatch(actionSetSession(user));
        } else {
            console.log('No existe sesión');
            dispatch(actionLogout());
        }
        });
    },
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Selection);
