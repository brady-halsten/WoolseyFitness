
import { useState } from "react";
import { Calendar } from "react-native-calendars";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";

type ClassItem = {
  id: string;
  date: string;
  name: string;
  time: string;
  instructor: string;
  duration: string;
};

// Recurring weekly mock schedule
const weeklySchedule: Record<number, Omit<ClassItem, "id" | "date">[]> = {
  // Sunday
  0: [],

  // Monday
  1: [
    {
      name: "Body Blasst",
      time: "6:00 AM",
      instructor: "Chris",
      duration: "50 min",
    },
    {
      name: "Reformer x Strength",
      time: "8:00 AM",
      instructor: "Justine",
      duration: "50 min",
    },
    {
      name: "WzF Open Gym",
      time: "1:00 PM",
      instructor: "None",
      duration: "60 min",
    },
  ],

  // Tuesday
  2: [
    {
      name: "Body Blasst",
      time: "5:00 AM",
      instructor: "Chris",
      duration: "50 min",
    },
    {
      name: "Abs Arms and Ass",
      time: "7:00 AM",
      instructor: "Justine",
      duration: "45 min",
    },
    {
      name: "WzF 4X15 Boot Camp",
      time: "9:00 AM",
      instructor: "Chris",
      duration: "45 min",
    },
    {
      name: "WzF Open Gym",
      time: "1:00 PM",
      instructor: "None",
      duration: "60 min",
    },
    {
      name: "WzF Open Gym",
      time: "2:00 PM",
      instructor: "None",
      duration: "60 min",
    },
    {
      name: "WzF Open Gym",
      time: "3:00 PM",
      instructor: "None",
      duration: "60 min",
    },
  ],

  // Wednesday
  3: [
    {
      name: "WzF Pilates",
      time: "7:00 AM",
      instructor: "Chris",
      duration: "50 min",
    },
    {
      name: "Abs and Arms",
      time: "10:00 AM",
      instructor: "Justine",
      duration: "50 min",
    },
    {
      name: "Body Blasst",
      time: "5:00 PM",
      instructor: "Chris",
      duration: "50 min",
    },
  ],

  // Thursday
  4: [
    {
      name: "WzF 4X15 Boot Camp",
      time: "8:00 AM",
      instructor: "Chris",
      duration: "45 min",
    },
    {
      name: "Arms x Abs",
      time: "10:00 AM",
      instructor: "Justine",
      duration: "45 min",
    },
    {
      name: "WzF Open Gym",
      time: "1:00 PM",
      instructor: "None",
      duration: "60 min",
    },
  ],

  // Friday
  5: [
    {
      name: "Body Blasst",
      time: "6:00 AM",
      instructor: "Chris",
      duration: "50 min",
    },
    {
      name: "Arms x Abs x Ass",
      time: "8:00 AM",
      instructor: "Justine",
      duration: "45 min",
    },
    {
      name: "WzF Open Gym",
      time: "12:00 PM",
      instructor: "None",
      duration: "60 min",
    },
  ],

  // Saturday
  6: [
    {
      name: "Body Blasst Boujee",
      time: "8:00 AM",
      instructor: "Chris",
      duration: "50 min",
    },
    {
      name: "WzF Pilates",
      time: "9:30 AM",
      instructor: "Justine",
      duration: "50 min",
    },
    {
      name: "WzF Open Gym",
      time: "11:00 AM",
      instructor: "None",
      duration: "60 min",
    },
  ],
};

// Generate calendar dates from November 3 through December 15
function generateDummyClasses(): Record<string, ClassItem[]> {
  const classes: Record<string, ClassItem[]> = {};

  const startDate = new Date(Date.UTC(2026, 10, 3));
  const endDate = new Date(Date.UTC(2026, 11, 15));

  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setUTCDate(date.getUTCDate() + 1)
  ) {
    const dateKey = date.toISOString().split("T")[0];
    const dayOfWeek = date.getUTCDay();

    const scheduledClasses = weeklySchedule[dayOfWeek] || [];

    classes[dateKey] = scheduledClasses.map((classItem, index) => ({
      ...classItem,
      id: `${dateKey}-${index + 1}`,
      date: dateKey,
    }));
  }

  return classes;
}

const dummyClasses = generateDummyClasses();

