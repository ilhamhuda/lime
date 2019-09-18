import React, { Component } from 'react';
import {
  CheckBox,
  Text,
  ScrollView,
  View,
  StyleSheet,
  Alert,
  TextInput,
  ListView,
} from 'react-native';
import { Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from 'react-navigation';
class LogoTitle extends React.Component {
  render() {
    return (
         <Text  size={30} style={{paddingLeft:20}}> Lime </Text>
    );
  }
}

class Login extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    
    this.state = {
      username: 'ilhamhuda',
      password: 'hudailham',
    };
  }
  
  onLogin() {
    const { username, password } = this.state;

    Alert.alert('Lime', 'Selamat Datang '+ `${username}`);
    this.props.navigation.navigate('App')

    return <App />;

  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          value={this.state.username}
          onChangeText={(username) => this.setState({ username })}
          placeholder={'Username'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Password'}
          secureTextEntry={true}
          style={styles.input}
        />
        
        <Button
          title={'Login'}
          style={{ width: 300}}
          onPress={this.onLogin.bind(this)}     
        />
      </View>
    );
  }
}



class App extends Component {
   static navigationOptions = {
    
    headerLeft: <LogoTitle />,
    headerRight: (
<Icon onPress={()=>this.props.navigation.navigate('Login')} name="align-justify" size={20} color="black"  style={{paddingRight:20}}/>
    )
  };
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });
    this.state = {
      inputValue: '',
      checked: false,
      dataSource: ds.cloneWithRows([]),
    };
    this._handleTextChange = this._handleTextChange.bind(this);
    this._handleDeleteButtonPress = this._handleDeleteButtonPress.bind(this);
  }
  _handleTextChange = value => {
    const inputValue = value;
    this.setState(() => ({
      inputValue,
    }));
  };
  _handleSendButtonPress = () => {
    if (!this.state.inputValue) {
      return;
    }
    const textArray = this.state.dataSource._dataBlob.s1;
    textArray.push(this.state.inputValue);
    this.setState(() => ({
      dataSource: this.state.dataSource.cloneWithRows(textArray),
      inputValue: '',
    }));
  };
  _handleDeleteButtonPress = id => {
    this.setState(a => {
      const newItem = a.dataSource._dataBlob.s1.filter(
        (item, i) => parseInt(id) !== i
      );
      return {
        dataSource: this.state.dataSource.cloneWithRows(newItem),
      };
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={(rowData, sectionID, rowID) => {
              const handleDelete = () => {
                return this._handleDeleteButtonPress(rowID);
              };
              return (
                <View style={styles.todoItem}>
                  <CheckBox
                    center
                    value={this.state.checked}
                    onValueChange={() =>
                      this.setState({ checked: !this.state.checked })
                    }
                  />
                  <Text style={styles.todoText}>{rowData}</Text>
                  <Button
                    right
                    type="transparant"
                    title="X"
                    onPress={handleDelete}
                  />
                </View>
              );
            }}
          />
          <View style={styles.formView}>
            <TextInput
              style={styles.inputForm}
              value={this.state.inputValue}
              onChangeText={this._handleTextChange}
              placeholder="+ List Item"
              onSubmitEditing={this._handleSendButtonPress}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 70,
    backgroundColor: 'white',
  },
  formView: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 8,
    flex: 1,
    flexDirection: 'column',
  },
  inputForm: {
    backgroundColor: '#fff',
    width: 320,
    height: 40,
    padding: 8,
    marginBottom: 8,
  },
  todoItem: {
    alignItems: 'center',
    padding: 8,
    width: 320,
    borderBottomWidth: 1.5,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
  },
  scrollView: {
    backgroundColor: 'white',
    marginHorizontal: 20,
  },
    input: {
    width: 300,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
    marginBottom: 10,
  },
  todoText: {
    flex: 1,
  },
});

const HomeStack = createStackNavigator(
  {
    Login: { screen: Login },
    App: { screen: App }
  },
  {
    initialRouteName: 'Login',
  }
);

export default HomeStack;
