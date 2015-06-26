
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
var Button = require('react-native-button');
var React = require('react-native');

var players = [
      {
        type: "button",
        name: "+"
      }
];

var {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  ListView,
  TouchableHighlight,
  TextInput,
  View,
} = React;

var AwesomeProject = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
    });
    return {
      dataSource: ds.cloneWithRows(players),
      loaded: true
    };
  },

  _addPlayer: function(event) {
    players.splice(players.length-1, 0, {
      type: "data",
      name: this.state.newPlayerName,
      score: 0
    });
    this._updateDataSource(players);
  },
  render: function() {
    if (!this.state.loaded) {
      return this.renderLoadingView();
    }
    return (
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderScore}
          style={styles.listView}
        />
      </View>
    );
  },
  _editPlayerName: function(text) {
    this.setState({
      newPlayerName: text
    })
  },
  _editScore: function(text) {
    this.setState({
      newScore: parseInt(text)
    })
  },
  _updateDataSource(dataList) {
    var ds = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.setState({
      dataSource: ds.cloneWithRows(dataList)
    })
  },
  _addScore: function(index) {
    players[index].score += this.state.newScore;
    this._updateDataSource(players);
  },
  renderScore: function(rowData, sectionID, rowID, highlightRow) {
    if (rowData.type === "data") {
      return (
        <View style={styles.containerCell}>
          <Text>{rowData.name} score: </Text>
          <Text>{rowData.score}</Text>
          <Button onPress={this._addScore.bind(this, rowID)}>+</Button>
          <TextInput style={styles.textInput} onChangeText={this._editScore}></TextInput>
        </View>
      )
    }
    if (rowData.type === "button") {
      return (
        <View style={styles.container}>
          <TextInput style={styles.textInput} onChangeText={this._editPlayerName}></TextInput>
          <Button onPress={this._addPlayer}>+</Button>
        </View>
      )
    }
  },
});

var styles = StyleSheet.create({
  textInput: {
    height: 20,
    width: 40,
    borderColor: 'gray',
    borderWidth: 1
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerCell: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    height: 40,
  },
  rightContainer: {
    flex: 1,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
