import { Lock, Sms } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { Alert, Switch } from 'react-native';
import { FONTFAMILY } from '../../../assets/fonts';
import COLORS from '../../assets/colors/Colors';
import { Facebook, Google } from '../../assets/svgs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ButtonComponent, InputComponent, KeyboardAvoidingViewWrapper, RowComponent, SectionComponent, SpaceComponent, TextComponent } from '../../components';
import { LoadingModal } from '../../modal';
import { globalStyle } from '../../styles/globalStyle';
import { Validate } from '../../utils/validate';
import authenticationAPI from '../../apis/authAPI';
import { useDispatch } from 'react-redux';
import { addAuth } from '../../redux/reducers/authReducer';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Settings, LoginManager, Profile } from 'react-native-fbsdk-next';

GoogleSignin.configure({
    webClientId: '18311887095-5nk1acdqhg8qp5nqdgcoqq84s7rce8ra.apps.googleusercontent.com',
});

Settings.setAppID('1033338435101331');

const LoginScreen = ({navigation}: any) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setIsRemember] = useState(true);
    const [isDisable, setIsDisable] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const emailValidation = Validate.email(email);

        if (!email || !password || !emailValidation) {
            setIsDisable(true);
        } else {
            setIsDisable(false);
        }
    }, [email, password]);

    const handleLogin = async () => {

        const emailValidation = Validate.email(email);
        setIsLoading(true);
        if (emailValidation) {
            setIsLoading(true);
            try {
                const res = await authenticationAPI.HandleAuthentication('/login', { email, password }, 'post');
                dispatch(addAuth(res.data));
                await AsyncStorage.setItem('auth', isRemember ? JSON.stringify(res.data) : email);
            } catch (error) {
                console.log(error)
            }

        } else {
            Alert.alert('Email is not correct!!!');
        }
    }

    const handleLoginWithGoogle = async () => {
        await GoogleSignin.hasPlayServices({
            showPlayServicesUpdateDialog: true, // hiển thị dialog chọn gg đăng nhập
        });

        const api = '/signInWithGoogle';
        setIsLoading(true);
        try {
            await GoogleSignin.hasPlayServices();

            const userInfo = await GoogleSignin.signIn(); // gọi đến đăng nhập
            const user = userInfo.user
            const res: any = await authenticationAPI.HandleAuthentication(api, user, 'post')
            // console.log(res);
            dispatch(addAuth(res.data));
            await AsyncStorage.setItem(
                'auth',
                JSON.stringify(res.data),
            );
        } catch (error) {
            console.log(error)
        }
    }

    const handleLoginWithFacebook = async () => {
        const api = '/signInWithGoogle';
        try {
            const result = await LoginManager.logInWithPermissions([
                'public_profile',
            ]);

            if (result.isCancelled) {
                console.log('Login cancel');
            } else {
                const profile = await Profile.getCurrentProfile();

                if (profile) {
                    setIsLoading(true);
                    const data = {
                        name: profile.name,
                        givenName: profile.firstName,
                        familyName: profile.lastName,
                        email: profile.userID, 
                        photo: profile.imageURL,
                    };

                    const res: any = await authenticationAPI.HandleAuthentication(
                        api,
                        data,
                        'post',
                    );

                    dispatch(addAuth(res.data));

                    await AsyncStorage.setItem('auth', JSON.stringify(res.data));

                    setIsLoading(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <KeyboardAvoidingViewWrapper>
            <SectionComponent>
                <SpaceComponent height={70}/>
                <TextComponent
                    text='SIGN IN'
                    styles={{ fontFamily: FONTFAMILY.montserrat_bold }}
                    color={COLORS.TEAL_GREEN}
                    size={45} />
                <TextComponent
                    text='Welcome Back'
                    size={30}
                    styles={{ fontFamily: FONTFAMILY.montserrat_regular }}
                    color={COLORS.BLACK} />
            </SectionComponent>
            <SpaceComponent height={40} />
            <SectionComponent>
                <TextComponent
                    text='Email'
                    styles={{ fontFamily: FONTFAMILY.montserrat_bold }}
                    color={COLORS.BLACK} />
                <SpaceComponent height={5}/>
                <InputComponent
                    value={email}
                    placeholder='Email'
                    onChange={val => setEmail(val)}
                    allowClear
                    affix={<Sms size={22} color={COLORS.HEX_LIGHT_GREY} />} />
                <TextComponent
                    text='Password'
                    styles={{ fontFamily: FONTFAMILY.montserrat_bold }}
                    color={COLORS.BLACK} />
                <SpaceComponent height={5}/>
                <InputComponent
                    value={password}
                    placeholder='Password'
                    onChange={val => setPassword(val)}
                    isPassword
                    affix={<Lock size={22} color={COLORS.HEX_LIGHT_GREY} />} />
            </SectionComponent>
            <SectionComponent>
                <RowComponent justify='space-between'>
                    <RowComponent onPress={() => setIsRemember(!isRemember)}>
                        <Switch
                            trackColor={{ false: COLORS.WHITE, true: COLORS.TEAL_GREEN }}
                            thumbColor={isRemember ? COLORS.WHITE : COLORS.TEAL_GREEN}
                            value={isRemember}
                            onChange={() => setIsRemember(!isRemember)} />
                        <TextComponent text='Remember me' color={COLORS.BLACK} />
                    </RowComponent>
                    <ButtonComponent
                        text='Forgot password?'
                        onPress={() => navigation.navigate('ForgotPassWord')}
                        type="link" />
                </RowComponent>
            </SectionComponent>
            <SectionComponent styles={{ marginTop: 20 }}>
                <ButtonComponent
                    disable={isDisable}
                    text='SIGN IN'
                    type='#129575'
                    onPress={handleLogin}
                />
            </SectionComponent>
            <SectionComponent>
                <TextComponent
                    text='Sign in with'
                    color={COLORS.HEX_LIGHT_GREY}
                    styles={{
                        textAlign: 'center',
                        fontSize: 16,
                        fontFamily: FONTFAMILY.montserrat_medium,
                        marginBottom: 30
                    }} />
                <RowComponent justify='center'>
                    <ButtonComponent
                        text=''
                        iconFlex='left'
                        type='#129575'
                        styles={[globalStyle.shadow, {flex: 0.1, marginRight: 20}]}
                        textColor={COLORS.HEX_LIGHT_GREY}
                        onPress={handleLoginWithGoogle}
                        icon={<Google  style = {{marginLeft: 13}}/>}
                    />
                    <ButtonComponent
                        text=''
                        iconFlex='left'
                        type='#129575'
                        onPress={handleLoginWithFacebook}
                        styles={[globalStyle.shadow, {flex: 0.1}]}
                        textColor={COLORS.HEX_LIGHT_GREY}
                        icon={<Facebook style = {{marginLeft: 13}}/>} />
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <SpaceComponent height={20}/>
                <RowComponent justify='center'>
                    <TextComponent text="Don't have an account yet?  " color={COLORS.BLACK} />
                    <ButtonComponent type='link' text='Register' onPress={() => {
                        navigation.navigate('SignUpScreen')
                    }} />
                </RowComponent>
            </SectionComponent>
            <LoadingModal visible={isLoading} />
        </KeyboardAvoidingViewWrapper>
    )
}

export default LoginScreen