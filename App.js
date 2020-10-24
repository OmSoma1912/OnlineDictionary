import React from 'react';
import {TextInput, TouchableOpacity,StyleSheet, Text, View} from 'react-native';

export default function App() {
  constructor();{
    super();
    this.state = {
      text: '',
    };
  }
  getWord=(word)=>{
    var searchKeyword = word.toLowerCase()
    var url = "https://rupinwhitehatjr.github.io/dictionary/" + searchKeyword
    return fetch(url)
    .then((data)=>{
      if(data.status === 200){
        return data.json()
      }
      else{
        return null
      }
    })
    .then((response)=>{
      var responseObject = response
      if(responseObject){
        var wordData = responseObject.definations[0]
        var definition = wordData.description
        var lexicalCategory = wordData.wordtype
        this.setState({
          "word" : this.state.text,
          "defination" : definition,
          "lexicalCategory" : lexicalCategory
        })
      }
      else{
        this.setState({
          "word" : this.state.text,
          "definition" : "Not Found"
        })
      }
    })
  }
  render();{
  return (
    <View style={styles.container}>
      <TextInput style = {styles.inputBox}
      onChangeText = {text =>{
        this.setState({
          text : text,
          isSearchedPressed : false,
          word : "Loading...",
          lexicalCategory : '',
          examples : [],
          definition : ""
        });
      }}
      value = {this.state.text}/>
      <TouchableOpacity
        style = {styles.searchButton}
        onPress = {()=>{
          this.setState({isSearchedPressed : true});
          this.getWord(this.state.text)
      }}>
        <Text style={styles.buttonText}>Get Info</Text>
      </TouchableOpacity>
    </View>
  );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  searchButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    justifyContent : 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
