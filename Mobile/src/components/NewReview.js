import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Modal, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import { useCanUserReviewQuery, useSubmitReviewMutation } from '../redux/api/productsApi';
import Toast from 'react-native-toast-message';

const NewReview = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [submitReview, { isLoading, error, isSuccess }] = useSubmitReviewMutation();
  const { data } = useCanUserReviewQuery(productId);

  const canReview = data?.canReview;

  useEffect(() => {
    if (error) {
      Toast.show({ type: 'error', text1: 'Error', text2: error?.data?.message || 'Failed to submit review.' });
    }
    if (isLoading) {
      Toast.show({ type: 'info', text1: 'Submitting...', text2: 'Please wait while we submit your review.' });
    }
    if (isSuccess) {
      Toast.show({ type: 'success', text1: 'Success', text2: 'Your review has been posted!' });
      setModalVisible(false); // Close modal on success
      setRating(0);
      setComment('');
    }
  }, [error, isLoading, isSuccess]);

  const submitHandler = () => {
    const reviewData = { rating, comment, productId };
    submitReview(reviewData);
  };

  return (
    <View style={styles.container}>
      {canReview && (
        <Button title="Đánh giá sản phẩm" onPress={() => setModalVisible(true)} />
      )}

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Đánh giá sản phẩm</Text>
            <StarRating
              rating={rating}
              starSize={30}
              color="#ffb829"
              onChange={(newRating) => setRating(newRating)}
            />
            <TextInput
              style={styles.commentInput}
              placeholder="Enter your comment"
              value={comment}
              onChangeText={(text) => setComment(text)}
              multiline
            />
            <TouchableOpacity style={styles.submitButton} onPress={submitHandler}>
              <Text style={styles.submitButtonText}>Đánh giá</Text>
            </TouchableOpacity>
            <Button title="Close" color="red" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {/* Optional Toast Notification */}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 20 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  commentInput: {
    width: '100%',
    height: 80,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginTop: 10,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 15,
  },
  submitButtonText: { color: 'white', fontWeight: 'bold' },
});

export default NewReview;
