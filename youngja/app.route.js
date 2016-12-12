"use strict";

import codePush from "react-native-code-push";
import FCM from "react-native-fcm";
import React, { Component } from "react";
import {
    TouchableOpacity,
    Text,
    ToastAndroid,
    BackAndroid,
    Platform,
    View,
    Image,
    Linking,
    AppState,
    StyleSheet
} from "react-native";
import {
    Router,
    Scene,
    Reducer,
    Actions
} from "react-native-router-flux";
import EventBus from "./common/eventbus";
import Intro from "./scenes/intro/Intro";
import Redirect from "./Redirector";
import CircleTabContainer from "./scenes/circle/CircleTabContainer";
import MainTabContainer from "./scenes/main/MainTabContainer";
import MakeCircle from "./scenes/main/MakeCircle";
import JoinCircle from "./scenes/main/JoinCircle";
import WelcomeCircle from "./scenes/main/WelcomeCircle";
import NewsDetail from "./scenes/circle/news/NewsDetail";
import NewsRegist from "./scenes/circle/news/NewsRegist";
import NewsEdit from "./scenes/circle/news/NewsEdit";
import NoticeList from "./scenes/circle/news/NoticeList";
import Login from "./scenes/account/Login";
import SignUp from "./scenes/account/SignUp";
import Terms from "./scenes/account/Terms";
import EmailSignUpConfirmSend from "./scenes/account/EmailSignUpConfirmSend";
import TradeDepositDetail from "./scenes/circle/ledger/transaction/TradeDepositDetail";
import TradeExpenseDetail from "./scenes/circle/ledger/transaction/TradeExpenseDetail";
import DepositSelectMember from "./scenes/circle/ledger/transaction/DepositSelectMember";
import TermsTabContainer from "./scenes/account/TermsTabContainer";
import EmailResend from "./scenes/account/EmailResend";
import ResetPassword from "./scenes/account/ResetPassword";
import MyProfile from "./scenes/account/MyProfile";
import EditProfile from "./scenes/account/EditProfile";
import ChangePassword from "./scenes/account/ChangePassword";
import CircleProfileEdit from "./scenes/circle/setting/CircleProfileEdit";
import WaitingList from "./scenes/circle/member/WaitingList";
import PhotoDetail from "./scenes/circle/album/PhotoDetail";
import LedgerTabContainer from "./scenes/circle/ledger/LedgerTabContainer";
import MakeDues from "./scenes/circle/ledger/dues/MakeDues";
import DuesDetail from "./scenes/circle/ledger/dues/DuesDetail";
import EditDues from "./scenes/circle/ledger/dues/EditDues";
import DuesMemberDetail from "./scenes/circle/ledger/dues/DuesMemberDetail";
import ChargeDues from "./scenes/circle/ledger/dues/ChargeDues";
import SetSecretary from "./scenes/circle/setting/SetSecretary";
import CircleSettings from "./scenes/circle/setting/CircleSettings";
import CircleEdit from "./scenes/circle/setting/CircleEdit";
import CircleInfo from "./scenes/circle/setting/CircleInfo";
import CirclePermission from "./scenes/circle/setting/CirclePermission";
import CircleDelegateMaster from "./scenes/circle/setting/CircleDelegateMaster";
import CircleBankAccountTab from "./scenes/circle/setting/CircleBankAccountTab";
import MainNoticeList from "./scenes/main/MainNoticeList";
import MainNoticeDetail from "./scenes/main/MainNoticeDetail";
import CircleAccountInfo from "./scenes/circle/setting/CircleAccountInfo";
import CircleAlarm from "./scenes/circle/setting/CircleAlarm";
import UserAlarm from "./scenes/main/UserAlarm";
import CalendarRegister from "./scenes/circle/calender/CalendarRegister";
import CalendarDetail from "./scenes/circle/calender/CalendarDetail";
import CalendarEdit from "./scenes/circle/calender/CalendarEdit";
import PushHistory from "./scenes/main/PushHistory";
import ChatBot from "./scenes/circle/chatbot/Chatbot";
import ChargedList from "./scenes/circle/chatbot/ChargedList";
import Code from "./common/code";
import User from "./common/user";
import Navigation from "./common/navigation";
import Util from "./common/util";
import Icon from "react-native-vector-icons/MaterialIcons";
import Common from "../asset/css/CommonStyle";
import TextComponent from "./../app/components/common/TextComponent";

