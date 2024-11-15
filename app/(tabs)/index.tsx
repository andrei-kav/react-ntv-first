import { useState, useRef } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImageSource } from "expo-image";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as MediaLibrary from 'expo-media-library';
import { captureRef } from 'react-native-view-shot';

import ImageViewer from '@/components/ImageViewer';
import Button from '@/components/Button';
import CircleButton from '@/components/CircleButton';
import IconButton from '@/components/IconButton';
import EmojiPicker from '@/components/EmojiPicker';
import EmojiList from '@/components/EmojiList';
import EmojiSticker from '@/components/EmojiSticker';

const PlaceholderImage = require('@/assets/images/background-image.png');

export default function Index() {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);
    const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(undefined);

    // When the app loads for the first time and the permission status is neither granted nor denied, the value of the status is null.
    // When asked for permission, a user can either grant the permission or deny it.
    // After getting the access, the value of the status changes to granted.
    const [status, requestPermission] = MediaLibrary.usePermissions();

    const imageRef = useRef<View | null>(null);

    const imageSource: ImageSource = selectedImage ? { uri: selectedImage } : PlaceholderImage

    if (status === null) {
        requestPermission();
    }

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        })

        if (!result.canceled) {
            console.log(result)
            setSelectedImage(result.assets[0].uri)
            setShowAppOptions(true)
        } else {
            alert('You did not select any image.')
        }
    }

    const onReset = () => {
        setShowAppOptions(false)
    }

    const onAddSticker = () => {
        setIsModalVisible(true)
    }

    const onSaveImageAsync = async () => {
        try {
            // take a screenshot
            // the screenshot area will be restricted by the <View ref={imageRef} collapsable={false}> component
            const localUri = await captureRef(imageRef, {
                height: 440,
                quality: 1,
            });

            // save a screenshot to device media library
            await MediaLibrary.saveToLibraryAsync(localUri);
            if (localUri) {
                alert('Saved!');
            }
        } catch (e) {
            console.log(e);
        }
    }

    const onModalClose = () => {
        setIsModalVisible(false)
    }

    return (
        <GestureHandlerRootView style={styles.container}>
            <View style={styles.imageContainer}>
                <View ref={imageRef} collapsable={false}>
                    <ImageViewer imgSource={imageSource} />
                    { pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} /> }
                </View>
            </View>
            {
                showAppOptions
                    ? <View style={styles.optionsContainer}>
                        <View style={styles.optionsRow}>
                            <IconButton icon="refresh" label="Reset" onPress={onReset} />
                            <CircleButton onPress={onAddSticker} />
                            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
                        </View>
                    </View>
                    : <View style={styles.footerContainer}>
                        <Button label="Choose a photo" theme="primary" onPress={pickImageAsync}/>
                        <Button label="Use this photo" onPress={() => setShowAppOptions(true)}/>
                    </View>
            }
            <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
                <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
            </EmojiPicker>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
    },
    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        width: 320,
        height: 440,
        borderRadius: 18,
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center',
    },
    optionsContainer: {
        position: 'absolute',
        bottom: 80,
    },
    optionsRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
});
