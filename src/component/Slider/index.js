import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Slider from "react-slick";

export default class SliderBar extends Component {

    constructor(props) {
        super(props);
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
                {this.props.recom.map(function (data, index) {
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