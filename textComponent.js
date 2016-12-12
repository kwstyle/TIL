"use strict";

import React, {
    Component,
    PropTypes
} from "react";
import {
    Text,
    Linking
} from "react-native";

import Util from "./../../common/util";
import Common from "./../../../asset/css/CommonStyle";

export default class TextComponent extends Component {

    constructor(props) {
        super(props);
    }

    convertUrl(text) {
        if(text) {
            var urlList = Util.UrlParser.collect(text);
            var convertedText = [];

            urlList.forEach((data, index) => {
                var splitedText = text.split(data);
                if (convertedText.length > 0) {
                    convertedText.splice(urlList.length, 1);
                }
                convertedText.push(splitedText[0]);
                convertedText.push(
                <TextComponent key={index}
                onPress={
                () => {
                    {/*if (data.indexOf("http") >= 0) {*/}
                    {/*Linking.canOpenURL(data).then((supported) => {*/}
                    {/*if (supported) {*/}
                    Linking.openURL(data);
                    {/*}*/}
                    {/*}).catch(() => {*/}

                    {/*})*/}
                    {/*} else {*/}
                    {/*Linking.canOpenURL(`http://${data}`).then((supported) => {*/}
                    {/*if (supported) {*/}
                    {/*Linking.openURL(`http://${data}`);*/}
                    {/*}*/}
                    {/*}).catch(() => {*/}

                    {/*});*/}
                    {/*}*/}
                }
            }
                style={{
                    color:               "blue", textDecorationLine: "underline",
                        textDecorationStyle: "solid",
                        textDecorationColor: "blue"
                }}>{data}</TextComponent>);
                text = (splitedText[1]);
            });
            convertedText.push(text);

            return convertedText;
        } else {
            return text;
        }
    }

    render() {
        // var text = this.props.children
        // var urlList = Util.UrlParser.collect(text);
        // var convertedText = [];
        //
        // urlList.forEach((data, index) => {
        //     var splitedText = text.split(data);
        //     if (convertedText.length > 0) {
        //         convertedText.splice(urlList.length, 1);
        //     }
        //     convertedText.push(splitedText[0]);
        //     convertedText.push(
        //         <TextComponent key={index}
        //                        onPress={
        //                            () => {
        //                                {/*if (data.indexOf("http") >= 0) {*/}
        //                                {/*Linking.canOpenURL(data).then((supported) => {*/}
        //                                {/*if (supported) {*/}
        //                                Linking.openURL(data);
        //                                {/*}*/}
        //                                {/*}).catch(() => {*/}
        //
        //                                {/*})*/}
        //                                {/*} else {*/}
        //                                {/*Linking.canOpenURL(`http://${data}`).then((supported) => {*/}
        //                                {/*if (supported) {*/}
        //                                {/*Linking.openURL(`http://${data}`);*/}
        //                                {/*}*/}
        //                                {/*}).catch(() => {*/}
        //
        //                                {/*});*/}
        //                                {/*}*/}
        //                            }
        //                        }
        //                        style={{
        //                            color:               "blue", textDecorationLine: "underline",
        //                            textDecorationStyle: "solid",
        //                            textDecorationColor: "blue"
        //                        }}>{data}</TextComponent>);
        //     text = (splitedText[1]);
        // });
        // convertedText.push(text);
        var convertedText = "으어어어어" + this.props.children;

        if (!Util.Validate.isNull(this.props.style) && !Util.Validate.isNull(this.props.style.fontWeight) &&
            this.props.style.fontWeight == "bold") {
            return (
                <Text
            numberOfLines={this.props.numberOfLines}
            ellipsizeMode={this.props.ellipsizeMode}
            onPress={this.props.onPress}
            style={[
                {
                    fontFamily: "NotoSansKR-Bold",
                    fontSize:   Common.defaultFontSize,
                    color:      Common.defaultFontColor,
                },
                this.props.style
        ]}>{
                this.props.convertibleUrl
                    ? convertedText
                    : this.props.children
            }</Text>
        );
        } else {
            return (
                <Text
            numberOfLines={this.props.numberOfLines}
            ellipsizeMode={this.props.ellipsizeMode}
            onPress={this.props.onPress}
            style={[
                {
                    fontFamily: "NotoSansKR-Regular",
                    fontSize:   Common.defaultFontSize,
                    color:      Common.defaultFontColor,
                },
                this.props.style
        ]}>{
                this.props.convertibleUrl
                    ? convertedText
                    : this.props.children
            }</Text>
        );
        }
    }
}
