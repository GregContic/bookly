import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Linking, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from 'react-native';

// Sample FAQ data
const faqSections = [
  {
    title: 'Booking & Appointments',
    items: [
      {
        question: 'How do I book an appointment?',
        answer: 'To book an appointment, select a service provider, choose your preferred service, select a date and time, and confirm your booking. Payment can be made through our secure payment system.'
      },
      {
        question: 'How can I cancel or reschedule my appointment?',
        answer: 'You can cancel or reschedule your appointment through the Appointment History section. Please note that some services may have specific cancellation policies.'
      },
      {
        question: 'What is your cancellation policy?',
        answer: 'Cancellation policies vary by service provider. Generally, cancellations made 24 hours before the appointment are eligible for a full refund.'
      }
    ]
  },
  {
    title: 'Account & Profile',
    items: [
      {
        question: 'How do I update my profile information?',
        answer: 'Go to Profile > Account Settings to update your personal information, contact details, and preferences.'
      },
      {
        question: 'How can I change my password?',
        answer: 'You can change your password in the Account Settings section. Click on "Security" and follow the prompts to update your password.'
      }
    ]
  },
  {
    title: 'Payments & Refunds',
    items: [
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept major credit/debit cards, GCash, Maya, and other digital payment methods.'
      },
      {
        question: 'How do refunds work?',
        answer: 'Refunds are processed according to the service provider\'s policy. Most refunds are processed within 3-5 business days.'
      }
    ]
  }
];

const supportChannels = [
  {
    icon: 'mail-outline',
    title: 'Email Support',
    description: 'Get help via email. We typically respond within 24 hours.',
    action: 'support@booklyph.com',
    type: 'email'
  },
  {
    icon: 'call-outline',
    title: 'Phone Support',
    description: 'Talk to our customer service representatives.',
    action: '+63 912 345 6789',
    type: 'phone'
  },
  {
    icon: 'chatbubble-outline',
    title: 'Live Chat',
    description: 'Chat with our support team in real-time.',
    action: 'Start Chat',
    type: 'chat'
  }
];

export default function SupportHelpCenter() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedQuestion, setExpandedQuestion] = useState<string | null>(null);

  // Animation values
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(30)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.95)).current;

  // Dynamic scaling calculations
  const scale = width / 375;
  const dynamicFontSize = (size: number) => Math.round(size * scale);
  const dynamicSpacing = (size: number) => Math.round(size * scale);

  useEffect(() => {
    // Handle orientation changes
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setOrientation(window.width < window.height ? 'PORTRAIT' : 'LANDSCAPE');
    });

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

    return () => subscription?.remove();
  }, []);

  const handleSupportChannel = (channel: typeof supportChannels[0]) => {
    switch (channel.type) {
      case 'email':
        Linking.openURL(`mailto:${channel.action}`);
        break;
      case 'phone':
        Linking.openURL(`tel:${channel.action.replace(/\s+/g, '')}`);
        break;
      case 'chat':
        // Implement chat functionality
        console.log('Opening chat...');
        break;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Animated.View 
        style={[
          styles.headerRow,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={dynamicFontSize(24)} color="#B0B0B0" />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { fontSize: dynamicFontSize(20) }]}>Support & Help</Text>
        <View style={{ width: dynamicSpacing(24) }} />
      </Animated.View>

      <ScrollView 
        contentContainerStyle={{ paddingBottom: height * 0.15 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Support Channels */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={[styles.sectionTitle, { fontSize: dynamicFontSize(18) }]}>Contact Us</Text>
          {supportChannels.map((channel, index) => (
            <Animated.View
              key={channel.title}
              style={[
                styles.supportCard,
                {
                  transform: [
                    { scale: scaleAnim },
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 20 + (index * 10)]
                      })
                    }
                  ]
                }
              ]}
            >
              <TouchableOpacity 
                style={styles.supportCardContent}
                onPress={() => handleSupportChannel(channel)}
              >
                <View style={styles.supportIconContainer}>
                  <Ionicons name={channel.icon as any} size={24} color="#EDAE49" />
                </View>
                <View style={styles.supportInfo}>
                  <Text style={[styles.supportTitle, { fontSize: dynamicFontSize(16) }]}>{channel.title}</Text>
                  <Text style={[styles.supportDescription, { fontSize: dynamicFontSize(14) }]}>{channel.description}</Text>
                  <Text style={[styles.supportAction, { fontSize: dynamicFontSize(14) }]}>{channel.action}</Text>
                </View>
                <MaterialIcons name="arrow-forward-ios" size={16} color="#EDAE49" />
              </TouchableOpacity>
            </Animated.View>
          ))}
        </Animated.View>

        {/* FAQ Sections */}
        <Animated.View
          style={[
            styles.section,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={[styles.sectionTitle, { fontSize: dynamicFontSize(18) }]}>Frequently Asked Questions</Text>
          {faqSections.map((section, sectionIndex) => (
            <Animated.View
              key={section.title}
              style={[
                styles.faqSection,
                {
                  transform: [
                    { scale: scaleAnim },
                    {
                      translateY: slideAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0, 20 + (sectionIndex * 10)]
                      })
                    }
                  ]
                }
              ]}
            >
              <TouchableOpacity
                style={styles.faqSectionHeader}
                onPress={() => setExpandedSection(expandedSection === section.title ? null : section.title)}
              >
                <Text style={[styles.faqSectionTitle, { fontSize: dynamicFontSize(16) }]}>{section.title}</Text>
                <MaterialIcons 
                  name={expandedSection === section.title ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                  size={24} 
                  color="#EDAE49" 
                />
              </TouchableOpacity>
              
              {expandedSection === section.title && section.items.map((item, itemIndex) => (
                <TouchableOpacity
                  key={item.question}
                  style={styles.faqItem}
                  onPress={() => setExpandedQuestion(expandedQuestion === item.question ? null : item.question)}
                >
                  <View style={styles.faqQuestion}>
                    <Text style={[styles.questionText, { fontSize: dynamicFontSize(14) }]}>{item.question}</Text>
                    <MaterialIcons 
                      name={expandedQuestion === item.question ? "remove" : "add"} 
                      size={20} 
                      color="#EDAE49" 
                    />
                  </View>
                  {expandedQuestion === item.question && (
                    <Text style={[styles.answerText, { fontSize: dynamicFontSize(14) }]}>{item.answer}</Text>
                  )}
                </TouchableOpacity>
              ))}
            </Animated.View>
          ))}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F5F0',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingTop: Platform.OS === 'ios' ? '15%' : '18%',
    paddingBottom: '2%',
    backgroundColor: 'transparent',
  },
  headerTitle: {
    fontWeight: 'bold',
    color: '#222',
  },
  section: {
    padding: '5%',
  },
  sectionTitle: {
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 16,
  },
  supportCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  supportCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  supportIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF7E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  supportInfo: {
    flex: 1,
  },
  supportTitle: {
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  supportDescription: {
    color: '#666',
    marginBottom: 4,
  },
  supportAction: {
    color: '#EDAE49',
    fontWeight: '600',
  },
  faqSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  faqSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFF7E0',
  },
  faqSectionTitle: {
    fontWeight: 'bold',
    color: '#222',
  },
  faqItem: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    color: '#222',
    flex: 1,
    marginRight: 8,
  },
  answerText: {
    color: '#666',
    marginTop: 8,
    lineHeight: 20,
  },
});