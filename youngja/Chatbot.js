"useUser strict";

import React, { Component } from "react";
import {
    Alert,
    View,
    TextInput,
    Image,
    StyleSheet,
    ScrollView,
    ListView,
    Platform,
    NativeModules,
    TouchableOpacity,
    KeyboardAvoidingView,
    Keyboard,
    ActivityIndicator
} from "react-native";
import { Actions } from "react-native-router-flux";
import styles from "../../../../asset/css/Chatbot";
import Common from "../../../../asset/css/CommonStyle";
import Util from "./../../../common/util";
import TextComponent from "../../../components/common/TextComponent";
import ChatbotCard from "./ChatbotCard";
import ChatCard from "./ChatCard";
import ChatImage from "./ChatImage";
import LoadingBar from "./LoadingBar"
import User from "./../../../common/user";
import Swiper from "react-native-swiper";

var defaultProfileImage = require("./../../../../asset/image/default_user_image_360.png");

const dismissKeyboard = require("dismissKeyboard");
const contentsContainerHeight = Common.device.height - 48 - 60;

export default class ChatbotWrapper extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
                Platform.OS === "ios" ?
            <KeyboardAvoidingView
        behavior={"padding"}
        style={Common.flexOne}
    >
    <Chatbot
        member={this.props.member}
    />
    </KeyboardAvoidingView>

    :

    <Chatbot
        member={this.props.member}/>
    )
    }
}

