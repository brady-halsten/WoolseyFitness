
import { useState } from "react";
import { Calendar } from "react-native-calendars";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

const dummyClasses = {
  "2026-11-03": [
    {
      id: "1",
      name: "Body Blasst",
      time: "5:00 AM",
      instructor: "Christopher",
      duration: "50 min",
    },
    {
      id: "2",
      name: "Abs Arms and Ass",
      time: "7:00 AM",
      instructor: "Justine",
      duration: "45 min",
    },
    {
      id: "5",
      name: "WzF 4X15 Boot Camp",
      time: "9:00 AM",
      instructor: "Christopher",
      duration: "45 min",
    },
    {
      id: "6",
      name: "WzF Open Gym",
      time: "1:00 PM",
      instructor: "None",
      duration: "60 min",
    },
    {
      id: "7",
      name: "WzF Open Gym",
      time: "2:00 PM",
      instructor: "None",
      duration: "60 min",
    },
    {
      id: "8",
      name: "WzF Open Gym",
      time: "3:00 PM",
      instructor: "None",
      duration: "60 min",
    },
  ],
  "2026-11-04": [
    {
      id: "3",
      name: "Abs and Arms",
      time: "10:00 AM",
      instructor: "Justine",
      duration: "50 min",
    },
  ],
  "2026-11-05": [
    {
      id: "4",
      name: "WzF 4X15 Boot Camp",
      time: "8:00 AM",
      instructor: "Christopher",
      duration: "45 min",
    },
  ],
};

export default function ClassCalendar() {
  const [selectedDate, setSelectedDate] = useState("");

  const selectedClasses =
    dummyClasses[selectedDate as keyof typeof dummyClasses] || [];

  const handleBookClass = (
    classItem: (typeof dummyClasses)[keyof typeof dummyClasses][number]
  ) => {
    console.log(
      "Booking class:",
      classItem.name,
      classItem.time,
      "on",
      selectedDate
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
          selectedClasses.map((classItem) => (
            <View key={classItem.id} style={styles.classCard}>
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
              </View>

              {/* Booking Button */}
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
            </View>
          ))
        ) : selectedDate ? (
          <Text style={styles.emptyMessage}>
            No classes scheduled for this date.
          </Text>
        ) : null}
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

  classCard: {
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
});
