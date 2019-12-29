import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  ScrollView,
  Picker,
  Text,
  Platform,
  AsyncStorage
} from 'react-native';
import axios from 'axios';
import InputField from './common/InputField';
import Button from './common/Button';
import validateInput from './validation/Register';
import {HOST} from '../Constant';
import Geocoder from 'react-native-geocoding';


class Register extends Component {
	static navigationOptions = {
		title: 'Registration'
	}
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	email: '',
	  	password: '',
	  	mobile: '',
	  	username: '',
	  	name: '',
	  	type: '',
	  	errors: '',
      errmsg:'',
      sex:'',
      };
	  this.changeEmail = this.changeEmail.bind(this);
	  this.changePassword = this.changePassword.bind(this);
	  this.changeMobile = this.changeMobile.bind(this);
	  this.changeName = this.changeName.bind(this);
	  this.changeUsername = this.changeUsername.bind(this);
	  this.setSex = this.setSex.bind(this);
		this.nextPage = this.nextPage.bind(this);
	}
	
	componentDidMount = () => {
		console.log('did');
        AsyncStorage.getItem('type').then(function(data){
          this.setState({
                type: data
              });
        }.bind(this));
		//this.getMakes();
		
	}
			
	isValid = () => {
		console.log(this.state);
		const {errors,isValid} = validateInput(this.state);
		if(!isValid){
			this.setState({errors});
		}
		return isValid;
	}
	nextPage = () => {
		console.log('render validation');
		if(this.isValid()) {
			this.setState({errors: {}});
           var url = HOST+'/api/user/register';
//            if(this.state.selectOne == 'driver') {
//               url = HOST+'/drivers';
//            } else {
//               url = HOST+'/owners';
//            }
            console.log(url, this.state);
          if(this.state.type === 'Driver'){
            this.props.navigation.navigate('NextDetailDriver',{prsnlData: this.state});
          } else {
            this.props.navigation.navigate('NextDetailOwner',{prsnlData: this.state});  
          }
          
          
//			axios.post(url, this.state)
//				.then(function(user){
//					//console.log(user.data.code);
//                  if(user.data.code === 11000) {
//                    this.setState({errmsg: 'Username is duplicate'});
//                  } else {
//                    AsyncStorage.setItem('token', 'asdfghjklasdfghjkl');
//                    this.props.navigation.navigate('Dashboard');
//                  }
//					
//				}.bind(this));
				
		}
	}
    
    setSex = (v, i) => {
      this.setState({
        sex: v
      });
    }
	changeEmail = (value) => {
		this.setState({
			email: value
		});
	}
	changePassword = (value) => {
		this.setState({
			password: value
		});
	}
	changeMobile = (value) => {
		this.setState({
			mobile: value
		});
	}
	changeName = (value) => {
		this.setState({
			name: value
		});
	}
    changeUsername = (value) => {
		this.setState({
			username: value
		});
	}
	
  render() {
  	const {errors} = this.state;
    return (
      <ScrollView>
      
      <View style={styles.selectBox}>
            
	      	<View style={{width: 180, padding: 15}}>
	      	  <Text>I am {this.state.type}</Text>
	      	</View>
	      	
		</View>
		
      <InputField 
      		placeholder="Name"
      		onChangeFunc={this.changeName}
      		value={this.state.name}
      		keyboard="default"
      	/>
      	<Text style={{color: 'red',marginLeft: 25}}>{errors.name}</Text>
      <InputField 
      		placeholder="Email"
      		onChangeFunc={this.changeEmail}
      		value={this.state.email}
      		keyboard="email-address"
      	/>
      	<Text style={{color: 'red',marginLeft: 25}}>{errors.email}</Text>
      	<InputField 
      		placeholder="Username"
      		onChangeFunc={this.changeUsername}
      		value={this.state.username}
      		keyboard="default"
      	/>
      	<Text style={{color: 'red',marginLeft: 25}}>{errors.username}</Text>
      	<View style={styles.selectBox}>
            
	      	<View style={{width: 80, padding: 15}}>
	      	  <Text>Gender</Text>
	      	</View>
	      	<View style={{width: 250}}>
              <Picker
                 selectedValue={this.state.sex}
                 onValueChange={(itemValue, itemIndex) => this.setSex(itemValue, itemIndex)}
              >
              <Picker.Item value="" label="Select" />
              <Picker.Item value="male" label="Male" />
              <Picker.Item value="female" label="Female" />
							<Picker.Item value="others" label="Others" />
							<Picker.Item value="donot" label="Do not disclose" />
              </Picker>
			</View>
		</View>
		<Text style={{color: 'red',marginLeft: 25}}>{errors.sex}</Text>
      	
      	<InputField 
      		placeholder="Password"
      		onChangeFunc={this.changePassword}
      		value={this.state.password}
      		keyboard="default"
      		secureTextEntry={true}
      	/>
      	<Text style={{color: 'red',marginLeft: 25}}>{errors.password}</Text>
      	<InputField 
      		placeholder="Mobile"
      		onChangeFunc={this.changeMobile}
      		value={this.state.mobile}
      		keyboard="numeric"
      	/>
      	<Text style={{color: 'red',marginLeft: 25}}>{errors.mobile}</Text>
      	<Text style={{color: 'red',marginLeft: 25}}>{this.state.errmsg}</Text>
      	<View style={{margin: 10}}><Button onPress={this.nextPage}>Next</Button></View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
	selectBox: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		//alignItems: 'flex-start',
		marginRight: 15, 
		marginLeft: 15,
		
	}
});


export default Register;
