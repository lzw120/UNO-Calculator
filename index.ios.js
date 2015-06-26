
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
    return (
      <View style={[styles.containerColumn, styles.app]}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderScore}
          style={styles.listView}>
        </ListView>
        <View style={styles.controls}>
          <Button style={styles.controls} onPress={this._sortPlayers}>Sort</Button>
          <Button style={styles.controls} onPress={this._clearScore}>Clear Score</Button>
          <Button style={styles.controls} onPress={this._clearPlayers}>Restart</Button>
        </View>
      </View>
    );
  },
  _clearScore: function() {
    for (var i = 0; i < players.length; i++) {
      if (players[i].type === "data") {
        players[i].score = 0;
        players[i].newScore = 0;
        players[i].newScoreInput.setNativeProps({text: 0});
      }
    };
    this._updateDataSource(players);
  },
  _clearPlayers: function() {
    players = [
      {
        type: "button",
        name: "Add"
      },
    ];
    this._updateDataSource(players);
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
    for (var i = 0; i < players.length; i++) {
      if (players[i].type === "data") {
        players[i].newScoreInput.setNativeProps({text: 0})
      }
    };
    this._updateDataSource(players);
  },
  _editPlayerName: function(text) {
    this.setState({
      newPlayerName: text
    })
  },
  _editScore: function(rowID, score) {
    rowID = parseInt(rowID);
    players[rowID].newScore = parseInt(score);
    this._updateDataSource(players);
  },
  _updateDataSource: function(dataList) {
    var ds = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
    });
    this.setState({
      dataSource: ds.cloneWithRows(dataList)
    })
  },
  _addScore: function(index) {
    index = parseInt(index)
    players[index].score += parseInt(players[index].newScore);
    this._updateDataSource(players);
  },
  _bindTextInput: function(index, component) {
    index = parseInt(index);
    if ((index < players.length-1) && (players[index].type === "data")) {
      players[index].newScoreInput = component;
    }
  },
  renderScore: function(rowData, sectionID, rowID, highlightRow) {
    if (rowData.type === "data") {
      return (
        <View style={styles.containerCell}>
          <Text style={styles.controls}>{rowData.name} score: {rowData.score}</Text>
          <TextInput
            style={[styles.textInput, styles.controls, styles.editScore]}
            onChangeText={this._editScore.bind(this, rowID)}
            ref={this._bindTextInput.bind(this, rowID)}
            value="0">
          </TextInput>
          <Button style={styles.controls} onPress={this._addScore.bind(this, rowID)}>Add Score</Button>
        </View>
      )
    }
    if (rowData.type === "button") {
      return (
        <View style={styles.containerRow}>
          <TextInput style={[styles.textInput, styles.controls]} onChangeText={this._editPlayerName}></TextInput>
          <Button style={styles.controls} onPress={this._addPlayer}>Add Player</Button>
        </View>
      )
    }
  },
});

var styles = StyleSheet.create({
  textInput: {
    paddingLeft: 10,
    height: 44,
    width: 80,
    borderColor: 'gray',
    borderWidth: 1
  },
  app: {
    backgroundColor: "#F5FCFF",
  },
  listView: {
    flex: 4,
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
    fontSize: 16,
  },
  editScore: {
    marginTop: 7
  },
  containerRow: {
    marginLeft: 40,
    marginTop: 20,
    width: 300,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  containerCell: {
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    height: 60,
  },
  rightContainer: {
    flex: 1,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
