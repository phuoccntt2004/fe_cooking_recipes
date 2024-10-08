import { ArrowLeft2 } from 'iconsax-react-native';
import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { FONTFAMILY } from '../../../assets/fonts';
import favouriteAPI from '../../apis/favouriteAPI';
import getThirdPartyAPI from '../../apis/getThirdPartyAPI';
import COLORS from '../../assets/colors/Colors';
import {
  CardComponent,
  ContainerComponent,
  RowComponent,
  SectionComponent,
  TextComponent,
} from '../../components';
import { authSelector } from '../../redux/reducers/authReducer';
import { hasteMapCacheDirectory } from '../../../metro.config';

const FavouriteScreen = ({ navigation }: any) => {
  const user = useSelector(authSelector);

  const [dataFavourite, setDataFavourite] = useState<any>([])
  const [dataDetailsFavourite, setDataDetailsFavourite] = useState<any>([])
  useEffect(() => {
    const getAllFavouriteById = async () => {
      try {
        const response: any = await favouriteAPI.HandleFavourite(`/get-favourite?idUser=${user.id}`)
        setDataFavourite(response)
        let allFavourite: any[] = []
        for (const favourite of dataFavourite) {
          const responseData: any = await getThirdPartyAPI.HandleGetThirdPartyAPI(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${favourite?.idMeal}`)
          const detailsFavourite = responseData?.meals.map((meal: any) => ({
            ...meal
          }))
          allFavourite = [...allFavourite, ...detailsFavourite]
        }
        setDataDetailsFavourite(allFavourite)
      } catch (error) {
        console.log('Lỗi get api favourite', error);

      }
    }
    getAllFavouriteById()
  }, [dataDetailsFavourite])

  const HandleDetailCookingRecipes = (item: any) => {
    navigation.navigate('DetailCookingRecipes', { data: item })
  }

  return (
    <ContainerComponent>
      <SectionComponent styles={{ marginTop: 40 }}>
        <RowComponent justify='space-between'>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2 size={24} color={COLORS.BLACK} />
          </TouchableOpacity>
          <TextComponent
            text="Favourite"
            color={COLORS.BLACK}
            size={25}
            font={FONTFAMILY.montserrat_medium} />
          <View></View>
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 900 }}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          data={dataDetailsFavourite}
          keyExtractor={item => item.idMeal}
          renderItem={({ item }) => (
            <CardComponent
              onPress={() => HandleDetailCookingRecipes(item)}
              dataCookingRecipes={item}
            />
          )}
        />
      </SectionComponent>
    </ContainerComponent>
  );
};

export default FavouriteScreen;