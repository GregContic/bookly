import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
    Animated,
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
 * DATE & TIME SELECTION DATA
 * ===========================================
 */
const timeSlots = [
  '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM',
  '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM',
  '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
  '9:00 PM'
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysOfWeek = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];

/**
 * ===========================================
 * SELECT DATE & TIME PAGE COMPONENT
 * ===========================================
 */
export default function SelectDateTimePage() {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 2, 1)); // March 2025
  
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
  const handleNext = () => {
    // Navigate to booking summary page
    router.push('/BookingSummaryPage');
  };

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const today = new Date();
    
    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      const prevMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 0);
      const prevDate = prevMonth.getDate() - (firstDay - 1 - i);
      days.push(
        <TouchableOpacity key={`prev-${i}`} style={[styles.dayCell, styles.inactiveDay]}>
          <Text style={[styles.dayText, styles.inactiveDayText]}>{prevDate}</Text>
        </TouchableOpacity>
      );
    }
    
    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      const isSelected = selectedDate && 
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();
      const isPast = date < today;
      const isToday = date.toDateString() === today.toDateString();
      
      days.push(
        <TouchableOpacity 
          key={day}
          style={[
            styles.dayCell,
            isSelected && styles.selectedDay,
            isToday && styles.todayDay,
            isPast && styles.pastDay
          ]}
          onPress={() => !isPast && setSelectedDate(date)}
          disabled={isPast}
        >
          <Text style={[
            styles.dayText,
            isSelected && styles.selectedDayText,
            isToday && styles.todayDayText,
            isPast && styles.pastDayText
          ]}>
            {day}
          </Text>
        </TouchableOpacity>
      );
    }
    
    // Add empty cells for remaining days to complete the grid
    const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDay + daysInMonth);
    
    for (let i = 1; i <= remainingCells; i++) {
      days.push(
        <TouchableOpacity key={`next-${i}`} style={[styles.dayCell, styles.inactiveDay]}>
          <Text style={[styles.dayText, styles.inactiveDayText]}>{i}</Text>
        </TouchableOpacity>
      );
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const isNextDisabled = !selectedDate || !selectedTime;

  return (
    <SafeAreaView style={styles.safeArea}>
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
          <Text style={styles.headerTitle}>Select Date & Time</Text>
          <Text style={styles.headerSubtitle}>Step 2: Booking Summary</Text>
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
          <View style={[styles.progressStep, styles.progressActive]} />
          <View style={styles.progressLine} />
          <View style={styles.progressStep} />
          <View style={styles.progressLine} />
          <View style={styles.progressStep} />
        </View>
        <Text style={styles.progressText}>2 of 4</Text>
      </Animated.View>

      <ScrollView 
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: height * 0.2 }
        ]} 
        showsVerticalScrollIndicator={false}
      >
        {/* Date Selection */}
        <Animated.View 
          style={[
            styles.sectionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Select Booking Date:</Text>
          
          {/* Calendar Header */}
          <View style={styles.calendarHeader}>
            <TouchableOpacity onPress={() => navigateMonth('prev')}>
              <Ionicons name="chevron-back" size={20} color="#333" />
            </TouchableOpacity>
            <Text style={styles.monthYear}>
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </Text>
            <TouchableOpacity onPress={() => navigateMonth('next')}>
              <Ionicons name="chevron-forward" size={20} color="#333" />
            </TouchableOpacity>
          </View>
          
          {/* Days of Week Header */}
          <View style={styles.daysHeader}>
            {daysOfWeek.map((day) => (
              <Text key={day} style={styles.dayHeaderText}>{day}</Text>
            ))}
          </View>
          
          {/* Calendar Grid */}
          <View style={styles.calendarGrid}>
            {renderCalendar()}
          </View>
        </Animated.View>

        {/* Time Selection */}
        <Animated.View 
          style={[
            styles.sectionContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Text style={styles.sectionTitle}>Available Time Slots:</Text>
          <View style={styles.timeSlotsGrid}>
            {timeSlots.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeSlot,
                  selectedTime === time && styles.selectedTimeSlot
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[
                  styles.timeSlotText,
                  selectedTime === time && styles.selectedTimeSlotText
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
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
            styles.nextButton,
            isNextDisabled && styles.nextButtonDisabled
          ]}
          onPress={handleNext}
          disabled={isNextDisabled}
        >
          <Text style={[
            styles.nextButtonText,
            isNextDisabled && styles.nextButtonTextDisabled
          ]}>
            Next
          </Text>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

/**
 * ===========================================
 * SELECT DATE & TIME PAGE STYLES
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
  },
  progressActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  progressCompleted: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  progressLine: {
    width: 40,
    height: 2,
    backgroundColor: '#E0E0E0',
  },
  progressLineCompleted: {
    backgroundColor: '#4CAF50',
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
    marginBottom: 15,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  monthYear: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  daysHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
  },
  dayHeaderText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
    width: '14.28%',
    textAlign: 'center',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 5,
  },
  dayCell: {
    width: '14.28%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 1,
    borderRadius: 8,
  },
  selectedDay: {
    backgroundColor: '#4CAF50',
  },
  todayDay: {
    backgroundColor: '#E3F2FD',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  pastDay: {
    opacity: 0.3,
  },
  inactiveDay: {
    opacity: 0.3,
  },
  dayText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  selectedDayText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  todayDayText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
  pastDayText: {
    color: '#999',
  },
  inactiveDayText: {
    color: '#999',
  },
  timeSlotsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeSlot: {
    width: '30%',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedTimeSlot: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  timeSlotText: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  selectedTimeSlotText: {
    color: '#fff',
    fontWeight: 'bold',
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
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    paddingVertical: 15,
    marginLeft: 10,
    alignItems: 'center',
  },
  nextButtonDisabled: {
    backgroundColor: '#B0B0B0',
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  nextButtonTextDisabled: {
    color: '#fff',
  },
});
