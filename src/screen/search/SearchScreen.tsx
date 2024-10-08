import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import getThirdPartyAPI from '../../apis/getThirdPartyAPI';
import { CardComponent, ContainerComponent, InputComponent, RowComponent, SectionComponent, TextComponent } from '../../components';
import COLORS from '../../assets/colors/Colors';
import { FONTFAMILY } from '../../../assets/fonts';
import { ArrowCircleLeft2, SearchNormal1 } from 'iconsax-react-native';

const SearchScreen = ({navigation}: any) => {

    const [search, setSearch] = useState('');
    const [allCookingRecipes, setAllCookingRecipes] = useState<any>([]);
    useEffect(() => {
        const getAllCookingRecipes = async () => {
            try {
                const response: any = await getThirdPartyAPI.HandleGetThirdPartyAPI(
                    `https://www.themealdb.com/api/json/v1/1/categories.php`,
                );
                const categories = response?.categories
                let allMeals: any[] = [];
                for (const category of categories) {
                    const cookingRecipesByCategories: any = await getThirdPartyAPI.HandleGetThirdPartyAPI(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category?.strCategory}`)
                    const mealsWithCategory = cookingRecipesByCategories?.meals?.map((meal: any) => ({
                        ...meal,
                        strCategory: category?.strCategory,
                    }))
                    allMeals = [...allMeals, ...mealsWithCategory]
                }
                setAllCookingRecipes(allMeals)

            } catch (error) {
                console.log(error);
            }

        };
        getAllCookingRecipes();
    }, []);

    const [filteredData, setFilteredData] = useState<any>(
        allCookingRecipes,
    );

    const handleSearchQuery = (val: string) => {
        setSearch(val);
        const filterDataCookingRecipes = allCookingRecipes?.filter(
            (data: any) => {
                console.log('data', data.strMeal);

                return data.strMeal.toLowerCase().startsWith(val.toLowerCase())
            },
        );
        setFilteredData(filterDataCookingRecipes)
    };

    const HandleDetailCookingRecipes = (item : any) => {
        navigation.navigate('DetailCookingRecipes', {data:item})
    }

    return (
        <ContainerComponent>
            <SectionComponent styles={{ marginTop: 40 }}>
                <RowComponent justify="space-between">
                    <TextComponent
                        text={`Today's Fresh Recipe`}
                        title
                        size={18}
                        color={COLORS.TEAL_GREEN}
                        styles={{ fontFamily: FONTFAMILY.montserrat_bold }}
                    />
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <ArrowCircleLeft2 color={COLORS.TEAL_GREEN} size={25} />
                    </TouchableOpacity>
                </RowComponent>
            </SectionComponent>
            <SectionComponent>
                <InputComponent
                    placeholder="Search"
                    value={search}
                    onChange={handleSearchQuery}
                    suffix={<SearchNormal1 color={COLORS.HEX_LIGHT_GRAY} />}
                />
            </SectionComponent>
            <SectionComponent>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 900 }}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    data={filteredData}
                    keyExtractor={item => item.idMeal}
                    renderItem={({ item }) => (
                        <CardComponent
                            dataCookingRecipes={item}
                            onPress={() => HandleDetailCookingRecipes(item)}
                        />
                    )}
                />
            </SectionComponent>
        </ContainerComponent>
    );
};


export default SearchScreen;