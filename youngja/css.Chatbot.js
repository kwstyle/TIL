import { StyleSheet } from "react-native";
import Common from "./CommonStyle";

const styles = StyleSheet.create({
    container:          {
        ...Common.flexOne,
        ...Common.navigationBarMargin,
        backgroundColor: "#4A4A4A"
    },
    chatListContainer:  {
        ...Common.flexOne,
    },
    chatContainer:      {
        ...Common.rowDirection,
        paddingTop:  10,
        paddingLeft: 8
    },
    userThumbnailWrapper: {
        width:        40,
        height:       40,
        borderRadius: 20,
        ...Common.centerAlign,
        backgroundColor:         "white",
    },
    userThumbnail:      {
        width:        24,
        height:       24
    },
    messageContainer:   {
        ...Common.flexOne,
        marginLeft: 10,
    },
    massage:            {
        color: Common.defaultFontColor,
        height: 16,
    },
    userName:           {
        fontSize:     Common.defaultSubFontSize,
        color:        Common.Color.white,
        marginBottom: 3,
    },
    messageDate:        {
        fontSize:   Common.defaultSubFontSize,
        color:      Common.defaultSubFontColor,
        marginLeft: 10
    },
    messageWrapper:     {
        ...Common.rowDirection,
    },
    knobLeft:           {
        borderColor:      "white",
        borderTopWidth:   6,
        borderLeftWidth:  8,
        borderLeftColor:  "transparent",
        borderRightColor: "transparent"
    },
    messageLeft:        {
        borderTopRightRadius:    4,
        borderBottomRightRadius: 4,
        borderBottomLeftRadius:  4,
        backgroundColor:         "white",
        padding:                 12,
        maxWidth:                Common.device.width - 100,
    },
    myMessageContainer: {
        ...Common.flexOne,
        alignItems:  'flex-end',
        marginRight: 10,
    },
    knobRight:          {
        borderColor:      "white",
        borderTopWidth:   6,
        borderRightWidth: 8,
        borderLeftColor:  "transparent",
        borderRightColor: "transparent"
    },
    messageRight:       {
        borderTopLeftRadius:     4,
        borderBottomRightRadius: 4,
        borderBottomLeftRadius:  4,
        backgroundColor:         "white",
        padding:                 12,
        maxWidth:                Common.device.width - 100,
    },
    myMessageWrapper:   {
        ...Common.rowDirection,
    },
    inputContainer:     {
        padding:         8,
        alignItems:      "flex-end",
        justifyContent:  "flex-end",
        ...Common.rowDirection,
        backgroundColor: "#eeeeee",
    },
    textInput:          {
        ...Common.flexOne,
        marginLeft:        8,
        marginRight:       8,
        textAlignVertical: "top",
        color:             Common.defaultFontColor,
        fontSize:          Common.defaultSubFontSize,
        padding:           4,
        borderRadius:      4,
        backgroundColor:   Common.Color.white
    },
    sendBtn:            {
        borderRadius:    4,
        ...Common.centerAlign,
        paddingLeft:     8,
        paddingRight:    8,
        height:          32,
        backgroundColor: Common.Color.Sub,
    },
    sendLabel:          {
        color: Common.Color.white,
    },
    disabledBtn:        {
        borderRadius:    4,
        ...Common.centerAlign,
        paddingLeft:     8,
        paddingRight:    8,
        height:          32,
        backgroundColor: Common.Color.default,
    },
    disabledLabel:      {
        color: Common.defaultFontColor,
    },
    botContainer:       {
        paddingRight: 8,
        paddingLeft:  8,
        ...Common.rowDirection,
        ...Common.backgroundColor.white,
    },
    botBtn:             {
        paddingTop:    8,
        paddingBottom: 8,
        paddingRight:  16,
        paddingLeft:   16,
    },
    botLabel:           {
        color: Common.Color.Sub,
    },
    botBtnSelected:     {
        borderBottomWidth: 3,
        borderBottomColor: Common.Color.Sub
    },
    message:            {
        flex: 1
    },

    // Charge
    chargeContainer: {
        ...Common.backgroundColor.default
    },
    knobInner : {
        left: -12,
        top:15,
        borderColor:      Common.Color.background,
        height: 0,
        width: 0,

        borderWidth: 5,
        borderTopColor:  "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "transparent",
    },
    knobOuter : {
        left: -1,
        top:15,
        height: 0,
        width: 0,
        borderColor:      "black",
        borderWidth: 5,
        borderTopColor:  "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "transparent",
    },
    chargeBtnWrapper: {
        paddingTop:    20,
        paddingBottom: 20,
        paddingLeft:   12,
        paddingRight:  0,
        ...Common.rowDirection
    },
    chargeListWrapper: {
        paddingTop:    20,
        paddingBottom: 20,
        paddingLeft:   12,
        paddingRight:  12
    },
    chargeBtnOne:     {
        flex:                   1,
        borderColor:            "black",
        borderWidth:            1,
        borderRightWidth:       0,
        borderTopLeftRadius:    4,
        borderBottomLeftRadius: 4,
        padding:                8,
        ...Common.centerAlign
    },
    chargeBtnTwo:     {
        flex:                    1,
        borderColor:             "black",
        borderWidth:             1,
        borderTopRightRadius:    4,
        borderBottomRightRadius: 4,
        padding:                 8,
        ...Common.centerAlign
    },
    chargeListItemFirst: {
        height: 48,
        borderColor:            "black",
        borderWidth:            1,
        borderBottomWidth:       0,
        borderTopLeftRadius:    4,
        borderTopRightRadius: 4,
        padding:                8,
        ...Common.centerAlign
    },
    chargeListItem: {
        height: 48,
        borderColor:            "black",
        borderWidth:            1,
        borderBottomWidth:       0,
        padding:                8,
        ...Common.centerAlign
    },
    chargeListItemLast: {
        height: 48,
        borderColor:            "black",
        borderWidth:            1,
        borderBottomRightRadius:    4,
        borderBottomLeftRadius: 4,
        padding:                8,
        ...Common.centerAlign
    },
    chatImage:        {
        width:        220,
        height:       140,
        borderRadius: 4,
    },

    // weather
    weatherContainer: {}
});

module.exports = styles;
