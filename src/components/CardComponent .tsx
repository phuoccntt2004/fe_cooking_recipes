import React, { useEffect, useState } from 'react';
import { Image, StyleProp, TouchableOpacity, View, ViewStyle, Dimensions } from 'react-native';
import COLORS from '../assets/colors/Colors';
import TextComponent from './TextComponent';
import { Heart } from 'iconsax-react-native';
import { globalStyle } from '../styles/globalStyle';
import { FONTFAMILY } from '../../assets/fonts';
import favouriteAPI from '../apis/favouriteAPI';
import { useSelector } from 'react-redux';
import { authSelector } from '../redux/reducers/authReducer';

interface Props {
    dataCookingRecipes: any,
    nameCate?: string,
    styles?: StyleProp<ViewStyle>,
    onPress?: () => void
}

const CardComponent = (props: Props) => {
    const { dataCookingRecipes, nameCate, styles, onPress } = props;
    const cardWidth = (Dimensions.get('window').width / 2) - 24;
    const [selectedFavourite, setSelectedFavourite] = useState(true);
    const user = useSelector(authSelector);
    useEffect(() => {
        const getFavourite = async () => {
            try {
                const response: any = await favouriteAPI.HandleFavourite(
                    `/get-favourite-by-id?idUser=${user.id}&idMeal=${dataCookingRecipes?.idMeal}`,
                );
                if (response && response.idMeal === dataCookingRecipes?.idMeal) {
                    setSelectedFavourite(false);
                }

            } catch (error) {
                console.log('Lỗi get API Favourite', error);
            }
        };
        if (dataCookingRecipes) {
            getFavourite()
        }
    }, [selectedFavourite]);
    const handleFavourite = async () => {
        setSelectedFavourite(!selectedFavourite);
        if (selectedFavourite) {
            try {
                await favouriteAPI.HandleFavourite(
                    '/add-favourite',
                    {
                        idUser: user.id,
                        idMeal: dataCookingRecipes?.idMeal,
                    },
                    'post',
                );
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                await favouriteAPI.HandleFavourite(
                    `/delete-favourite-by-id?idUser=${user.id}&idMeal=${dataCookingRecipes?.idMeal}`,
                    {},
                    'delete',
                );
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.9}
            style={[globalStyle.shadowCard,
            {
                width: cardWidth,
                height: 190,
                borderRadius: 16,
                borderColor: COLORS.HEX_LIGHT_GREY,
                backgroundColor: COLORS.WHITE, padding: 16,
                marginBottom: 16, borderWidth: 1
            }, styles]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 }}>
                <TouchableOpacity activeOpacity={0.7} style={{ paddingEnd: 10 }} onPress={handleFavourite}>
                    <Heart color={COLORS.RED} variant={!selectedFavourite ? 'Bold' : 'Linear'}/>
                </TouchableOpacity>
                <Image
                    src={dataCookingRecipes?.strMealThumb ?? 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg'}
                    style={{ width: 100, height: 80, borderRadius: 8 }}
                />
            </View>
            <TextComponent
                text={nameCate ?? dataCookingRecipes?.strCategory}
                color={COLORS.TEAL_GREEN}
                font={FONTFAMILY.montserrat_bold}
                size={16}
                styles={{ marginBottom: 4 }}
            />
            <TextComponent
                text={dataCookingRecipes?.strMeal}
                color={COLORS.BLACK}
                font={FONTFAMILY.montserrat_regular}
                size={14}
                styles={{ marginBottom: 12 }}
                numberOfLines={2}
            />
        </TouchableOpacity>
    );
};

export default CardComponent;
