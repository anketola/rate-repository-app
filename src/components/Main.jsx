import { StyleSheet, View } from 'react-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from './SignIn';
import { Route, Routes, Navigate } from 'react-router-native';
import SingleRepository from './SingleRepository';
import AddReview from './AddReview';
import SignUp from './SignUp';
import MyReviews from './MyReviews';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes> 
        <Route path="/" element={<RepositoryList />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/addreview" element={<AddReview />} />
        <Route path="/myreviews" element={<MyReviews />} />
        <Route path="/repository/:id" element={<SingleRepository singleView={true} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </View>
  );
};

export default Main;