import { ArrowLeft, Sms } from 'iconsax-react-native';
import React, { useState } from 'react';
import { Alert, Image, TouchableOpacity, View } from 'react-native';
import COLORS from '../../assets/colors/Colors';
import { ButtonComponent, InputComponent, KeyboardAvoidingViewWrapper, SectionComponent, TextComponent } from '../../components';
import { LoadingModal } from '../../modal';
import { globalStyle } from '../../styles/globalStyle';
import { Validate } from '../../utils/validate';
import { FONTFAMILY } from '../../../assets/fonts';
import IMAGES from '../../assets/images/Images';
import authenticationAPI from '../../apis/authAPI';

const ForgotPassWord = ({ navigation }: any) => {

    const [email, setEmail] = useState('');
    const [isDisable, setIsDisable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    const handleCheckEmail = () => {
        const isValidEmail = Validate.email(email);
        setIsDisable(!isValidEmail);
    }

    const handleForgotPassword = async () => {
        const api = `/forgotPassword`;
        setIsLoading(true);
        try {
            const res: any = await authenticationAPI.HandleAuthentication(api, { email }, 'post');
            console.log(res);
            Alert.alert('Send Password to You: ', 'We have sent your email including the new password!');
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(`Unable to create new password forgot password api, ${error}`);
        }
    }

    return (
        <KeyboardAvoidingViewWrapper>
            <View style={globalStyle.container}>
                <SectionComponent>
                    <TouchableOpacity style={{ paddingTop: 50, paddingBottom: 10 }}>
                        <ArrowLeft size={24} color={COLORS.BLACK}
                            onPress={() => navigation.goBack()} />
                    </TouchableOpacity>
                    <SectionComponent>
                        <Image source={IMAGES.ForgotPass} style={{ width: '100%', height: 270, marginTop: 25 }} />
                    </SectionComponent>
                    <TextComponent text='Resset Password' title font={FONTFAMILY.montserrat_bold} color={COLORS.TEAL_GREEN} />
                    <TextComponent text='To reset your password, you need an email that can be authenticated.' styles={{ paddingBottom: 30 }} color={COLORS.BLACK} />
                    <InputComponent
                        value={email}
                        onChange={val => setEmail(val)}
                        placeholder='abc123@gmail.com'
                        affix={<Sms size={24} color={COLORS.HEX_LIGHT_GREY} />}
                        onEnd={handleCheckEmail} />
                </SectionComponent>
                <SectionComponent styles={{ alignItems: 'center' }}>
                    <ButtonComponent
                        text='SEND'
                        type='#129575'
                        styles={{ width: '80%' }}
                        disable={isDisable}
                        onPress={handleForgotPassword}
                    />
                </SectionComponent>
                <LoadingModal visible={isLoading} />
            </View>
        </KeyboardAvoidingViewWrapper>
    )
}

export default ForgotPassWord