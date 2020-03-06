import { TextProps } from 'react-native';
declare type Props = TextProps & {
    tintColor?: string;
    children?: string;
};
export default function HeaderTitle({ tintColor, style, ...rest }: Props): JSX.Element;
export {};
