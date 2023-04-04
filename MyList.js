import React from "react";
import { View, Text, SafeAreaView, Image, StyleSheet, Modal, Pressable, Dimensions, Platform, ScrollView } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useMovies } from "./MovieContext";

const windowWidth = Dimensions.get('window').width;

const App = () => {
  const { movies, page, setPage } = useMovies();
  const [currentItem, setCurrentItem] = React.useState({});
  const [modalVisible, setModalVisible] = React.useState(false);
  
  const getNextPage = () => {
    setPage(page + 1);
  }
  const onItemPress = (item) => {
    setCurrentItem(item);
    setModalVisible(true);
  };
  const renderMovieItem = ({ item }) => {
    return (
        <Pressable style={styles.itemContainer} onPress={() => onItemPress(item)}>
            <Image       
                style={styles.image}
                source={{
                    uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
            />
            <Text style={styles.text}>{item.title}</Text>
        </Pressable>
    )
  };
  return (
    <SafeAreaView style={styles.listContainer}>
      <FlashList
        showsVerticalScrollIndicator={false}
        numColumns={Platform.OS === 'web' ? 6 :2}
        data={movies}
        renderItem={renderMovieItem}
        estimatedItemSize={200}
        onEndReached={getNextPage}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView contentContainerStyle={styles.modalContent}>
              <Text style={styles.modalTitle}>{currentItem.title}</Text>
              <Image       
                  style={styles.image}
                  source={{
                      uri: `https://image.tmdb.org/t/p/w500${currentItem.poster_path}`,
                  }}
              />
              <Text style={styles.modalText}>{currentItem.overview}</Text>
              <Text style={styles.modalText}>Release Date: {currentItem.release_date}</Text>
              <Text style={styles.modalText}>Rating: {currentItem.vote_average}</Text>
              <Text style={styles.modalText}>Votes: {currentItem.vote_count}</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
    modalContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalTitle:{
        fontWeight: 'bold',
        fontSize: 32,
        marginBottom: 24,
    },
    listContainer:{
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
    },
    itemContainer: {
        marginBottom: 24,
    },
    image: {
        width: 200,
        height: 300,
        marginBottom: 12,
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
        padding: 6,
        width: 200,
    },
    centeredView: {
        position: 'relative',
        margin: 'auto',
        width: Platform.OS == 'web' ? windowWidth/2 : '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
      },
      modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
      },
      buttonOpen: {
        backgroundColor: '#F194FF',
      },
      buttonClose: {
        backgroundColor: '#2196F3',
      },
      textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
      },
      modalText: {
        marginBottom: 15,
        textAlign: 'center',
      },
});