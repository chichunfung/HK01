import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import StarRatings from 'react-star-ratings';


export default class Item extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid item container xs={12} sm={6} md={4} lg={3} className="item" key={this.props.id} >
                <Grid item xs={1} className="no">{this.props.index}</Grid>
                <Grid item xs={3} className="image"><img src={this.props.image} alt={this.props.name} /></Grid>
                <Grid item xs={8} className="detail">
                    <Grid item xs={12} className="name" >{this.props.name}</Grid>
                    <Grid item xs={12} className="type" >{this.props.category}</Grid>
                    <Grid item xs={12} className="rating"><StarRatings rating={this.props.rating} starDimension="15" starSpacing="5" starRatedColor="rgb(239, 150, 56)" numberOfStars={5} />({this.props.count})</Grid>
                </Grid>
            </Grid>
        );
    }
}