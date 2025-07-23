import Toast from 'react-native-toast-message';
import Routes from './src/routes/Index';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Text strings must be rendered within a <Text> component',
]);

export default function App() {
  return (
    <>
      return <Routes />;
      <Toast />
    </>
  );
}