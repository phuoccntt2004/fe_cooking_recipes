import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import getThirdPartyAPI from '../../../apis/getThirdPartyAPI';
import { ContainerComponent, RowComponent, SectionComponent, TextComponent } from '../../../components';
import { ArrowLeft2 } from 'iconsax-react-native';
import COLORS from '../../../assets/colors/Colors';
import { FONTFAMILY } from '../../../../assets/fonts';
import { globalStyle } from './../../../styles/globalStyle';

const DetailCookingRecipes = ({ navigation, route }: any) => {

    const { data } = route.params;
    const [recipeDetails, setRecipeDetails] = useState<any>([]);
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {
        const fetchRecipeDetails = async () => {
            try {
                const response: any = await getThirdPartyAPI.HandleGetThirdPartyAPI(
                    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${data.idMeal}`
                );
                setRecipeDetails(response.meals);

            } catch (error) {
                console.error('Failed to fetch recipe details:', error);
            }
        };
        fetchRecipeDetails();

    }, []);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <ContainerComponent isScroll>
            <SectionComponent styles={{ marginTop: 40 }}>
                <RowComponent justify='space-between'>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowLeft2 size={24} color={COLORS.BLACK} />
                    </TouchableOpacity>
                    <TextComponent
                        text="Detail Recipes"
                        color={COLORS.BLACK}
                        size={25}
                        font={FONTFAMILY.montserrat_medium} />
                    <View></View>
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <TextComponent
                    text={data.strMeal}
                    color={COLORS.TEAL_GREEN}
                    size={24}
                    styles={{ fontFamily: FONTFAMILY.montserrat_medium, marginBottom: 10 }} />
                <Image
                    source={{ uri: data.strMealThumb }}
                    style={{
                        width: '100%',
                        height: 200,
                        borderRadius: 8,
                    }}
                />
            </SectionComponent>
            <SectionComponent>
                <View style={[globalStyle.shadowCard, { padding: 10, borderRadius: 16 }]}>
                    <TextComponent
                        text='Instructions: '
                        color={COLORS.ORANGE_PEEL}
                        styles={{ fontFamily: FONTFAMILY.montserrat_medium }}
                        size={20} />
                    <TextComponent
                        text={recipeDetails[0]?.strInstructions}
                        color={COLORS.HEX_LIGHT_GREY}
                        size={15}
                        numberOfLines={isExpanded ? undefined : 3}
                        styles={{ fontFamily: FONTFAMILY.montserrat_regular }}
                    />
                    <TouchableOpacity
                        onPress={toggleExpand}
                        style={{ alignItems: 'flex-end' }}>
                        <TextComponent
                            text={isExpanded ? 'Show Less' : 'See More'}
                            color={COLORS.BLUE_PRIMARY}
                            size={15}
                            styles={{ fontFamily: FONTFAMILY.montserrat_medium }}
                        />
                    </TouchableOpacity>
                </View>
            </SectionComponent>
            <SectionComponent>
                <View style={[globalStyle.shadowCard, { padding: 10, borderRadius: 16 }]}>
                    <TextComponent
                        text='Ingredients: '
                        color={COLORS.ORANGE_PEEL}
                        styles={{ fontFamily: FONTFAMILY.montserrat_medium, marginBottom: 5 }}
                        size={20} />
                    <RowComponent justify='space-between'>
                        <TextComponent
                            text={recipeDetails[0]?.strIngredient1}
                            color={COLORS.HEX_LIGHT_GREY}
                            size={15}
                            styles={{ fontFamily: FONTFAMILY.montserrat_regular }} />
                        <TextComponent
                            text={recipeDetails[0]?.strMeasure1}
                            color={COLORS.HEX_LIGHT_GREY}
                            size={15}
                            styles={{ fontFamily: FONTFAMILY.montserrat_regular }} />
                    </RowComponent>
                    <RowComponent justify='space-between'>
                        <TextComponent
                            text={recipeDetails[0]?.strIngredient2}
                            color={COLORS.HEX_LIGHT_GREY}
                            size={15}
                            styles={{ fontFamily: FONTFAMILY.montserrat_regular }} />
                        <TextComponent
                            text={recipeDetails[0]?.strMeasure2}
                            color={COLORS.HEX_LIGHT_GREY}
                            size={15}
                            styles={{ fontFamily: FONTFAMILY.montserrat_regular }} />
                    </RowComponent>
                    <RowComponent justify='space-between'>
                        <TextComponent
                            text={recipeDetails[0]?.strIngredient3}
                            color={COLORS.HEX_LIGHT_GREY}
                            size={15}
                            styles={{ fontFamily: FONTFAMILY.montserrat_regular }} />
                        <TextComponent
                            text={recipeDetails[0]?.strMeasure3}
                            color={COLORS.HEX_LIGHT_GREY}
                            size={15}
                            styles={{ fontFamily: FONTFAMILY.montserrat_regular }} />
                    </RowComponent>
                    <RowComponent justify='space-between'>
                        <TextComponent
                            text={recipeDetails[0]?.strIngredient4}
                            color={COLORS.HEX_LIGHT_GREY}
                            size={15}
                            styles={{ fontFamily: FONTFAMILY.montserrat_regular }} />
                        <TextComponent
                            text={recipeDetails[0]?.strMeasure4}
                            color={COLORS.HEX_LIGHT_GREY}
                            size={15}
                            styles={{ fontFamily: FONTFAMILY.montserrat_regular }} />
                    </RowComponent>
                    <RowComponent justify='space-between'>
                        <TextComponent
                            text={recipeDetails[0]?.strIngredient5}
                            color={COLORS.HEX_LIGHT_GREY}
                            size={15}
                            styles={{ fontFamily: FONTFAMILY.montserrat_regular }} />
                        <TextComponent
                            text={recipeDetails[0]?.strMeasure5}
                            color={COLORS.HEX_LIGHT_GREY}
                            size={15}
                            styles={{ fontFamily: FONTFAMILY.montserrat_regular }} />
                    </RowComponent>
                    <RowComponent justify='space-between'>
                        <TextComponent
                            text={recipeDetails[0]?.strIngredient6}
                            color={COLORS.HEX_LIGHT_GREY}
                            size={15}
                            styles={{ fontFamily: FONTFAMILY.montserrat_regular }} />
                        <TextComponent
                            text={recipeDetails[0]?.strMeasure6}
                            color={COLORS.HEX_LIGHT_GREY}
                            size={15}
                            styles={{ fontFamily: FONTFAMILY.montserrat_regular }} />
                    </RowComponent>
                    <RowComponent justify='space-between'>
                        <TextComponent
                            text={recipeDetails[0]?.strIngredient7}
                            color={COLORS.HEX_LIGHT_GREY}
                            size={15}
                            styles={{ fontFamily: FONTFAMILY.montserrat_regular }} />
                        <TextComponent
                            text={recipeDetails[0]?.strMeasure7}
                            color={COLORS.HEX_LIGHT_GREY}
                            size={15}
                            styles={{ fontFamily: FONTFAMILY.montserrat_regular }} />
                    </RowComponent>
                    <RowComponent justify='space-between'>
                        <TextComponent
                            text={recipeDetails[0]?.strIngredient8}
                            color={COLORS.HEX_LIGHT_GREY}
                            size={15}
                            styles={{ fontFamily: FONTFAMILY.montserrat_regular }} />
                        <TextComponent
                            text={recipeDetails[0]?.strMeasure8}
                            color={COLORS.HEX_LIGHT_GREY}
                            size={15}
                            styles={{ fontFamily: FONTFAMILY.montserrat_regular }} />
                    </RowComponent>
                    <RowComponent justify='space-between'>
                        <TextComponent
                            text={recipeDetails[0]?.strIngredient9}
                            color={COLORS.HEX_LIGHT_GREY}
                            size={15}
                            styles={{ fontFamily: FONTFAMILY.montserrat_regular }} />
                        <TextComponent
                            text={recipeDetails[0]?.strMeasure9}
                            color={COLORS.HEX_LIGHT_GREY}
                            size={15}
                            styles={{ fontFamily: FONTFAMILY.montserrat_regular }} />
                    </RowComponent>
                    <RowComponent justify='space-between'>
                        <TextComponent
                            text={recipeDetails[0]?.strIngredient10}
                            color={COLORS.HEX_LIGHT_GREY}
                            size={15}
                            styles={{ fontFamily: FONTFAMILY.montserrat_regular }} />
                        <TextComponent
                            text={recipeDetails[0]?.strMeasure10}
                            color={COLORS.HEX_LIGHT_GREY}
                            size={15}
                            styles={{ fontFamily: FONTFAMILY.montserrat_regular }} />
                    </RowComponent>
                </View>
            </SectionComponent>
        </ContainerComponent>
    )
}

export default DetailCookingRecipes



