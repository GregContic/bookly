import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Animated,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions
} from 'react-native';

/**
 * ===========================================
 * PAYMENT METHOD DATA
 * ===========================================
 */
const paymentMethods = [
  {
    id: '1',
    name: 'Will pay at the shop',
    type: 'cash'
  },
  {
    id: '2',
    name: 'GCash',
    type: 'gcash'
  },
  {
    id: '3',
    name: 'Maya',
    type: 'maya'
  },
  {
    id: '4',
    name: 'Credit / Debit Card',
    type: 'card'
  },
  {
    id: '5',
    name: 'Bank Transfer',
    type: 'bank'
  }
];

/**
 * ===========================================
 * PAYMENT METHOD PAGE COMPONENT
 * ===========================================
 */
export default function PaymentMethodPage() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  
  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleBack = () => {
    router.back();
  };

  const handlePrevious = () => {
    router.back();
  };
  const handleConfirmPayment = () => {
    // Show confirmation modal
    setShowConfirmModal(true);
  };  const handleConfirmProceed = () => {
    // Close modal and navigate to booking confirmation page
    setShowConfirmModal(false);
    router.push('/(booking)/confirmation');
  };

  const handleConfirmCancel = () => {
    // Close modal and stay on payment page
    setShowConfirmModal(false);
  };

  const handleSelectPayment = (paymentId: string) => {
    setSelectedPayment(paymentId);
  };
  const isConfirmDisabled = !selectedPayment;

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Confirmation Modal */}
      <Modal
        visible={showConfirmModal}
        transparent={true}
        animationType="fade"
        onRequestClose={handleConfirmCancel}
      >
        <View style={styles.modalOverlay}>
          <Animated.View style={[styles.modalContainer, { transform: [{ scale: scaleAnim }] }]}>
            <View style={styles.modalIconContainer}>
              <View style={styles.modalIcon}>
                <Text style={styles.modalIconText}>!</Text>
              </View>
            </View>
            
            <Text style={styles.modalTitle}>Are you sure you want to proceed?</Text>
            <Text style={styles.modalSubtitle}>
              Make sure to double check everything{'\n'}before proceeding!
            </Text>
            
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity 
                style={styles.modalCancelButton}
                onPress={handleConfirmCancel}
              >
                <Text style={styles.modalCancelButtonText}>No, go back</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.modalProceedButton}
                onPress={handleConfirmProceed}
              >
                <Text style={styles.modalProceedButtonText}>Yes, proceed</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
      {/* Header */}
      <Animated.View 
        style={[
          styles.headerRow,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <TouchableOpacity onPress={handleBack}>
          <Ionicons name="chevron-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Payment Method</Text>
          <Text style={styles.headerSubtitle}>Last Step</Text>
        </View>
        <View style={styles.headerRight} />
      </Animated.View>

      {/* Progress Indicator */}
      <Animated.View 
        style={[
          styles.progressContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.progressBar}>
          <View style={[styles.progressStep, styles.progressCompleted]} />
          <View style={[styles.progressLine, styles.progressLineCompleted]} />
          <View style={[styles.progressStep, styles.progressCompleted]} />
          <View style={[styles.progressLine, styles.progressLineCompleted]} />
          <View style={[styles.progressStep, styles.progressCompleted]} />
          <View style={[styles.progressLine, styles.progressLineCompleted]} />
          <View style={[styles.progressStep, styles.progressActive]} />
        </View>
        <Text style={styles.progressText}>4 of 4</Text>
      </Animated.View>

      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: height * 0.2 }
        ]} 
        showsVerticalScrollIndicator={false}
      >
        {/* Payment Method Selection */}
        <Animated.View 
          style={[
            styles.sectionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Select Payment Method:</Text>
          
          {paymentMethods.map((method, index) => (
            <Animated.View
              key={method.id}
              style={[
                {
                  opacity: fadeAnim,
                  transform: [
                    { scale: scaleAnim },
                    { 
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 20 + (index * 5)]
                      })
                    }
                  ]
                }
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.paymentOption,
                  selectedPayment === method.id && styles.paymentOptionSelected
                ]}
                onPress={() => handleSelectPayment(method.id)}
              >
                <View style={styles.radioContainer}>
                  <View style={[
                    styles.radioButton,
                    selectedPayment === method.id && styles.radioButtonSelected
                  ]}>
                    {selectedPayment === method.id && (
                      <View style={styles.radioButtonInner} />
                    )}
                  </View>
                </View>
                <Text style={[
                  styles.paymentText,
                  selectedPayment === method.id && styles.paymentTextSelected
                ]}>
                  {method.name}
                </Text>
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Animated.View>
      </ScrollView>

      {/* Bottom Buttons */}
      <Animated.View 
        style={[
          styles.bottomContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <TouchableOpacity 
          style={styles.previousButton}
          onPress={handlePrevious}
        >
          <Text style={styles.previousButtonText}>Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[
            styles.confirmButton,
            isConfirmDisabled && styles.confirmButtonDisabled
          ]}
          onPress={handleConfirmPayment}
          disabled={isConfirmDisabled}
        >
          <Text style={[
            styles.confirmButtonText,
            isConfirmDisabled && styles.confirmButtonTextDisabled
          ]}>
            Confirm Payment
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

/**
 * ===========================================
 * PAYMENT METHOD PAGE STYLES
 * ===========================================
 */
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F5F0',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'ios' ? 20 : 30,
    paddingBottom: 20,
    backgroundColor: '#F8F5F0',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  headerRight: {
    width: 24,
  },
  progressContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  progressBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  progressStep: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#E0E0E0',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },  progressActive: {
    backgroundColor: '#EDAE49',
    borderColor: '#EDAE49',
  },
  progressCompleted: {
    backgroundColor: '#EDAE49',
    borderColor: '#EDAE49',
  },
  progressLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E0E0E0',
  },  progressLineCompleted: {
    backgroundColor: '#EDAE49',
  },
  progressText: {
    fontSize: 12,
    color: '#666',
  },
  sectionContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  paymentOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 18,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },  paymentOptionSelected: {
    borderColor: '#EDAE49',
    backgroundColor: '#FDF6E3',
  },
  radioContainer: {
    marginRight: 15,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    alignItems: 'center',
    justifyContent: 'center',
  },  radioButtonSelected: {
    borderColor: '#EDAE49',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EDAE49',
  },
  paymentText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },  paymentTextSelected: {
    color: '#B8860B',
    fontWeight: '600',
  },
  bottomContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    paddingBottom: Platform.OS === 'ios' ? 35 : 25,
    backgroundColor: '#F8F5F0',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  previousButton: {
    flex: 1,
    backgroundColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 15,
    marginRight: 10,
    alignItems: 'center',
  },
  previousButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },  confirmButton: {
    flex: 1,
    backgroundColor: '#EDAE49',
    borderRadius: 12,
    paddingVertical: 15,
    marginLeft: 10,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#B0B0B0',
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },  confirmButtonTextDisabled: {
    color: '#fff',
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    marginHorizontal: 30,
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
  modalIconContainer: {
    marginBottom: 20,
  },
  modalIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalIconText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 20,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginRight: 10,
    alignItems: 'center',
  },
  modalCancelButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },  modalProceedButton: {
    flex: 1,
    backgroundColor: '#EDAE49',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: 10,
    alignItems: 'center',
  },
  modalProceedButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});
