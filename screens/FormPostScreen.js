import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { ScrollView } from 'react-native'
import HeaderComponent from '../components/HeaderComponent'
import FooterComponent from '../components/FooterComponent'
import { TextInput } from 'react-native'
import { ChevronDownIcon, PlusCircleIcon, XCircleIcon } from 'react-native-heroicons/outline'
import { Button } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import { StyleSheet } from 'react-native'
import { KeyboardAvoidingView } from 'react-native'
import { postFoodNew, upLoadPostImg } from '../api/apiRecipe'
import { getCategories } from '../api/apiCategory'

const FormPostScreen = () => {
    const [image, setImage] = useState(null);
    const [post, setPost] = useState({})
    const [img, setImg] = useState(null);

    const [inputMainFood, setInputMainFood] = useState(false)
    const [mainFood, setMainFood] = useState([])
    const [main, setMain] = useState("")

    const [inputBranchFood, setInputBranchFood] = useState(false)
    const [branchFood, setBranchFood] = useState([])
    const [branch, setBranch] = useState("")

    const [inputGuide, setInputGuide] = useState(false)
    const [guideFood, setGuideFood] = useState([])
    const [guide, setGuide] = useState("")

    const [isLoanding, setLoanding] = useState(false);
    const [categories, setCategoies] = useState([])
    const [category, setCategory] = useState([])



    useEffect(() => {
        getCategories().then(
            res => {
                console.log(res.data);
                setCategoies(res.data);
                let cate = []
                res?.data?.map((item) => {
                    cate.push(item.name)
                })
                setCategory(cate)
            }
        )

    }, [])



    const handleAddMainFood = () => {
        console.log(main)
        if (main !== "") {
            setMainFood([...mainFood, main])
            setInputMainFood(false)
        }
    }

    const removeMainFood = (index) => {
        const newMainFood = mainFood.filter((_, i) => i !== index);
        console.log(newMainFood)
        setMainFood(newMainFood);
    }

    const foodMain = mainFood.map((food, index) => {
        return (
            <View className=" flex-row p-3 items-center bg-gray-100 mr-3 mb-3 rounded-xl">
                <Text className="mr-2" >{food}</Text>
                <TouchableOpacity
                    onPress={() => removeMainFood(index)}
                >
                    <XCircleIcon color="black" />
                </TouchableOpacity>
            </View>
        )
    })


    const handleAddBranchFood = () => {
        if (branch !== "") {
            setBranchFood([...branchFood, branch])
            setInputBranchFood(false)
        }
    }
    const removeBranchFood = (index) => {
        const newBranchFood = branchFood.filter((_, i) => i !== index);
        console.log(newBranchFood)
        setBranchFood(newBranchFood);
    }

    const foodBranch = branchFood.map((food, index) => {
        return (
            <View className=" flex-row p-3 items-center bg-gray-100 mr-3 mb-3 rounded-xl">
                <Text className="mr-2" >{food}</Text>
                <TouchableOpacity
                    onPress={() => removeBranchFood(index)}
                >
                    <XCircleIcon color="black" />
                </TouchableOpacity>
            </View>
        )
    })


    const handleAddGuideFood = () => {
        if (guide !== "") {
            setGuideFood([...guideFood, guide])
            setInputGuide(false)
        }
    }

    const removeGuide = (index) => {
        const newGuideFood = guideFood.filter((_, i) => i !== index);
        console.log(newGuideFood)
        setGuideFood(newGuideFood);
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.canceled) {
            setImage(result.assets[0].uri);
            handleSubmit(result.assets[0].uri)
        }
    };

    const handleSubmit = async (uri) => {
        if (uri != null) {
            let filename = uri.split('/').pop();
            let match = /\.(\w+)$/.exec(filename);
            let type = match ? `image/${match[1]}` : `image`;
            const dataForm = new FormData();
            dataForm.append('file', { uri: uri, name: filename, type });
            setLoanding(true)
            try {
                const response = await upLoadPostImg(dataForm)
                const data = await response.json();
                setImg(data?.data)
                setLoanding(false)
                // alert("Tải ảnh thành công.")
            } catch (error) {
                setLoanding(false)
                setImage(null)
                alert("Tải ảnh không thành công.")
                console.error(error);
            }
        } else {
            alert('Please Select File first');
        }
    }

    const handleSubmitPost = async () => {

        const body = {
            categoryId: post.categoryId,
            content: post.content,
            img: img,
            timeCooking: post.timeCooking,
            description: post.description,
            mainFood: mainFood,
            subFood: branchFood,
            guideCooking: guideFood
        }
        setLoanding(true)
        try {
            setLoanding(false)
            await postFoodNew(body)
            // const data = await res.data
            // console.log(data);
            setPost({})
            setImage(null)
            setMainFood([])
            setBranchFood([])
            setGuideFood([])
            alert("Đăng bài thành công")
        } catch {
            setLoanding(false)
            alert("Đăng bài không thành công")
        }

    }

    const guides = guideFood.map((food, index) => {
        return (
            <View className=" flex-row gap-1 p-3 justify-between items-start bg-gray-100 mr-3 mb-3 rounded-xl">
                <View className="flex-row">
                    <View
                        className="mr-3 bg-yellow-400 px-2 py-1 rounded-full"
                    >
                        <Text >{index + 1}</Text>
                    </View>
                    <Text >{food}</Text>
                </View>
                <TouchableOpacity

                    onPress={() => removeGuide(index)}
                >
                    <XCircleIcon color="black" />
                </TouchableOpacity>
            </View>
        )
    })

    return (

        <SafeAreaView className="flex-1 bg-white" >
            {
                isLoanding &&
                <View
                    className="flex-1 bg-[#ffffffa1] justify-center"
                    style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 100 }}>
                    <ActivityIndicator size="large" color='hsl(210,95%,69%)'
                    />
                </View>
            }

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={20}
                className="flex-1"
            >

                <ScrollView
                    className="flex-1"
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                    <HeaderComponent />

                    <View className="bg-white p-3 mx-3">
                        <View className="mb-5 mt-4">
                            <Text className="mb-3">Tên món ăn:</Text>
                            <TextInput
                                placeholder='Tên món ăn...'
                                className="py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl "
                                value={post?.content}
                                onChangeText={text => setPost({ ...post, content: text })}

                            />

                        </View>
                        {/* thieu */}
                        <View className="mb-5" >
                            <Text className="flex">Ảnh món ăn:

                                <TouchableOpacity
                                    className="h-4 pl-4"
                                    onPress={pickImage}
                                >
                                    <PlusCircleIcon size="22" color="black" />
                                </TouchableOpacity>
                            </Text>
                            {image && <Image className="mt-5 mx-auto" source={{ uri: image }} style={{ width: 200, height: 200 }} />}

                        </View>

                        <View className="mb-5">
                            <Text className="mb-3">Thời gian thực hiện:</Text>
                            <TextInput placeholder='...giờ...phút'
                                value={post?.timeCooking}
                                className="py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl"
                                onChangeText={text => setPost({ ...post, timeCooking: text })}

                            />
                        </View>
                        <View className="mb-5">
                            <TextInput
                                placeholder='Mô tả món ăn...'
                                multiline={true}
                                numberOfLines={10}
                                value={post?.description}
                                style={{ height: 200, textAlignVertical: 'top', }}
                                className="py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl"
                                onChangeText={text => setPost({ ...post, description: text })}

                            />
                        </View>
                        {/* thieu */}
                        <View className="mb-5">
                            <Text className="mb-3">Danh mục:</Text>
                            <SelectDropdown
                                data={category}
                                onSelect={(selectedItem, index) => {
                                    setPost({ ...post, categoryId: categories[index].id }),
                                        console.log(categories[index].id);

                                }}
                                buttonStyle={styles.dropdown1BtnStyle}
                                buttonTextStyle={styles.dropdown1BtnTxtStyle}
                                rowStyle={styles.dropdown1RowStyle}
                                rowTextStyle={styles.dropdown1RowTxtStyle}
                                defaultButtonText={'--Lựa chọn danh mục--'}
                                renderDropdownIcon={() => {
                                    return <ChevronDownIcon color="black" />
                                }}
                            >

                            </SelectDropdown>
                        </View>
                        <View className="mb-5 flex-row justify-between" >
                            <Text>Thành phần chính:

                            </Text>
                            <TouchableOpacity
                                onPress={() => setInputMainFood(true)}
                            >
                                <PlusCircleIcon size="22" color="black" />
                            </TouchableOpacity>

                        </View>
                        <View className="flex-row flex-wrap">
                            {foodMain}
                        </View>

                        <View className="mb-5 flex-row justify-between" >
                            <Text>Thành phần phụ:

                            </Text>
                            <TouchableOpacity
                                onPress={() => setInputBranchFood(true)}
                            >
                                <PlusCircleIcon size="22" color="black" />
                            </TouchableOpacity>


                        </View>
                        <View className="flex-row flex-wrap">
                            {foodBranch}
                        </View>
                        <View className="mb-5 flex-row justify-between" >
                            <Text >Hướng dẫn nấu:

                            </Text>
                            <TouchableOpacity
                                onPress={() => setInputGuide(true)}
                            >
                                <PlusCircleIcon size="22" color="black" />
                            </TouchableOpacity>

                        </View>
                        <View>
                            {guides}
                        </View>

                        <TouchableOpacity
                            className="py-3 mt-5 bg-yellow-400 rounded-xl"
                            onPress={handleSubmitPost}
                        >
                            <Text className="text-xl font-bold text-center text-gray-700">
                                Đăng bài
                            </Text>
                        </TouchableOpacity>


                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
            {
                inputMainFood &&
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ position: 'absolute', width: '100%', zIndex: 100, height: '120%' }}
                >
                    <TouchableOpacity
                        onPress={() => setInputMainFood(false)}
                        className="flex-1 bg-[#5a5a5ada] justify-center"
                    >
                        <View
                            className='p-7 mx-5 bg-white rounded-md'
                        >
                            <Text className="mb-3 font-medium">Nhập tên thành phần chính</Text>
                            <TextInput
                                className="py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl"
                                onChangeText={text => setMain(text)}

                            />
                            <TouchableOpacity
                                className="py-3 mt-5 bg-yellow-400 rounded-xl"
                                onPress={handleAddMainFood}
                            >
                                <Text className="text-xl font-bold text-center text-gray-700">
                                    Thêm
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </TouchableOpacity>

                </KeyboardAvoidingView>


            }


            {
                inputBranchFood &&
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ position: 'absolute', width: '100%', zIndex: 100, height: '120%' }}
                >
                    <TouchableOpacity
                        onPress={() => setInputMainFood(false)}
                        className="flex-1 bg-[#5a5a5ada] justify-center"
                    >
                        <View
                            className='p-7 mx-5 bg-white rounded-md'
                        >
                            <Text className="mb-3 font-medium">Nhập tên thành phần phụ</Text>
                            <TextInput
                                className="py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl"
                                onChangeText={text => setBranch(text)}

                            />
                            <TouchableOpacity
                                className="py-3 mt-5 bg-yellow-400 rounded-xl"
                                onPress={handleAddBranchFood}
                            >
                                <Text className="text-xl font-bold text-center text-gray-700">
                                    Thêm
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </TouchableOpacity>

                </KeyboardAvoidingView>
            }


            {
                inputGuide &&
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{ position: 'absolute', width: '100%', zIndex: 100, height: '120%' }}
                >
                    <TouchableOpacity
                        onPress={() => setInputGuide(false)}
                        className="flex-1 bg-[#5a5a5ada] justify-center"
                    >
                        <View
                            className='p-7 mx-5 bg-white rounded-md'
                        >
                            <Text className="mb-3 font-medium">Nhập hướng dẫn nấu</Text>
                            <TextInput
                                className="py-4 px-4 bg-gray-100 text-gray-700 rounded-2xl"
                                onChangeText={text => setGuide(text)}

                            />
                            <TouchableOpacity
                                className="py-3 mt-5 bg-yellow-400 rounded-xl"
                                onPress={handleAddGuideFood}
                            >
                                <Text className="text-xl font-bold text-center text-gray-700">
                                    Thêm
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </TouchableOpacity>

                </KeyboardAvoidingView>
            }



            <FooterComponent />

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    dropdown1BtnStyle: {
        width: '100%',
        height: 50,
        backgroundColor: 'rgb(243 244 246)',
        borderRadius: 16,
        marginTop: 5,
        marginBottom: 10
    },
    dropdown1BtnTxtStyle: { color: '#444', textAlign: 'left', fontSize: 14 },
    dropdown1RowTxtStyle: { color: '#444', textAlign: 'left', fontSize: 14 },
    dropdown1RowStyle: { backgroundColor: '#EFEFEF', borderBottomColor: '#C5C5C5' },
    item: {
        paddingTop: 15,
        paddingBottom: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#fff',
        borderBottomColor: 'rgb(221 221 221)'
    },
    select: {
        fontSize: 16,
        textAlign: 'center'
    }
})

export default FormPostScreen