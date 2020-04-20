import React, { Component } from 'react';
import axios from 'axios';


const GEOCODE_ENDPOINT = 'https://maps.googleapis.com/maps/api/geocode/json';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      place: 'tokyo', //ここに好きな場所を指定。
    };
  }
  handleGetLatAndLng() {
    // Google Maps APIが指定した必須パラメータ(この場合はaddress)をparamsに渡す。
    axios
      .get(GEOCODE_ENDPOINT, { params: { address: this.state.place, key: process.env.REACT_APP_API_KEY} })
      .then((results) => {
        // 以下のGoogle API のレスポンスの例を元に欲しいデータを取得
        console.log(results)
        const data = results.data;
        const result = data.results[0];
        const location = result.geometry.location;
        this.setState({
          address: result.formatted_address,
          lat: location.lat,
          lng: location.lng,
        });
      },
      )
      .catch((error) => {
        console.log({error});
      });
  }

  render() {
    return (
      <div className="app">
        <h1 className="app-title">緯度軽度検索</h1>
        <p> 土地名: {this.state.place} </p>
        <p> 経度: {this.state.lat}</p>
        <p> 経度: {this.state.lng}</p>
        <input
          type="button"
          value="経度・緯度を検索"
          onClick={() => this.handleGetLatAndLng()}
        />
      </div>
    );
  }
}

export default App;
