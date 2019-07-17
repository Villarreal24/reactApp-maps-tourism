/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { actionSetSession, actionLogout } from '../../store/ACTIONS';
import { connect } from 'react-redux';
import { authentication } from '../../store/Services/Firebase';

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

    componentDidUpdate() {
        this.updateRoute();
    }

    updateRoute = () => {
        const { navigation, isLoggedIn } = this.props;
        console.log(isLoggedIn);
        if (isLoggedIn === true) {
            navigation.navigate('App');
        }  else  {
            navigation.navigate('Auth');
        }
    }

    render() {
        
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

const mapStateToProps = (state) => ({
    isLoggedIn: state.reducerSession,
  });

const mapDispatchToProps = dispatch => ({
    authenticationUser: () => {
        authentication.onAuthStateChanged((user) => {
        if (user) {
            dispatch(actionSetSession(user));
            console.log(user.toJSON());
        } else {
            console.log('No existe sesión');
            dispatch(actionLogout());
        }
        });
    },
});
  
export default connect(mapStateToProps, mapDispatchToProps)(Selection);