class Chatbot extends Component {
    constructor(props) {
        super(props);
        this.noEntityMessage = [
            // `${this.props.member.profile.name}님, 무슨말인지 모르겠어요.`,
            `무슨말인지 모르겠네요. 순siri에게 물어볼까요?`,
            `죄송하지만, 뭐라고 하셨는지 잘 이해하지 못했어요.`,
            `방금 하신 말씀을 잘 이해하지 못했어요. 죄송해요.`,
            // `죄송해요, ${this.props.member.profile.name}님. 잘 못 알아들었어요.`,
            `뭐라고 하셨는지 잘 못 알아들었어요.`,
            `다시 말씀해 주실 수 있을까요?`,
            // `방금 제대로 이해 못 했어요. ${this.props.member.profile.name}님, 다시 말씀해 주실 수 있을까요?`,
            `다시 말씀해 주실 수 있을까요?`,
        ];

        this.insultMessage = [
            // `${this.props.member.profile.name}님, 너무하시네요.`,
            `너 고소!!`,
            `자꾸 그러시면 저도 더 이상 참지 못합니다.`,
            `이종오 상무님께 이를거에요.`,
        ];

        this.state = {
            message:    "",
            botMode:    "chatbot",
            chargeStep: "one",
            chatList:   [
                {type: "youngja", message: "안녕하세요. 무엇을 도와드릴까요?"},
            ],
            step:       {
                chargeSelect: [
                    {
                        message: "경비청구 할래", action: () => {
                    }
                    },
                    {

                        message: "경비확인 할래", action: () => {


                    }
                    },
                ]
            },
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            })
        };
    }

    componentWillReceiveProps(nextProps) {
        if (super.componentWillReceiveProps(nextProps)) {
            this.setState({member: nextProps.member});
            return true;
        }
    }

    componentWillMount() {

    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    keyboardWillShow(e) {
        var data = this.state.layoutRects.find((layout) => {
            return layout.tag === this.state.currentFocus;
        });
        if (data) {
            var scrollY = this.measureScrollY(data.rect, e.endCoordinates.height, 64, Common.bottomButtonHeight);
            this.scrollView.scrollTo({x: 0, y: scrollY, animated: true});
        }
    }

    keyboardWillHide(e) {
        var data = this.state.layoutRects.find((layout) => {
            return layout.tag === this.state.currentFocus;
        });
        if (data) {
            var scrollY = this.measureScrollY(data.rect, 0, 64, Common.bottomButtonHeight);
            this.scrollView.scrollTo({x: 0, y: scrollY, animated: true});
        }
    }

    renderChatList(data) {
        if (data.type === "youngja" || data.type === "chargeBot") {
            return <ChatbotCard
            type={data.type}>
            {data.message}
        </ChatbotCard>
        } else if (data.type === "image") {
            return <ChatImage
            uri={data.uri}
        />
        } else if (data.type === "loading") {
            return <LoadingBar />

        } else {
            return <ChatCard>{data.message}</ChatCard>
        }
    }

    onPressSend() {
        var myChat = {type: "mine", message: this.state.message};
        this.state.chatList.push(myChat);
        this.state.chatList.push({type: "loading"});

        this.setState({
            chatList: this.state.chatList
        }, () => {
            var today = Util.Time.today();
            var requestUrl = `https://api.wit.ai/message?v=${today}&q=${this.state.message}`;
            var opt = {
                "headers": {"Authorization": "Bearer 55TED6F5C2QWPL5CBHEMP3HJ4BFIERCI"}
            };

            Util.ExternalApiRequest.request(
                requestUrl,
                "GET",
                opt.headers,
                null,
                (res) => {
                    var chatList = [];

                    if (res.entities.intent) {
                        if (res.entities.intent[0].value === "insult") {
                            chatList.push({
                                type:    "youngja",
                                message: this.insultMessage[parseInt(Math.random() * this.insultMessage.length, 10)]
                            });
                        } else if (res.entities.intent[0].value === "bill") {
                            chatList.push({
                                type:    "youngja",
                                message: "@청구봇을 호출합니다.",
                            });
                            chatList.push({
                                type:    "chargeBot",
                                message: "안녕하세요. 청구봇이에요. 무엇을 도와드릴까요?",
                            });
                            this.setState({
                                botMode: "charge"
                            });
                        }
                    } else {
                        chatList.push({
                            type:    "youngja",
                            message: this.noEntityMessage[parseInt(Math.random() * this.noEntityMessage.length, 10)]
                        });
                    }
                    this.state.chatList.splice(this.state.chatList.length - 1, 1);
                    this.state.chatList.push(...chatList);
                    this.setState({
                        message:  "",
                        chatList: this.state.chatList
                    });
                },
                (err) => {
                    alert('err');
                }
            );
        });
    }

    onPressSendDetail() {
        var myChat = {type: "mine", message: this.state.message};
        var botMessage = {type: "chargeBot", message: "위의 내용이 정확한가요?"};
        this.state.chatList.push(...[
            myChat,
            botMessage
        ]);
        this.setState({
            message:    "",
            chargeStep: "selectResult",
            chatList:   this.state.chatList
        });
    }

    onPressChange(mode) {
        if (mode === "chargeBot") {
            var botMessage = {type: "youngja", message: "무엇을 도와드릴까요?"};
            this.state.chatList.push(...[
                botMessage
            ]);
            this.setState({
                message:    "",
                botMode:    mode,
                chatList:   this.state.chatList
            });
        } else {
            this.setState({
                botMode:    mode,
                chargeStep: "one"
            });
        }
    }

    doCharge() {
        var message = {type: "mine", message: "경비청구 할래"};
        var botMessage = {type: "chargeBot", message: "청구하실 영수증을 첨부해 주세요."};
        this.state.chatList.push(...[
            message,
            botMessage
        ]);
        this.setState({
            chargeStep: "two",
            chatList:   this.state.chatList
        });
    }

    checkCharge() {


        var message = {type: "mine", message: "경비확인 할래"};
        var botMessage = {type: "chargeBot", message: "경비 청구내역을 불러옵니다."};
        this.state.chatList.push(...[
            message,
            botMessage
        ]);
        this.setState({
            chargeStep: "one",
            chatList:   this.state.chatList
        }, () => {
            Actions.chargedList();
        });

    }

    selectProject() {
        var message = {type: "mine", message: "그래"};
        var botMessage = {type: "chargeBot", message: "어느 프로젝트를 하고 계세요?"};
        this.state.chatList.push(...[
            message,
            botMessage
        ]);
        this.setState({
            chargeStep: "selectProject",
            chatList:   this.state.chatList
        });
    }

    selectWorkItem(data) {
        var message = {type: "mine", message: data};
        var botMessage = {type: "chargeBot", message: "어디에 쓰신거에요?"};
        this.state.chatList.push(...[
            message,
            botMessage
        ]);
        this.setState({
            chargeStep: "selectWorkItem"
        }, () => {
            this.setState({
                chatList:   this.state.chatList
            })
        });
    }

    detailView(data) {
        var message = {type: "mine", message: data};
        var botMessage = {type: "chargeBot", message: "상세내역을 작성하시겠어요?"};
        this.state.chatList.push(...[
            message,
            botMessage
        ]);
        this.setState({
            chargeStep: "detailView",
            chatList:   this.state.chatList
        });
    }

    registDetail() {
        var message = {type: "mine", message: "응, 작성할게"};
        var botMessage = {type: "chargeBot", message: "상세내역을 작성해주세요."};
        this.state.chatList.push(...[
            message,
            botMessage
        ]);
        this.setState({
            chargeStep: "registDetail",
            chatList:   this.state.chatList
        }, () => {
            this.refs["input"].focus();
        });
    }

    noDetail() {
        var message = {type: "mine", message: "아니, 괜찮아."};
        var botMessage = {type: "chargeBot", message: `성공적으로 청구 되었습니다. ${"\n"}제가 더 도와드릴일이 있을까요?`};
        this.state.chatList.push(...[
            message,
            botMessage
        ]);
        this.setState({
            chargeStep: "one",
            chatList:   this.state.chatList
        });
    }

    resultTexiDetail() {
        var message = {type: "mine", message: "야근 택시비"};
        var botMessage = {type: "chargeBot", message: `성공적으로 청구 되었습니다. ${"\n"}제가 더 도와드릴일이 있을까요?`};
        this.state.chatList.push(...[
            message,
            botMessage
        ]);
        this.setState({
            chargeStep: "one",
            chatList:   this.state.chatList
        });
    }

    resultView() {
        var message = {type: "mine", message: "응, 맞아"};
        var botMessage = {type: "chargeBot", message: `성공적으로 청구 되었습니다. ${"\n"}제가 더 도와드릴일이 있을까요?`};
        this.state.chatList.push(...[
            message,
            botMessage
        ]);
        this.setState({
            chargeStep: "one",
            chatList:   this.state.chatList
        });
    }

    getButtonView(buttons) {
        return(
            <View style={styles.chargeBtnWrapper}>
    <TouchableOpacity
        style={styles.chargeBtnOne}
        onPress={() => this.detailView("야근 식대비")}>
    <TextComponent>야근 식대비</TextComponent>
        </TouchableOpacity>
        <TouchableOpacity
        style={styles.chargeBtnTwo}
        onPress={() => this.resultTexiDetail()}>
    <TextComponent>야근 택시비</TextComponent>
        </TouchableOpacity>
        <View
        style={styles.knobOuter}>
    </View>
        <View
        style={styles.knobInner}>
    </View>
        </View>
    )
    }
    uploadImage(response) {
        var uri = "";
        var data = "data:image/png;base64," + response.data;

        if (response.didCancel) {
            return false;
        }

        if (Platform.OS === "ios") {
            uri = response.uri.replace("file://", "");
        } else {
            uri = response.uri;
        }

        var imageMassage = {
            type: "image",
            uri:  {uri: uri}
        };

        var botMessage = {type: "chargeBot", message: "이 사진으로 할까요?"};
        this.state.chatList.push(...[
            imageMassage,
            botMessage
        ]);

        this.setState({
            chargeStep: "three",
            chatList:   this.state.chatList
        });
    }

    render() {
        return (
            <View style={styles.container}>
    <View style={Common.flexOne}>
    <ListView
        ref={(listView) => this.listView = listView}
        keyboardShouldPersistTaps={true}
        style={styles.chatListContainer}
        enableEmptySections={true}
        renderRow={this.renderChatList.bind(this)}
        dataSource={this.state.dataSource.cloneWithRows(this.state.chatList)}
        onLayout={event => {
            this.listViewHeight = event.nativeEvent.layout.height
        }}
        onContentSizeChange={
        (width, height) => {
            if (height - this.listViewHeight > 0)
                this.listView.scrollTo({y: height - this.listViewHeight})
        }
    }
    />
        {
            (this.state.botMode === "chatbot" || this.state.chargeStep === "registDetail") &&
            <View
            style={styles.inputContainer}>
        <TextInput
            style={styles.textInput}
            autoCorrect={false}
            ref="input"
            onChangeText={(text) => {
            this.setState({message: text})
        }}
            onEndEditing={(e) => {
            this.onPressSend();
            e.stopPropagation();
        }}
            value={this.state.message}/>
            {
                this.state.message.trim() !== ""
                    ?
            <TouchableOpacity
                style={styles.sendBtn}
                onPress={() => {
                if (this.state.botMode === "chatbot") {
                    this.onPressSend();
                } else {
                    this.onPressSendDetail();
                }

            }}>
            <TextComponent
                style={styles.sendLabel}>등록</TextComponent>
            </TouchableOpacity>
            :
            <View style={styles.disabledBtn}>
            <TextComponent
                style={styles.disabledLabel}>등록</TextComponent>
            </View>
            }
        </View>
        }
    <View
        style={styles.botContainer}>
    <TouchableOpacity
        style={[
                styles.botBtn,
                this.state.botMode === "chatbot" && styles.botBtnSelected
    ]}
        onPress={() => this.onPressChange('chatbot')}>
    <Image
        style={{width: 20, height: 20}}
        source={this.state.botMode === "chatbot"
            ? require("./../../../../asset/image/chatbot/youngja_selected.png")
            : require("./../../../../asset/image/chatbot/youngja_none.png")}/>
    </TouchableOpacity>
        <TouchableOpacity
        style={[
                styles.botBtn,
                this.state.botMode === "charge" && styles.botBtnSelected
    ]}
        onPress={() => this.onPressChange('charge')}>
    <Image
        style={{width: 20, height: 20}}
        source={
            this.state.botMode === "charge"
            ? require("./../../../../asset/image/chatbot/receipt_selected.png")
            : require("./../../../../asset/image/chatbot/receipt_none.png")}/>
    </TouchableOpacity>
        </View>

        {
            this.state.botMode === "charge" &&
        <View style={styles.chargeContainer}>
        {
            this.state.chargeStep === "one" &&
            <View style={styles.chargeBtnWrapper}>
        <TouchableOpacity
            style={styles.chargeBtnOne}
            onPress={() => this.doCharge()}>
        <TextComponent>경비청구 할래</TextComponent>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.chargeBtnTwo}
            onPress={() => this.checkCharge()}>
        <TextComponent>경비확인 할래</TextComponent>
        </TouchableOpacity>
        <View
            style={styles.knobOuter}>
        </View>
        <View
            style={styles.knobInner}>
        </View>
        </View>
        }
        {
            this.state.chargeStep === "two" &&
            <View style={styles.chargeBtnWrapper}>
        <TouchableOpacity
            style={styles.chargeBtnOne}
            onPress={() => {

            Util.Gallery.getCamera((res) => {
                console.log(res);
                this.uploadImage(res)
            }, (err) => {
                console.log(err)
            });

        }
        }>
        <TextComponent>사진촬영</TextComponent>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.chargeBtnTwo}
            onPress={() => {

            Util.Gallery.getPhoto((res) => {
                console.log(res);
                this.uploadImage(res)
            }, false);

        }
        }>
        <TextComponent>사진선택</TextComponent>
        </TouchableOpacity>
        <View
            style={styles.knobOuter}>
        </View>
        <View
            style={styles.knobInner}>
        </View>
        </View>
        }
        {
            this.state.chargeStep === "three" &&
            <View style={styles.chargeBtnWrapper}>
        <TouchableOpacity
            style={styles.chargeBtnOne}
            onPress={() => this.selectProject()}>
        <TextComponent>그래</TextComponent>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.chargeBtnTwo}
            onPress={() => this.doCharge()}>
        <TextComponent>다시할래</TextComponent>
        </TouchableOpacity>
        <View
            style={styles.knobOuter}>
        </View>
        <View
            style={styles.knobInner}>
        </View>
        </View>
        }
        {
            this.state.chargeStep === "result" &&
            <View style={styles.chargeBtnWrapper}>
        <TouchableOpacity
            style={styles.chargeBtnOne}>
        <TextComponent>사진촬영</TextComponent>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.chargeBtnTwo}>
        <TextComponent>사진선택</TextComponent>
        </TouchableOpacity>
        <View
            style={styles.knobOuter}>
        </View>
        <View
            style={styles.knobInner}>
        </View>
        </View>
        }
        {
            this.state.chargeStep === "selectProject" &&
            <Swiper
            height={240}
            style={{}}
            showButtons={true}
            paginationStyle={{bottom: 10}}
            activeDotColor={Common.Color.Sub}>
        <View style={styles.chargeListWrapper}>
        <TouchableOpacity
            style={styles.chargeListItemFirst}
            onPress={() => this.selectWorkItem("Direct Banking Mobile (내부)")}>
        <TextComponent>Direct Banking Mobile (내부)</TextComponent>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.chargeListItem}
            onPress={() => this.selectWorkItem("BX Framework v3 개발 (내부)")}>
        <TextComponent>BX Framework v3 개발 (내부)</TextComponent>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.chargeListItem}
            onPress={() => this.selectWorkItem("커뮤니티어카운팅 (내부)")}>
        <TextComponent>커뮤니티어카운팅 (내부)</TextComponent>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.chargeListItemLast}
            onPress={() => this.selectWorkItem("P2P Lending Mobile (내부)")}>
        <TextComponent>P2P Lending Mobile (내부)</TextComponent>
        </TouchableOpacity>
        </View>
        <View style={styles.chargeListWrapper}>
        <TouchableOpacity
            style={styles.chargeListItemFirst}
            onPress={() => this.selectWorkItem("Direct Banking Mobile (내부)")}>
        <TextComponent>Direct Banking Mobile (내부)</TextComponent>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.chargeListItemLast}
            onPress={() => this.selectWorkItem("P2P Lending Mobile (내부)")}>
        <TextComponent>P2P Lending Mobile (내부)</TextComponent>
        </TouchableOpacity>
        </View>
        </Swiper>
        }
        {
            this.state.chargeStep === "selectWorkItem" &&
            <View style={styles.chargeBtnWrapper}>
        <TouchableOpacity
            style={styles.chargeBtnOne}
            onPress={() => this.detailView("야근 식대비")}>
        <TextComponent>야근 식대비</TextComponent>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.chargeBtnTwo}
            onPress={() => this.resultTexiDetail()}>
        <TextComponent>야근 택시비</TextComponent>
        </TouchableOpacity>
        <View
            style={styles.knobOuter}>
        </View>
        <View
            style={styles.knobInner}>
        </View>
        </View>
        }
        {
            this.state.chargeStep === "detailView" &&
            <View style={styles.chargeBtnWrapper}>
        <TouchableOpacity
            style={styles.chargeBtnOne}
            onPress={() => this.registDetail()}>
        <TextComponent>응, 작성할게</TextComponent>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.chargeBtnTwo}
            onPress={() => this.noDetail()}>
        <TextComponent>아니, 괜찮아</TextComponent>
        </TouchableOpacity>
        <View
            style={styles.knobOuter}>
        </View>
        <View
            style={styles.knobInner}>
        </View>
        </View>
        }
        {
            this.state.chargeStep === "selectResult" &&
            <View style={styles.chargeBtnWrapper}>
        <TouchableOpacity
            style={styles.chargeBtnOne}
            onPress={() => this.resultView()}>
        <TextComponent>응, 맞아</TextComponent>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.chargeBtnTwo}
            onPress={() => this.registDetail()}>
        <TextComponent>아니, 다시쓸래</TextComponent>
        </TouchableOpacity>
        <View
            style={styles.knobOuter}>
        </View>
        <View
            style={styles.knobInner}>
        </View>
        </View>
        }
    </View>
    }
    </View>
        </View>
    );
    }
}
