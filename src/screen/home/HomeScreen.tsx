import { View, Text, Image, StyleSheet, Platform, StatusBar, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { authSelector } from '../../redux/reducers/authReducer'
import { CardComponent, CategoriesList, ContainerComponent, RowComponent, SectionComponent, TextComponent } from '../../components'
import COLORS from '../../assets/colors/Colors'
import { SearchNormal1 } from 'iconsax-react-native'
import { FONTFAMILY } from '../../../assets/fonts'
import IMAGES from '../../assets/images/Images'
import getThirdPartyAPI from '../../apis/getThirdPartyAPI'

const HomeScreen = ({ navigation }: any) => {

    const user = useSelector(authSelector);
    const [categories, setCategories] = useState<any>([]);
    const [nameCategories, setNameCategories] = useState<string>('');
    const [cookingRecipes, setCookingRecipes] = useState<any>([]);

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await getThirdPartyAPI.HandleGetThirdPartyAPI('https://www.themealdb.com/api/json/v1/1/categories.php')
                setCategories(response)
            } catch (error) {
                console.log(error);

            }
        }
        getCategories()
    }, [])

    const HandleGetNameCategories = (data: string) => {
        setNameCategories(data);
    };
    useEffect(() => {
        const getCategoriesByName = async (dataName: string) => {
            try {
                const response = await getThirdPartyAPI.HandleGetThirdPartyAPI(
                    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${dataName}`,
                );
                setCookingRecipes(response);

            } catch (error) {
                console.log(error);
            }
        };
        if (nameCategories) {
            
            getCategoriesByName(nameCategories);
        }
    }, [user, nameCategories]);

    const HandleDetailCookingRecipes = (item: any) => {
        navigation.navigate('DetailCookingRecipes', { data: item })
    }

    return (
        <ContainerComponent>
            <SectionComponent styles={{ marginTop: 40 }}>
                <RowComponent justify='space-between'>
                    <RowComponent>
                        <TextComponent
                            text="Hi, "
                            size={18}
                            color={COLORS.BLACK}
                            title
                            styles={{ fontFamily: FONTFAMILY.montserrat_bold }} />
                        <TextComponent
                            text={user.name ? user.name : user.email}
                            title size={18}
                            color={COLORS.TEAL_GREEN}
                            styles={{ fontFamily: FONTFAMILY.montserrat_bold }} />
                    </RowComponent>
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
                                    user.name ? user.name.split(' ')[user.name.split(' ').length - 1].substring(0, 1) : ''
                                }
                            />
                        </View>
                    )}
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <RowComponent justify='space-between'>
                    <TextComponent
                        text={`What would you like \nto cook today?`}
                        color={COLORS.TEAL_GREEN}
                        size={24}
                        styles={{ fontFamily: FONTFAMILY.montserrat_bold }} />
                    <View style={{ padding: 10, borderColor: COLORS.TEAL_GREEN, borderRadius: 16, borderWidth: 1 }}>
                        <TouchableOpacity onPress={() => { navigation.navigate('Tìm Kiếm') }}>
                            <SearchNormal1 color={COLORS.HEX_LIGHT_GREY} size={25} />
                        </TouchableOpacity>
                    </View>
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <RowComponent styles={{ alignItems: 'center' }}>
                    <Image source={IMAGES.Categories} style={{ marginRight: 5 }} />
                    <TextComponent text='Categories' size={16} color={COLORS.BLACK} styles={{ fontFamily: FONTFAMILY.montserrat_medium }} />
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <CategoriesList dataCategories={categories.categories} onDataCategories={HandleGetNameCategories} />
            </SectionComponent>
            <SectionComponent>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 999 }}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    data={cookingRecipes?.meals}
                    keyExtractor={item => item.idMeal}
                    renderItem={({ item }) => (
                        <CardComponent
                            onPress={() => HandleDetailCookingRecipes(item)}
                            dataCookingRecipes={item}
                            nameCate={nameCategories}
                        />
                    )}
                />
            </SectionComponent>
        </ContainerComponent>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        paddingVertical: Platform.OS === 'android' ? StatusBar.currentHeight : 48,
    },

    avatar: {
        width: 50,
        height: 50,
        borderRadius: 100,
        marginBottom: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },

})