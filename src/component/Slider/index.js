import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Slider from "react-slick";

export default class SliderBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            recom: [],
        };
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
    }

    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1
        };

        return (
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
        );
    }
}