import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export enum Routes {
  Home = 'home',
  Detail = 'detail',
  Bookmarked = 'bookmarked',
}

export type RootStackParamList = {
  [Routes.Home]: undefined;
  [Routes.Bookmarked]: undefined;
  [Routes.Detail]: {
    id: number;
  };
};

export type RootStackComponent<RouteName extends keyof RootStackParamList> =
  React.FC<{
    navigation: NativeStackNavigationProp<RootStackParamList, RouteName>;
    route: RouteProp<RootStackParamList, RouteName>;
  }>;
