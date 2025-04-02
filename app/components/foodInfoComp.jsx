import React from "react";
import { View, Text, TouchableOpacity, ScrollView, Image, Alert, Modal } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


const FoodInfoModal = ({modalVisible,setModalVisible,foodInfo,setImageShow}) => {
  return (
    <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ width: 350, backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden' }}>
            { foodInfo && (
              <>
                <Image source={{ uri: foodInfo.leftImage }} style={{ width: '100%', height: 200 }} />
                <View style={{ padding: 15 }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{foodInfo.name}</Text>
                    <View style={{ backgroundColor: '#003973', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 15 }}>
                      {/* <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>07:24</Text> */}
                    </View>
                  </View>
                  
                  <View style={{ backgroundColor: '#F5F5F5', padding: 10, borderRadius: 15, alignItems: 'center', marginVertical: 10, elevation: 5 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>🔥 {foodInfo.calories}</Text>
                    <Text>Calories</Text>
                  </View>
                  
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                    {[{ label: 'Proteins', value: `${foodInfo.protein}g`, icon: 'food-drumstick' }, { label: 'Carbs', value: `${foodInfo.carbs}g`, icon: 'bread-slice' }, { label: 'Fats', value: `${foodInfo.fats}g`, icon: 'cheese' }].map((item, index) => (
                      <View key={index} style={{ backgroundColor: '#F5F5F5', padding: 15, borderRadius: 10, alignItems: 'center', width: '30%', elevation: 5 }}>
                        <MaterialCommunityIcons name={item.icon} size={24} color="#000" />
                        <Text style={{ fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>{item.value}</Text>
                        <Text style={{ fontSize: 12 }}>{item.label}</Text>
                      </View>
                    ))}
                  </View>
                  <View style={{ backgroundColor: '#F5F5F5', padding: 10, borderRadius: 15, alignItems: 'center', marginVertical: 10, elevation: 5 }}>
                    <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{foodInfo.estimatedVolume} cm³</Text>
                    <Text>Estimated Volume</Text>
                  </View>
                  
                  <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F5F5', padding: 10, borderRadius: 10, justifyContent: 'space-between', marginVertical: 10 }}>
                    <MaterialCommunityIcons name="heart-pulse" size={24} color="#FF3D00" />
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Health Score</Text>
                    <View style={{ flex: 1, height: 8, backgroundColor: '#ddd', borderRadius: 5, marginHorizontal: 10 }}>
                      <View style={{ width: `${foodInfo.healthScore * 10}%`, height: '100%', backgroundColor: '#4CAF50', borderRadius: 5 }}></View>
                    </View>
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{foodInfo.healthScore}/10</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => {setModalVisible(false), setImageShow(false)}} style={{ backgroundColor: '#FF9800', padding: 15, alignItems: 'center' }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
  );
};

export default FoodInfoModal;
