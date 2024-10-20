import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating-widget';

const ListReviews = ({ reviews }) => {
  const renderItem = ({ item: review }) => (
    <View style={styles.reviewCard}>
      <View style={styles.avatarContainer}>
        <Image
          source={{
            uri: review?.user?.avatar?.url || 'https://via.placeholder.com/50',
          }}
          style={styles.avatar}
        />
      </View>
      <View style={styles.reviewContent}>
        <StarRating
          rating={review?.rating || 0}
          starSize={18}
          color="#ffb829"
          onChange={() => {}}
        />
        <Text style={styles.reviewUser}>{review?.user?.name}</Text>
        <Text style={styles.reviewComment}>{review?.comment}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Các đánh giá từ người mua:</Text>
      <FlatList
        data={reviews}
        keyExtractor={(review) => review?._id.toString()}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 15, width: '100%' },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  reviewCard: { flexDirection: 'row', paddingVertical: 10 },
  avatarContainer: { marginRight: 10 },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  reviewContent: { flex: 1 },
  reviewUser: { fontSize: 16, fontWeight: 'bold', marginTop: 5 },
  reviewComment: { fontSize: 14, color: '#555', marginTop: 5 },
  separator: { height: 1, backgroundColor: '#ddd', marginVertical: 10 },
});

export default ListReviews;
