
import AsyncStorage from "@react-native-async-storage/async-storage";

export type ClassItem = {
  id: string;
  date: string;
  name: string;
  time: string;
  instructor: string;
  duration: string;
};

const BOOKINGS_STORAGE_KEY = "woolsey-bookings";

// Convert a class date and time into a real JavaScript Date.
export function getClassDateTime(classItem: ClassItem): Date | null {
  const [year, month, day] = classItem.date.split("-").map(Number);

  const timeMatch = classItem.time.match(
    /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i
  );

  if (!year || !month || !day || !timeMatch) {
    return null;
  }

  let hours = Number(timeMatch[1]);
  const minutes = Number(timeMatch[2]);
  const meridiem = timeMatch[3].toUpperCase();

  if (meridiem === "PM" && hours !== 12) {
    hours += 12;
  }

  if (meridiem === "AM" && hours === 12) {
    hours = 0;
  }

  return new Date(year, month - 1, day, hours, minutes);
}

// Retrieve all saved bookings.
export async function getBookings(): Promise<ClassItem[]> {
  try {
    const storedBookings = await AsyncStorage.getItem(
      BOOKINGS_STORAGE_KEY
    );

    return storedBookings ? JSON.parse(storedBookings) : [];
  } catch (error) {
    console.error("Error loading bookings:", error);
    return [];
  }
}

// Add a booking without creating duplicates.

export async function addBooking(
    classItem: ClassItem
  ): Promise<ClassItem[]> {
    const bookings = await getBookings();
  
    if (bookings.some((booking) => booking.id === classItem.id)) {
      return bookings;
    }
  
    const updatedBookings = [...bookings, classItem];
  
    try {
      await AsyncStorage.setItem(
        BOOKINGS_STORAGE_KEY,
        JSON.stringify(updatedBookings)
      );
  
      const verification = await AsyncStorage.getItem(
        BOOKINGS_STORAGE_KEY
      );
  
      console.log("BOOKING SAVED:", verification);
  
      return updatedBookings;
    } catch (error) {
      console.error("ERROR SAVING BOOKING:", error);
      throw error;
    }
  }
  

// Remove a cancelled booking.
export async function removeBooking(
  classId: string
): Promise<ClassItem[]> {
  const bookings = await getBookings();

  const updatedBookings = bookings.filter(
    (booking) => booking.id !== classId
  );

  await AsyncStorage.setItem(
    BOOKINGS_STORAGE_KEY,
    JSON.stringify(updatedBookings)
  );

  return updatedBookings;
}

// Find the next upcoming booking.
export function getNextUpcomingBooking(
  bookings: ClassItem[],
  now: Date = new Date()
): ClassItem | null {
  return (
    bookings
      .filter((booking) => {
        const classDateTime = getClassDateTime(booking);

        return classDateTime !== null && classDateTime > now;
      })
      .sort((a, b) => {
        const dateA = getClassDateTime(a)!.getTime();
        const dateB = getClassDateTime(b)!.getTime();

        return dateA - dateB;
      })[0] ?? null
  );
}
