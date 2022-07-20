import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { useTranslation } from '../assets/dictionary';
import { BookmarkedPage } from '../components/pages/Bookmarked';
import { DetailPage } from '../components/pages/Detail';
import { HomePage } from '../components/pages/Home';
import { RootState } from '../store';
import { Routes } from './types';

const RootStackNavigator = createNativeStackNavigator();

export function RootStack() {
  const { t } = useTranslation();

  const { isInit } = useSelector((state: RootState) => state.app);
  if (!isInit) return <></>;

  return (
    <RootStackNavigator.Navigator>
      <RootStackNavigator.Screen
        name={Routes.Home}
        component={HomePage}
        options={{
          title: t('Rick and Morty'),
        }}
      />
      <RootStackNavigator.Screen
        name={Routes.Bookmarked}
        component={BookmarkedPage}
        options={{
          title: t('Bookmarked Items'),
        }}
      />
      <RootStackNavigator.Screen name={Routes.Detail} component={DetailPage} />
    </RootStackNavigator.Navigator>
  );
}
