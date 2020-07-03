import React, { Component, Fragment } from "react";
import Button from "../elements/Button";
import TextInput from "../elements/TextInput";


//should be serverside
const locationData = [
    { name: "Auckland Foundation", address: "Level 26, PwC Tower 188 Quay Street, Auckland CBD 1010" },
    { name: "Auckland City Mission", address: "23 Union Street, Auckland CBD, Auckland 1010, New Zealand" },
    { name: "Salvation Army Family Store", address: "200 Dominion Road, Mount Eden, Auckland 1024, New Zealand" }
];

export default class Step4 extends Component {
    constructor() {
        super();
        this.state = {
            locations: []
        }
    }

    componentDidMount() {
        //load locations
        this.setState({ locations: locationData });
    }

    locationLabel = (name, address) => {
        return (
            <Fragment>
                <p>{name}</p>
                <p>{address}</p>
            </Fragment>
        )
    }

    renderHasLocations = () => {
        return (
            <Fragment>
                <h1>Excellent! Based on the items you listed and current location. Here are places that are accepting your types of donations</h1>
                <br />

                {this.state.locations.map((location) => {
                    return <Button
                        key={location.name}    
                        selected={this.props.donationLocation.name === location.name}
                        label={this.locationLabel(location.name, location.address)}
                        handleClick={() => {
                            this.props.handleChange("donationLocation", location)
                            this.props.handleChange("donationMethod", 'direct')
                        }}
                    />
                })
                }

                <Button
                    selected={false}
                    label="Clear Locations"
                    handleClick={() => this.setState({ locations: [] })}
                />
            </Fragment>
        );
    }

    renderNoLocations = () => {
        return (
            <Fragment>
                <h1>Unfortunately, there are no donating locations to accept your type of items.</h1>
                <br />
                <h1>However! You can still choose to offer:</h1>
                <br />
                <Button
                    selected={this.props.donationMethod === 'pickup'}
                    label="A pick up location for your items"
                    handleClick={() => this.props.handleChange("donationMethod", 'pickup')}
                />

                {this.renderPickUpLocation()}

                <Button
                    selected={this.props.donationMethod === 'dropoff'}
                    label="contactlessDropOff"
                    handleClick={() => this.props.handleChange("donationMethod", 'dropoff')}
                />
            </Fragment>
        );
    }

    renderPickUpLocation = () => {
        if (this.props.donationMethod !== 'pickup') {
            return null;
        }
        
        return (
            <Fragment>
                <TextInput
                    name="pickupLocation"
                    label="Great! Please type in your preferred pick up location."
                    placeholder="Type in here for your preferred pick up location for your items"
                    value={this.props.pickupLocation}
                    handleChange={this.props.handleChange}
                />
            </Fragment>
        );
    }

    render() {
        if (this.props.currentStep !== 4) {
            return null;
        }

        return (
            this.state.locations.length > 0
                ? this.renderHasLocations()
                : this.renderNoLocations()
        );
    }
}