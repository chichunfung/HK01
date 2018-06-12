import React, { Component } from "react";
import Grid from '@material-ui/core/Grid';
import Item from "../Item";

export default class List extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Grid>
            {this.props.data.map(function (data, index) {
                return (
                    <Item id={data.id} index={++index} image={data.image}  name={data.name} category={data.category} rating={data.rating} count={data.count}  ></Item>
                );
            })}
            </Grid>
        );
    }
}