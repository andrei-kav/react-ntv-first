import {Pressable, Text, View, StyleSheet, StyleProp, ViewStyle, TextStyle} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
    label: string;
    onPress: () => void;
    theme?: 'primary';
}

export default function Button({ label, theme, onPress }: Props) {
    const viewStyles: StyleProp<ViewStyle> = [styles.buttonContainer]
    const btnStyles: StyleProp<ViewStyle> = [styles.button]
    const textStyles: StyleProp<TextStyle> = [styles.buttonLabel]

    if (theme === 'primary') {
        viewStyles.push(styles.primaryBtnContainer)
        btnStyles.push(styles.primaryBtn)
        textStyles.push(styles.primaryBtnLabel)
    }

    return (
        <View style={viewStyles}>
            <Pressable style={btnStyles} onPress={onPress}>
                {
                    theme === 'primary' && <FontAwesome name="picture-o" size={18} color="#25292e" style={{ paddingRight: 8 }} />
                }
                <Text style={textStyles}>{label}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: 320,
        height: 68,
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
    },
    primaryBtnContainer: {
        borderWidth: 4,
        borderColor: '#ffd33d',
        borderRadius: 18
    },
    button: {
        borderRadius: 10,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    primaryBtn: {
        backgroundColor: '#fff'
    },
    buttonLabel: {
        color: '#fff',
        fontSize: 16,
    },
    primaryBtnLabel: {
        color: '#25292e'
    },
});
