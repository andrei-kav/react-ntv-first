import { View } from 'react-native';
import { Image, ImageSource } from 'expo-image';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import transform from '@/node_modules/ajv-keywords/src/keywords/transform';
import {DefaultStyle} from '@/node_modules/react-native-reanimated/lib/typescript/reanimated2/hook/commonTypes';

type Props = {
    imageSize: number;
    stickerSource: ImageSource;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
    // useSharedValue() helps to mutate data and runs animations based on the current value
    // we can access and modify the shared value using the .value property
    const scaleImage = useSharedValue(imageSize);
    const translateX = useSharedValue(0);
    const translateY = useSharedValue(0);

    // useAnimatedStyle() hook helps us to update styles using shared values when the animation happens
    const imageStyle = useAnimatedStyle(() => {
        return {
            width: withSpring(scaleImage.value),
            height: withSpring(scaleImage.value),
        };
    });
    const containerStyle = useAnimatedStyle<Record<'transform', Array<Record<'translateX', number> | Record<'translateY', number>>> & DefaultStyle>(() => {
        return {
            transform: [
                {
                    translateX: translateX.value,
                },
                {
                    translateY: translateY.value,
                },
            ],
        };
    });

    const drag = Gesture.Pan()
        .onChange(event => {
            translateX.value += event.changeX;
            translateY.value += event.changeY;
        });

    // to handle double click
    const doubleTap = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            if (scaleImage.value !== imageSize * 2) {
                scaleImage.value = scaleImage.value * 2;
            } else {
                scaleImage.value = Math.round(scaleImage.value / 2);
            }
        });

    return (
        <GestureDetector gesture={drag}>
            <Animated.View style={[containerStyle, { top: -350 }]}>
                <GestureDetector gesture={doubleTap}>
                    <Animated.Image source={stickerSource}
                                    style={imageStyle}
                                    resizeMode="contain"
                    />
                </GestureDetector>
            </Animated.View>
        </GestureDetector>
    );
}
