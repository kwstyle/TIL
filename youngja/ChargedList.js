"use strict";

import React, { Component } from "react";
import {
    Modal,
    View,
    ListView,
    StyleSheet,
    TouchableOpacity,
    Alert
} from "react-native";
import Common from "./../../../../asset/css/CommonStyle";
import styles from "../../../../asset/css/ChargedList";
import { Actions } from "react-native-router-flux";
import TextComponent from "./../../../components/common/TextComponent";
import PageableListView from "./../../../components/common/PageableListView";
import Util from "./../../../common/util";
import User from "./../../../common/user";
import Spinner from "react-native-loading-spinner-overlay";

export default class AcceptSecretaryModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading:      true,
            chargedList: [
                {title: "복리후생비 - OT Meal", type: "inProcess", dueDate: "2016.11.20"},
                {title: "복리후생비 - OT Meal", type: "paid",dueDate: "2016.10.30"},
                {title: "여비교통비 - OT Taxi", type: "return", dueDate: "2016.09.17"},
            ],
            dataSource:     new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        };
    }
    componentDidMount() {
        this.pageableListView.addItem(this.state.chargedList);
        this.setState({
            isLoading: false
        })
    }

    getData() {

    }

    renderHeader() {
        return (<View
        style={[
            styles.circleLedger,
            styles.cardShadow
    ]}>
    <View
        style={styles.chargedInfoArea}>
    <TextComponent
        style={styles.chargedInfoTitle}>총 {this.state.chargedList.length}건</TextComponent>
        </View>
        </View>);
    }

    renderRow(data) {
        let typeColor, typeText;
        switch (data.type) {
            case "inProcess" :
                typeColor= "#F3B85C";
                typeText = "처리중";
                break;
            case "paid" :
                typeColor= "#589EE8";
                typeText = "입금";
                break;
            case "return" :
                typeColor= "#FF8F6C";
                typeText = "반려";
                break;
        }
        return (
            <View
        style={styles.rowContainer}>
    <View
        style={styles.rowSubContainer}>
    <View style={[
            styles.rowStatusBox,
        {
            backgroundColor: typeColor
        }
    ]}>
    <TextComponent
        style={{
            color: Common.Color.white
        }}>{typeText}</TextComponent>
        </View>
        <TextComponent
        style={styles.rowTitleTxt}>{data.title}</TextComponent>
        </View>
        <View
        style={styles.rowSubContainer}>
    <TextComponent
        style={styles.rowDateTxt}>{data.dueDate}</TextComponent>
        </View>
        </View>
    );
    }

    render() {
        return (
            <View
        style={styles.mainContainer}>
    <PageableListView
        ref={(page) => {
            this.pageableListView = page;
        }}
        totalPage={this.state.totalPage}
        currentPage={this.state.currentPage}
        emptyText="회비내역이 없습니다."
        renderHeader={this.renderHeader.bind(this)}
        renderRow={this.renderRow.bind(this)}
        onLoadMore={(page) => {
            this.getData(page);
        }}/>
    <Spinner
        visible={this.state.isLoading}/>
    </View>
    );
    }
}