const reducerCreate = params => {
    const defaultReducer = Reducer(params);
    return (state, action) => {
        if (action.key === "login" || action.key === "signUp") {
            if (action.type === "push" && state.children.length > 1) {
                action.type = "replace";
            }
        }
        if (action.scene) {
            // TODO Save Current Scene on AsyncStorage
            console.log("App:reducerCreate", action.scene);
            Navigation.setCurrentScene(action.scene);
        }
        _routeState = state;
        return defaultReducer(state, action);
    }
};

var _routeState;
var _pressFirstBackKey = false;
var _currentAppState = null;
export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentAppState: AppState.currentState,
        }
    }

    componentWillMount() {
        BackAndroid.addEventListener("hardwareBackPress", () => {
            var childrenCount = _routeState.children.length;
            console.log("Children Count : " + childrenCount);
            if (childrenCount > 1) {
                return false;
            } else {
                if (!_pressFirstBackKey) {
                    ToastAndroid.show("한번 더 누르면 종료합니다.", ToastAndroid.SHORT);
                    _pressFirstBackKey = true;
                    setTimeout(this.cancelBackPress, 2000);
                } else {
                    BackAndroid.exitApp();
                }
                return true;
            }
        });
    }

    componentDidMount() {
        AppState.addEventListener("change", this.onChangeAppState.bind(this));
        console.log("App Initialized");
        codePush.sync({updateDialog: true, installMode: codePush.InstallMode.IMMEDIATE});
        Code.setCodeMap();
        User.readUser();
        FCM.requestPermissions(); // for iOS
        this.notificationUnsubscribe = FCM.on("notification", (notif) => {
            console.log("App Noti", notif);
            // 아이폰 푸시 처리 - 앱 백그라운드 실행해서 포그라운드로 진입시(1)
            setTimeout(() => {
                console.log("App Status", _currentAppState);
                var pushData = notif;
                if (_currentAppState == "active" && pushData.circleId && Platform.OS == "ios") { // foreground
                    var circleId = pushData.circleId;
                    var currentScene = Navigation.getCurrentScene();
                    console.log("Current Scene : " + currentScene.name);
                    if (currentScene.name == "mainContainer") {
                        EventBus.post("showPushEvent", pushData);
                    } else {
                        if (currentScene.name == "circleTabContainer") {
                            var circle = currentScene.circle;
                            var member = currentScene.member;
                            if (circle && circle.id == circleId) {
                                EventBus.post("movePushCircleTab", pushData);
                                return;
                            } else if (member && member.circle && member.circle.id == circleId) {
                                EventBus.post("movePushCircleTab", pushData);
                                return;
                            }

                        }
                        let user = User.getUser();
                        Actions.mainContainer({
                            fromLaunch: false,
                            user:       user,
                            circleId:   null,
                            pushData:   pushData
                        });
                    }
                }
            }, 500);
        });
        this.refreshUnsubscribe = FCM.on("refreshToken", (token) => {
            console.log("TOKEN : " + token);
            // TODO Registration TOKEN when Refreshed
            Util.Request.POST(
                `/device/${token}`,
                null,
                (res) => {
                },
                (err) => {
                    console.log(err);
                },
            );
        });
    }

    componentWillUnmount() {
        AppState.removeEventListener("change", this.onChangeAppState);
        this.refreshUnsubscribe();
        this.notificationUnsubscribe();
    }

    onChangeAppState(currentAppState) {
        _currentAppState = currentAppState;
        /* console.log("App Status listener", currentAppState);
         this.setState({currentAppState: currentAppState});*/
    }

    cancelBackPress() {
        _pressFirstBackKey = false;
    }

    render() {
        return (
            <Router
        createReducer={reducerCreate}
        titleStyle={{color: Common.Color.white}}
        barButtonIconStyle={{tintColor: Common.Color.white}}>
    <Scene
        key="main"
        navigationBarStyle={
        {
            backgroundColor: Common.Color.Main,
        ...Platform.select({
            android: {
                marginTop: Platform.Version < 21 ? 0 : 24
            }
        }),
        }}>
    <Scene
        key="redirect"
        component={Redirect}
        hideNavBar={true}
        initial={true}
        pushData={this.props.pushData}/>
    <Scene
        key="intro"
        component={Intro}
        hideNavBar={true}
        type="reset"/>
            <Scene
        key="signUp"
        component={SignUp}
        hideNavBar={false}
        backTitle="회원가입"
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="terms"
        component={Terms}
        hideNavBar={false}
        backTitle="약관 및 정책동의"
        leftButtonStyle={styles.leftButtonStyle}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="emailSignUpConfirmSend"
        component={EmailSignUpConfirmSend}
        hideNavBar={false}
        renderBackButton={() => {
            return null;
        }}/>
    <Scene
        key="login"
        component={Login}
        hideNavBar={false}
        backTitle="로그인"
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="mainContainer"
        title="친절한 영자씨"
        component={MainTabContainer}
        type="reset"
        renderBackButton={() => {
            return (
                <TouchableOpacity
            onPress={() => {
                EventBus.post("toggleMenu");
            }}>
        <Icon
            color={Common.Color.white}
            name="menu"
            size={24}/>
                </TouchableOpacity>
        )
        }}
        onRight={() => {
        }}
        rightButtonIconStyle={Common.iconSize}
        rightButtonImage={require("./../asset/image/icon_notification.png")}/>
    <Scene
        key="mainNoticeList"
        title="공지사항"
        component={MainNoticeList}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="mainNoticeDetail"
        component={MainNoticeDetail}
        leftButtonStyle={styles.leftButtonStyle}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="circleTabContainer"
        component={CircleTabContainer}
        panHandlers={null}
        onRight={() => {
        }}
        rightButtonIconStyle={Common.iconSize}
        renderRightButton={() => {
            return (
                <View style={{...Common.rowDirection}}>
        <TouchableOpacity
            style={{paddingLeft: 5, paddingRight:5}}
            onPress={() => {
                EventBus.post("chatbot");
            }}>
        <Icon color={Common.Color.white}
            name="mode-comment"
            size={24}/>
                </TouchableOpacity>
                <TouchableOpacity
            style={{paddingLeft: 5, paddingRight:5}}
            onPress={() => {
                EventBus.post("circleSettings");
            }}>
        <Icon color={Common.Color.white}
            name="settings"
            size={24}/>
                </TouchableOpacity>
                </View>

        )
        }}/>
    <Scene
        key="noticeList"
        backTitle="공지사항"
        component={NoticeList}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="newsDetail"
        backTitle="상세보기"
        component={NewsDetail}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="newsRegist"
        backTitle="새소식 작성"
        leftButtonStyle={styles.leftButtonStyle}
        component={NewsRegist}
        onRight={() => {
        }}
        rightTitle="완료"
        rightButtonTextStyle={styles.rightButtonTextStyle}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="newsEdit"
        backTitle="수정하기"
        component={NewsEdit}
        onRight={() => {
        }}
        rightTitle="완료"
        rightButtonTextStyle={styles.rightButtonTextStyle}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="makeCircle"
        component={MakeCircle}
        renderBackButton={() => {
            return (
                <TouchableOpacity
            onPress={() => {
                Actions.pop();
            }}>
        <Icon
            name="close"
            size={24}
            color={Common.Color.white}/>
        </TouchableOpacity>
        )
        }}
        onRight={() => {
        }}
        rightTitle="완료"
        rightButtonTextStyle={styles.rightButtonTextStyle}/>
    <Scene
        key="welcomeCircle"
        type="replace"
        component={WelcomeCircle}
        renderBackButton={() => {
            return (
                <TouchableOpacity
            onPress={() => {
                EventBus.post("backButton");
            }}>
        <Icon
            name="close"
            size={24}
            color={Common.Color.white}/>
        </TouchableOpacity>
        )
        }}
        onRight={() => {
        }}
        rightTitle="완료"
        rightButtonTextStyle={styles.rightButtonTextStyle}/>
    <Scene
        key="joinCircle"
        component={JoinCircle}
        renderBackButton={() => {
            return (
                <TouchableOpacity
            onPress={() => {
                Actions.pop();
            }}>
        <Icon
            name="close"
            size={24}
            color={Common.Color.white}/>
        </TouchableOpacity>
        )
        }}/>
    <Scene
        key="circleProfileEdit"
        component={CircleProfileEdit}
        backTitle="프로필 수정"
        leftButtonStyle={styles.leftButtonStyle}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="ledgerTabContainer"
        component={LedgerTabContainer}
        backTitle="모임통장"
        panHandlers={null}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="tradeDepositDetail"
        component={TradeDepositDetail}
        backTitle="입금내용 수정"
        leftButtonStyle={styles.leftButtonStyle}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="tradeExpenseDetail"
        component={TradeExpenseDetail}
        backTitle="지출내용 수정"
        leftButtonStyle={styles.leftButtonStyle}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="depositSelectMember"
        component={DepositSelectMember}
        backTitle="멤버추가"
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="termsTabContainer"
        component={TermsTabContainer}
        backTitle="약관 및 정책"
        leftButtonStyle={styles.leftButtonStyle}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="emailResend"
        component={EmailResend}
        backTitle="인증메일 재발송"
        leftButtonStyle={styles.leftButtonStyle}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="resetPassword"
        component={ResetPassword}
        backTitle="비밀번호 재설정"
        leftButtonStyle={styles.leftButtonStyle}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="myProfile"
        component={MyProfile}
        backTitle="내 프로필"
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="editProfile"
        component={EditProfile}
        backTitle="프로필 수정"
        leftButtonStyle={styles.leftButtonStyle}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="changePassword"
        component={ChangePassword}
        backTitle="비밀번호 변경"
        leftButtonStyle={styles.leftButtonStyle}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="waitingList"
        component={WaitingList}
        backTitle="가입신청자"
        leftButtonStyle={styles.leftButtonStyle}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="makeDues"
        component={MakeDues}
        backTitle="회비생성"
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="editDues"
        component={EditDues}
        backTitle="회비수정"
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="duesDetail"
        component={DuesDetail}
        backTitle="회비상세"
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="duesMemberDetail"
        component={DuesMemberDetail}
        leftButtonStyle={styles.leftButtonStyle}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="chargeDues"
        component={ChargeDues}
        backTitle="회비걷기"
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="circleSettings"
        component={CircleSettings}
        backTitle="모임설정"
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="circleInfo"
        component={CircleInfo}
        backTitle="모임 기본 정보"
        leftButtonStyle={styles.leftButtonStyle}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="circleEdit"
        component={CircleEdit}
        renderBackButton={() => {
            return (
                <TouchableOpacity
            style={{
                width:      300,
                    alignItems: "center",
            ...Common.rowDirection,
            }}
            onPress={() => {
                Actions.pop();
            }}>
        <Icon
            name="close"
            size={24}
            color={Common.Color.white}/>
        <TextComponent
            style={{
                marginLeft: 4,
                    fontSize:   16.5,
                    color:      Common.Color.white
            }}>모임 정보 수정</TextComponent>
            </TouchableOpacity>
        )
        }}/>
    <Scene
        key="circlePermission"
        component={CirclePermission}
        backTitle="모임권한설정"
        leftButtonStyle={styles.leftButtonStyle}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        upstream
        key="circleDelegateMaster"
        component={CircleDelegateMaster}
        backTitle="모임장 위임"
        leftButtonStyle={styles.leftButtonStyle}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="circleAccountInfo"
        component={CircleAccountInfo}
        backTitle="모임 계좌 정보"
        leftButtonStyle={styles.leftButtonStyle}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="circleBankAccountTab"
        component={CircleBankAccountTab}
        backTitle="계좌설정"
        leftButtonStyle={styles.leftButtonStyle}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="setSecretary"
        component={SetSecretary}
        backTitle="총무 지정/변경"
        leftButtonStyle={styles.leftButtonStyle}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="circleAlarm"
        component={CircleAlarm}
        backTitle="모임 알림 설정"
        leftButtonStyle={styles.leftButtonStyle}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="userAlarm"
        component={UserAlarm}
        backTitle="알림 설정"
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="calendarRegister"
        component={CalendarRegister}
        backTitle="일정만들기"
        leftButtonStyle={styles.leftButtonStyle}
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="calendarDetail"
        component={CalendarDetail}
        backTitle="일정상세"
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="calendarEdit"
        component={CalendarEdit}
        backTitle="일정수정"
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="photoDetail"
        component={PhotoDetail}
        rightTitle="다운"
        rightButtonTextStyle={styles.rightButtonTextStyle}
        onRight={() => {
        }}/>
    <Scene
        key="pushHistory"
        component={PushHistory}
        backTitle="알림"
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="chatBot"
        component={ChatBot}
        backTitle="Chatbot"
        backButtonTextStyle={styles.backButtonTextStyle}/>
    <Scene
        key="chargedList"
        component={ChargedList}
        backTitle="청구내역"
        renderBackButton={() => {
            return (
                <TouchableOpacity
            style={{
                width:      300,
                    alignItems: "center",
            ...Common.rowDirection,
            }}
            onPress={() => {
                Actions.pop();
            }}>
        <Icon
            name="close"
            size={24}
            color={Common.Color.white}/>
        <TextComponent
            style={{
                marginLeft: 4,
                    fontSize:   16.5,
                    color:      Common.Color.white
            }}>청구내역</TextComponent>
            </TouchableOpacity>
        )
        }}/>
    </Scene>
        </Router>
    );
    };
}

var styles = StyleSheet.create({
    backButtonTextStyle:  {
        color:             Common.Color.white,
        marginLeft:        8,
        alignSelf:         "center",
        textAlignVertical: "center",
        ...Common.centerAlign
    },
    leftButtonStyle:      {
        width: 300,
    },
    rightButtonTextStyle: {
        color:             Common.Color.white,
        marginRight:       8,
        alignSelf:         "flex-end",
        textAlignVertical: "center",
        ...Common.centerAlign
    }
});
