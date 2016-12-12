"use strict";

import React, {
    Component,
    PropTypes
} from "react";
import {
    View,
    Platform,
    StyleSheet,
    Image
} from "react-native";
import TextComponent from "./../../../components/common/TextComponent";
import styles from "../../../../asset/css/Chatbot";
import Common from "../../../../asset/css/CommonStyle";
var youngjaProfileImage = require("./../../../../asset/image/chatbot/youngja_selected.png");
var chargeBotProfileImage = require("./../../../../asset/image/chatbot/receipt_selected.png");

export default class ChatbotCard extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <View style={styles.chatContainer}>
    <View style={styles.userThumbnailWrapper}>
    <Image
        style={styles.userThumbnail}
        source={this.props.type === "youngja" ? youngjaProfileImage : chargeBotProfileImage}/>
    </View>
        <View style={styles.messageContainer}>
    <TextComponent
        style={styles.userName}>
        {
            this.props.type === "youngja" ? "친절한영자씨" : "청구봇"
        }
    </TextComponent>
        <View
        style={styles.messageWrapper}>
    <View style={styles.knobLeft}>
    </View>
        <View style={styles.messageLeft}>
    <TextComponent
        style={styles.message}>{this.props.children}</TextComponent>
        </View>
        </View>
        <TextComponent
        style={styles.messageDate}>2016.11.08</TextComponent>
        </View>
        </View>
    );
    }
}