export default function ClassCalendar() {
  const [selectedDate, setSelectedDate] = useState("");
  const [bookedClassIds, setBookedClassIds] = useState<string[]>([]);

  const selectedClasses = dummyClasses[selectedDate] || [];

  // Collect all booked classes across every calendar date
  const bookedClasses = Object.values(dummyClasses)
    .flat()
    .filter((classItem) => bookedClassIds.includes(classItem.id))
    .sort((a, b) =>
      `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`)
    );

  // Book a class
  const handleBookClass = (classItem: ClassItem) => {
    if (bookedClassIds.includes(classItem.id)) {
      return;
    }

    Alert.alert(
      "Confirm Booking",
      `Would you like to book ${classItem.name}?

Time: ${classItem.time}
Duration: ${classItem.duration}
Instructor: ${classItem.instructor}
Date: ${classItem.date}`,
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Confirm",
          onPress: () => {
            setBookedClassIds((previous) => [
              ...previous,
              classItem.id,
            ]);

            Alert.alert(
              "Booking Confirmed!",
              `You've booked ${classItem.name} for ${classItem.time}.`
            );
          },
        },
      ]
    );
  };

  // Cancel an existing booking
  const handleCancelBooking = (classItem: ClassItem) => {
    Alert.alert(
      "Cancel Booking",
      `Are you sure you want to cancel ${classItem.name} on ${classItem.date} at ${classItem.time}?`,
      [
        {
          text: "Keep Booking",
          style: "cancel",
        },
        {
          text: "Cancel Booking",
          style: "destructive",
          onPress: () => {
            setBookedClassIds((previous) =>
              previous.filter((id) => id !== classItem.id)
            );

            Alert.alert(
              "Booking Cancelled",
              `Your booking for ${classItem.name} has been cancelled.`
            );
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Calendar */}
      <View style={styles.calendarContainer}>
        <Calendar
          onDayPress={(day) => {
            setSelectedDate(day.dateString);
          }}
          markedDates={{
            [selectedDate]: {
              selected: true,
              selectedColor: "#00BCD4",
            },
          }}
          theme={{
            calendarBackground: "#000000",
            dayTextColor: "#FFFFFF",
            monthTextColor: "#FFFFFF",
            todayTextColor: "#00BCD4",
            arrowColor: "#00BCD4",
          }}
        />
      </View>

      {/* Daily Class Schedule */}
      <View style={styles.classesContainer}>
        <Text style={styles.sectionTitle}>
          {selectedDate
            ? `Classes for ${selectedDate}`
            : "Select a date to view classes"}
        </Text>

        {selectedClasses.length > 0 ? (
          selectedClasses.map((classItem) => {
            const isBooked = bookedClassIds.includes(classItem.id);

            return (
              <View key={classItem.id} style={styles.classCalendarCard}>
                {/* Class Information */}
                <View style={styles.classInfo}>
                  <Text style={styles.className}>
                    {classItem.name}
                  </Text>

                  <Text style={styles.classDetails}>
                    {classItem.time} • {classItem.duration}
                  </Text>

                  <Text style={styles.classDetails}>
                    Instructor: {classItem.instructor}
                  </Text>

                  {isBooked && (
                    <Text style={styles.bookedLabel}>
                      BOOKED
                    </Text>
                  )}
                </View>

                {/* Booking Button */}
                {isBooked ? (
                  <Pressable
                    style={({ pressed }) => [
                      styles.cancelButton,
                      pressed && styles.bookButtonPressed,
                    ]}
                    onPress={() => handleCancelBooking(classItem)}
                  >
                    <Text style={styles.cancelButtonText}>
                      Cancel
                    </Text>
                  </Pressable>
                ) : (
                  <Pressable
                    style={({ pressed }) => [
                      styles.bookButton,
                      pressed && styles.bookButtonPressed,
                    ]}
                    onPress={() => handleBookClass(classItem)}
                  >
                    <Text style={styles.bookButtonText}>
                      Book
                    </Text>
                  </Pressable>
                )}
              </View>
            );
          })
        ) : selectedDate ? (
          <Text style={styles.emptyMessage}>
            No classes scheduled for this date.
          </Text>
        ) : null}
      </View>

      {/* My Bookings */}
      <View style={styles.classesContainer}>
        <Text style={styles.sectionTitle}>
          My Bookings ({bookedClasses.length})
        </Text>

        {bookedClasses.length > 0 ? (
          bookedClasses.map((classItem) => (
            <View key={classItem.id} style={styles.classCalendarCard}>
              <View style={styles.classInfo}>
                <Text style={styles.className}>
                  {classItem.name}
                </Text>

                <Text style={styles.classDetails}>
                  {classItem.date} • {classItem.time}
                </Text>

                <Text style={styles.classDetails}>
                  Instructor: {classItem.instructor}
                </Text>

                <Text style={styles.bookedLabel}>
                  BOOKED
                </Text>
              </View>

              <Pressable
                style={({ pressed }) => [
                  styles.cancelButton,
                  pressed && styles.bookButtonPressed,
                ]}
                onPress={() => handleCancelBooking(classItem)}
              >
                <Text style={styles.cancelButtonText}>
                  Cancel
                </Text>
              </Pressable>
            </View>
          ))
        ) : (
          <Text style={styles.emptyMessage}>
            You haven't booked any classes yet.
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },

  calendarContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: "#333333",
    borderRadius: 12,
    overflow: "hidden",
    width: "100%",
  },

  classesContainer: {
    marginTop: 20,
    width: "100%",
  },

  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },

  classCalendarCard: {
    backgroundColor: "#1A1A1A",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: "#00BCD4",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  classInfo: {
    flex: 1,
    marginRight: 10,
  },

  className: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },

  classDetails: {
    color: "#AAAAAA",
    fontSize: 14,
    marginTop: 5,
  },

  emptyMessage: {
    color: "#AAAAAA",
    fontSize: 14,
  },

  bookButton: {
    backgroundColor: "#00BCD4",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
  },

  bookButtonPressed: {
    opacity: 0.65,
  },

  bookButtonText: {
    color: "#000000",
    fontWeight: "bold",
    fontSize: 14,
  },

  cancelButton: {
    backgroundColor: "#3A2020",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#8B3838",
  },

  cancelButtonText: {
    color: "#FF7777",
    fontWeight: "bold",
    fontSize: 14,
  },

  bookedLabel: {
    color: "#00BCD4",
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 8,
    letterSpacing: 1,
  },
});
