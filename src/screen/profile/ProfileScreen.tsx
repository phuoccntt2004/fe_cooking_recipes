import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { ArrowLeft2, ArrowRight2, Clock, Location, LogoutCurve, MessageQuestion, Setting2, User } from 'iconsax-react-native';
import React, { useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { LoginManager } from 'react-native-fbsdk-next';
import { ReactNativeModal } from 'react-native-modal/dist/modal';
import { useDispatch, useSelector } from 'react-redux';
import { FONTFAMILY } from '../../../assets/fonts';
import COLORS from '../../assets/colors/Colors';
import { authSelector, removeAuth } from '../../redux/reducers/authReducer';
import { ContainerComponent, RowComponent, SectionComponent, TextComponent } from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProFileScreen = ({ navigation }: any) => {
  const user = useSelector(authSelector);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);


  const handleLogout = async () => {
    setModalVisible(true);
  };

  const handleSignOut = async () => {
    await GoogleSignin.signOut();
    await LoginManager.logOut();
    dispatch(removeAuth({}));
    await AsyncStorage.removeItem("auth");

    // Ẩn modal sau khi đăng xuất thành công
    setModalVisible(false);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  return (
    <ContainerComponent>
      <SectionComponent styles={{ marginTop: 40 }}>
        <RowComponent justify='space-between'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 size={24} color={COLORS.BLACK} />
          </TouchableOpacity>
          <TextComponent
            text="Profile"
            color={COLORS.BLACK}
            size={25}
            font={FONTFAMILY.montserrat_medium} />
          <View></View>
        </RowComponent>
      </SectionComponent>
      <SectionComponent styles={{ alignItems: 'center', marginTop: 40 }}>
        {user.photo ? (
          <Image source={{ uri: user.photo }} style={[styles.avatar]} />
        ) : (
          <View
            style={[styles.avatar, { backgroundColor: COLORS.HEX_LIGHT_GRAY }]}>
            <TextComponent
              title
              size={22}
              color={COLORS.HEX_LIGHT_GRAY}
              text={
                user.name
                  ? user.name
                    .split(' ')
                  [user.name.split(' ').length - 1].substring(0, 1)
                  : ''
              }
            />
          </View>
        )}
        <TextComponent
          text={user.name ? user.name : user.email}
          title size={24}
          color={COLORS.BLACK}
          styles={{ fontFamily: FONTFAMILY.montserrat_medium }} />
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify='space-between'>
          <RowComponent justify='flex-start'>
            <TouchableOpacity style={{ paddingRight: 35 }}>
              <Clock size={24} color={COLORS.TEAL_GREEN} />
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 0.9 }}>
              <TextComponent text='History' font={FONTFAMILY.montserrat_bold} size={14} color={COLORS.HEX_LIGHT_GREY} />
            </TouchableOpacity>
          </RowComponent>
          <TouchableOpacity>
            <ArrowRight2 size={24} color={COLORS.HEX_LIGHT_GREY} />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify='space-between'>
          <RowComponent justify='flex-start'>
            <TouchableOpacity style={{ paddingRight: 35 }}>
              <Location size={24} color={COLORS.TEAL_GREEN} />
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 0.9 }}>
              <TextComponent text='Address' font={FONTFAMILY.montserrat_bold} size={14} color={COLORS.HEX_LIGHT_GREY} />
            </TouchableOpacity>
          </RowComponent>
          <TouchableOpacity>
            <ArrowRight2 size={24} color={COLORS.HEX_LIGHT_GREY} />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify='space-between'>
          <RowComponent justify='flex-start'>
            <TouchableOpacity style={{ paddingRight: 35 }}>
              <MessageQuestion size={24} color={COLORS.TEAL_GREEN} />
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 0.9 }}>
              <TextComponent text='Help' font={FONTFAMILY.montserrat_bold} size={14} color={COLORS.HEX_LIGHT_GREY} />
            </TouchableOpacity>
          </RowComponent>
          <TouchableOpacity>
            <ArrowRight2 size={24} color={COLORS.HEX_LIGHT_GREY} />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify='space-between'>
          <RowComponent justify='flex-start'>
            <TouchableOpacity style={{ paddingRight: 35 }}>
              <Setting2 size={24} color={COLORS.TEAL_GREEN} />
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 0.9 }}>
              <TextComponent text='Setting' font={FONTFAMILY.montserrat_bold} size={14} color={COLORS.HEX_LIGHT_GREY} />
            </TouchableOpacity>
          </RowComponent>
          <TouchableOpacity>
            <ArrowRight2 size={24} color={COLORS.HEX_LIGHT_GREY} />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <RowComponent justify='space-between'>
          <RowComponent justify='flex-start'>
            <TouchableOpacity style={{ paddingRight: 35 }}>
              <LogoutCurve size={24} color={COLORS.TEAL_GREEN} />
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 0.9 }} onPress={handleLogout}>
              <TextComponent text='Sign Out' font={FONTFAMILY.montserrat_bold} size={14} color={COLORS.HEX_LIGHT_GREY} />
            </TouchableOpacity>
          </RowComponent>
          <TouchableOpacity>
            <ArrowRight2 size={24} color={COLORS.HEX_LIGHT_GREY} />
          </TouchableOpacity>
        </RowComponent>
      </SectionComponent>
      <ReactNativeModal
        isVisible={isModalVisible}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        style={{ marginHorizontal: 10, justifyContent: 'center' }}
      >
        <View style={{ borderRadius: 10, padding: 20, backgroundColor: COLORS.WHITE }}>
          <TextComponent text='Are you sure you want to sign out?' color={COLORS.TEAL_GREEN} size={15} />
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 40 }}>
            <TouchableOpacity
              style={{
                marginRight: 30,
                borderWidth: 1,
                backgroundColor: COLORS.LIGHT,
                padding: 8,
                borderRadius: 10,
                width: 70,
                borderColor: COLORS.LIGHT
              }}
              onPress={closeModal}>
              <TextComponent text='No' color={COLORS.HEX_LIGHT_GREY} styles={{ textAlign: 'center' }} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginRight: 10,
                borderWidth: 1,
                backgroundColor: COLORS.TEAL_GREEN,
                padding: 8,
                borderRadius: 10,
                width: 70,
                borderColor: COLORS.TEAL_GREEN
              }}
              onPress={handleSignOut}>
              <TextComponent text='Yes' color={COLORS.WHITE} styles={{ textAlign: 'center' }} />
            </TouchableOpacity>
          </View>
        </View>
      </ReactNativeModal>
    </ContainerComponent>
  )
}

export default ProFileScreen

const styles = StyleSheet.create({
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 30,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

})