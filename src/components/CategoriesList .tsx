import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import COLORS from '../assets/colors/Colors';
import TextComponent from './TextComponent';
import { FONTFAMILY } from '../../assets/fonts';

interface Category {
    dataCategories:any
    onDataCategories: (data: string) => void;
}

const CategoriesList = (props:Category) => {
    const {dataCategories,onDataCategories}=props
    const [selectedCategory, setSelectedCategory] = useState<string>('Beef');
    useEffect(()=>{
        onDataCategories(selectedCategory)
    },[selectedCategory])
    

    const renderCategoryItem = ({ item }:any) => {
        const isSelected = item.strCategory === selectedCategory;
        return (
            <TouchableOpacity
                style={[styles.categoryItem, isSelected ? styles.selectedCategory : null]}
                onPress={() => setSelectedCategory(item.strCategory)}
            >
                <TextComponent 
                    text={item.strCategory}
                    color={isSelected ? COLORS.WHITE : COLORS.HEX_LIGHT_GREY } 
                    font={FONTFAMILY.montserrat_medium}/>
            </TouchableOpacity>
        );
    };

    return (
        <View>
            <FlatList
                data={dataCategories}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.idCategory}
                renderItem={renderCategoryItem}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    categoryItem: {
        padding: 10,
        marginRight: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.HEX_LIGHT_GREY,
    },
    selectedCategory: {
        backgroundColor: COLORS.TEAL_GREEN,
    },
});


export default CategoriesList;