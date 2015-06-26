
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
  mixins: [React.addons.LinkedStateMixin],
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
    return (
      <View style={[styles.containerColumn, styles.app]}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderScore}
          style={styles.listView}>
        </ListView>
        <View style={styles.controls}>
          <Button style={styles.button} onPress={this._sortPlayers}>Sort</Button>
          <Button style={styles.button} onPress={this._clearScore}>Clear Score</Button>
          <Button style={styles.button} onPress={this._clearPlayers}>Restart</Button>
        </View>
      </View>
    );
  },
  _clearScore: function() {
    for (var i = 0; i < players.length; i++) {
      if (players[i].type === "data") {
        players[i].score = 0;
      }
    };
    this._updateDataSource(players);
  },
  _clearPlayers: function() {
    return;
  },
  _sortPlayers: function() {
    players.sort(function(a, b) {
      if (a.type === "button") {
        return 1;
      }
      if (b.type === "button") {
        return -1;
      }
      return b.score - a.score;
    });
    this._updateDataSource(players);
  },
  _editPlayerName: function(text) {
    this.setState({
      newPlayerName: text
    })
  },
  _editScore: function(rowID, text) {
    rowID = parseInt(rowID);
    players[rowID].newScore = parseInt(text);
    this._updateDataSource(players);
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
    index = parseInt(index)
    players[index].score += players[index].newScore;
    this._updateDataSource(players);
  },
  renderScore: function(rowData, sectionID, rowID, highlightRow) {
    if (rowData.type === "data") {
      return (
        <View style={styles.containerCell}>
          <Text>{rowData.name} score: </Text>
          <Text>{rowData.score}</Text>
          <Button onPress={this._addScore.bind(this, rowID)}>+</Button>
          <TextInput style={styles.textInput} onChangeText={this._editScore.bind(this, rowID) valueLink={this.linkState('message'}></TextInput>
        </View>
      )
    }
    if (rowData.type === "button") {
      return (
        <View style={styles.containerRow}>
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
  app: {
    backgroundColor: "#F5FCFF",
  },
  listView: {
    flex: 9,
    paddingTop: 40,
    backgroundColor: '#F5FCFF',
  },
  containerColumn: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  controls: {
    flex: 1,
  },
  containerRow: {
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
