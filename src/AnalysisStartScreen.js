import React from 'react';
import { View, KeyboardAvoidingView, Text, StyleSheet } from 'react-native';
import { ButtonGroup, Input, Button } from 'react-native-elements';

import styles from './styles.js';

export default class AnalysisStartScreen extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
    this.updateIndex = this.updateIndex.bind(this);
  }

  updateIndex (selectedIndex) {
    this.setState({selectedIndex});
  }

  render () {
    const buttons = ['Existing patient', 'New patient'];
    const { selectedIndex } = this.state;

    let content;

    if (selectedIndex === 0) {
      content = (
        <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
          <Text style={stylesNPS.textTitle}>Create new patient profile</Text>
          <Input
            containerStyle={styles.input}
            onChangeText={text => this.setState({ name: text })}
            placeholder='name'
          />
          <Input
            containerStyle={styles.input}
            onChangeText={text => this.setState({ email: text })}
            placeholder='email'
          />
          <Button
            style={styles.button}
            title='Create patient profile'
            onPress={this.signIn}
          /> 
        </KeyboardAvoidingView>
      );
    } else {
      content = (
        <KeyboardAvoidingView style={styles.container} behavior='padding' enabled>
          <Text style={stylesNPS.textTitle}>Create new patient profile</Text>
          <Input
            containerStyle={styles.input}
            onChangeText={text => this.setState({ name: text })}
            placeholder='patient id or email'
          />
          <Text>or</Text>
          <Input
            containerStyle={styles.input}
            onChangeText={text => this.setState({ email: text })}
            placeholder='email'
            secureTextEntry={true}
          />
          <Button
            style={styles.button}
            title='Confirm this patient profile'
            onPress={this.signIn}
          /> 
        </KeyboardAvoidingView>
      );
    }

    return (
      <View style={styles.container}>
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
        />
        { content }
      </View>
    );
  }

};


const stylesNPS = StyleSheet.create({

});

