import React, { Component } from 'react';
import './App.css';

import StarRatings from 'react-star-ratings';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';

import Slider from "react-slick";



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      full_list: [],
      list: [],
      recom: [],
      item: 0,
      showLoading:false
    };
  }

  renderUI() {
    let no = this.state.item
    var count = 0;
    this.state.full_list.slice(no, no + 10).map((data) => {
      fetch('https://itunes.apple.com/hk/lookup?id=' + data.id).then(results => {
        return results.json();
      }).then(results => {
        let items = {
          "id": data.id,
          "name": data.name,
          "image": data.image,
          "category": data.category,
          "rating": results.results[0].averageUserRatingForCurrentVersion,
          "count": results.results[0].userRatingCountForCurrentVersion,
        }
        count++
        //console.log(count)
        var temp_list = this.state.list
        temp_list.push(items)
        if(count == 10){
          this.setState({ list: temp_list })
          this.setState({ item: no + 10 })
          document.addEventListener('scroll', this.trackScrolling);
          console.log(no)
          if(no+10 == 100){
            this.setState({showLoading:false})
          }else{
            this.setState({showLoading:true})
          }
        }
      })
    })
  }

  componentWillMount() {
    fetch('https://itunes.apple.com/hk/rss/topgrossingapplications/limit=10/json').then(results => {
      return results.json();
    }).then(data => {
      //this.setState({recom:data.feed.entry})
      let items = data.feed.entry.map((data, index) => {
        return (
          {
            "id": data.id.attributes["im:id"],
            "name": data["im:name"].label,
            "image": data["im:image"][1].label,
            "category": data.category.attributes.label,
          }
        )
      })
      this.setState({ recom: items });
    })

    fetch('https://itunes.apple.com/hk/rss/topfreeapplications/limit=100/json').then(results => {
      return results.json();
    }).then(data => {
      let items = data.feed.entry.map((data, index) => {
        return ({
          "id": data.id.attributes["im:id"],
          "name": data["im:name"].label,
          "image": data["im:image"][1].label,
          "category": data.category.attributes.label,
        })
      })
      this.setState({ full_list: items })
      this.renderUI()
    })
  }

  isBottom(el) {
    return el.getBoundingClientRect().bottom <= window.innerHeight;
  }

  trackScrolling = () => {
    const wrappedElement = document.getElementById('view');
    if (this.isBottom(wrappedElement)) {
      document.removeEventListener('scroll', this.trackScrolling);
      this.renderUI()
    }
  };

  componentWillUnmount() {
    document.removeEventListener('scroll', this.trackScrolling);
  }

  handleChange = event => {
    console.log(event.target.value);
    let key = event.target.value;
    if (event.target.value === '') {
      //this.setState({ list: this.state.full_list });
      this.renderUI()
      document.addEventListener('scroll', this.trackScrolling);
    } else {
      document.removeEventListener('scroll', this.trackScrolling);
      let temp = this.state.full_list.filter((e) => {
        return e.name.includes(key);
      })
      console.log(temp);
      this.setState({ list: temp });
    }
  };

  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1
    };

    return (
      <div id="view">
        <AppBar position="fixed" color="default" className="search">
          <Toolbar>
            <FormControl fullWidth={true}>
              <Input id="name-simple" value={this.state.name} onChange={this.handleChange} fullWidth={true} placeholder="Search" />
            </FormControl>
          </Toolbar>
        </AppBar>

        <div className="recom">
          <Slider {...settings}>
            {this.state.recom.map(function (data, index) {
              return (
                <Grid item container xs={12} className="r_item" key={data.id}>
                  <Grid item className="image"><img src={data.image} alt={data.name} /></Grid>
                  <Grid item xs={12} className="name" >{data.name}</Grid>
                  <Grid item xs={12} className="type" >{data.category}</Grid>
                </Grid>
              );
            })}
          </Slider>
        </div>

        <div className="list">
          <Grid container>
            {this.state.list.map(function (data, index) {
              return (
                <Grid item container xs={12} sm={6} md={4} lg={3} className="item" key={data.id} >
                  <Grid item xs={1} className="no">{++index}</Grid>
                  <Grid item xs={3} className="image"><img src={data.image} alt={data.name} /></Grid>
                  <Grid item xs={8} className="detail">
                    <Grid item xs={12} className="name" >{data.name}</Grid>
                    <Grid item xs={12} className="type" >{data.category}</Grid>
                    <Grid item xs={12} className="rating"><StarRatings rating={data.rating} starDimension="15" starSpacing="5" starRatedColor="rgb(239, 150, 56)" numberOfStars={5} />({data.count})</Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </div>
        
        { this.state.showLoading? 
          (<Grid item xs={12} className="loading"><img src="/loading.gif" width="30%" alt="loading..." /></Grid>) : ("")
        }

      </div>
    );
  }
}

export default App;
