import React from 'react';
import {Text,View,TouchableOpacity,StyleSheet,Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner' ;

export default class ScanScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCamPerm:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }
    getCamPermission=async()=>{
       const{status} = await Permissions.askAsync(Permissions.CAMERA);
       this.setState({
           hasCamPerm:status==='granted',
           buttonState:'clicked',
           scanned:'false'
       })
    }
    handlebarcodescanned=async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal',
        })
    }
    render(){
        const hasCamPerm = this.state.hasCamPerm;
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState;
        if(buttonState === 'clicked' && hasCamPerm){
           return(
               <BarCodeScanner
                onBarCodeScanned={scanned?undefined:this.handlebarcodescanned}
                style={StyleSheet.absoluteFillObject}/>
           )
           }else if(buttonState==='normal'){ 
             return(
             <View style={styles.container}>
                <Image
                source={{
                uri:"https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Barcode-scanner.jpg/220px-Barcode-scanner.jpg"
                }}
                style={styles.icon}
                />
                <Text style={styles.dT}>{
                    hasCamPerm===true?this.state.scannedData:"REQUEST CAMERA PERMISSION"
                }</Text>
                <TouchableOpacity 
                style={styles.scanB}
                onPress={this.getCamPermission}>
                    <Text style={styles.buttonText}>SCAN QR CODE!</Text>
                </TouchableOpacity>
             </View>
        )
       }
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    },
    dT:{
        fontSize:15,
        textDecorationLine:'underline'
    },
    scanB:{
        borderRadius:8,
        backgroundColor:'blue',
        padding:10,
        margin:10,
        border:2
    },
    buttonText:{
        fontSize:15,
        textDecorationLine:'underline',
        fontWeight:'bold',
        color:'white'
    },
    icon:{
        width:220,
        height:300
    }
})