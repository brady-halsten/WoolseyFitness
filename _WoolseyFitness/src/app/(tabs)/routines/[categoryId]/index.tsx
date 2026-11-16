
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { GlobalStyles } from "@/constants/styles";
import { Sizes } from "@/constants/theme";
import { getFormattedDate } from "@/utils/date";
import { wzf4x15 } from "@/data/routines/wzf4x15";

import type {
  Exercise,
  ExerciseGroup,
  SpringColor,
  WorkoutStation,
} from "@/data/routines/wzf4x15";

const categoryTitles: Record<string, string> = {
  "wzf-4x15": "WZF 4x15",
  "reformer-strength": "Reformer x Strength",
  "wzf-pilates": "WZF Pilates",
  "arms-abs": "Arms x Abs",
  "arms-abs-ass": "Arms x Abs x Ass",
  "justine-pilates": "Justine Pilates",
};

const springColors: Record<SpringColor, string> = {
  yellow: "#F4D03F",
  blue: "#3498DB",
  red: "#E74C3C",
  green: "#2ECC71",
};

function SpringIndicator({
  springs,
}: {
  springs: Exercise["springs"];
}) {
  if (!springs) return null;

  return (
    <View style={styles.springContainer}>
      {(["top", "bottom"] as const).map((position) => {
        const colors = springs[position];

        if (!colors?.length) return null;

        return (
          <View key={position} style={styles.springRow}>
            <Text style={styles.springLabel}>
              {position.toUpperCase()}
            </Text>

            <View style={styles.springDots}>
              {colors.map((color, index) => (
                <View
                  key={`${color}-${index}`}
                  style={[
                    styles.springDot,
                    { backgroundColor: springColors[color] },
                  ]}
                />
              ))}
            </View>
          </View>
        );
      })}
    </View>
  );
}

function ExerciseCard({
  exercise,
}: {
  exercise: Exercise;
}) {
  return (
    <View style={styles.exerciseCard}>
      <Text style={styles.exerciseName}>
        {exercise.name}
      </Text>

      {exercise.reps && (
        <View style={styles.detailRow}>
          <Ionicons
            name="repeat-outline"
            size={15}
            color="#5DD1DC"
          />
          <Text style={styles.detailText}>
            {exercise.reps}
          </Text>
        </View>
      )}

      {exercise.equipment && (
        <View style={styles.detailRow}>
          <Ionicons
            name="barbell-outline"
            size={15}
            color="#5DD1DC"
          />
          <Text style={styles.detailText}>
            {exercise.equipment.join(" · ")}
          </Text>
        </View>
      )}

      {exercise.notes && (
        <Text style={styles.exerciseNotes}>
          {exercise.notes}
        </Text>
      )}

      <SpringIndicator springs={exercise.springs} />
    </View>
  );
}

function ExerciseGroupCard({
  group,
}: {
  group: ExerciseGroup;
}) {
  const isMurderSet = group.type === "murder-set";

  return (
    <View
      style={[
        styles.groupContainer,
        isMurderSet && styles.murderSetContainer,
      ]}
    >
      {isMurderSet && (
        <View style={styles.murderSetHeader}>
          <Ionicons
            name="flame"
            size={17}
            color="#F13F91"
          />
          <Text style={styles.murderSetTitle}>
            MURDER SET
          </Text>
          <Text style={styles.murderSetSubtitle}>
            Perform consecutively
          </Text>
        </View>
      )}

      {group.exercises.map((exercise, index) => (
        <View key={exercise.id}>
          <ExerciseCard exercise={exercise} />

          {isMurderSet &&
            index < group.exercises.length - 1 && (
              <View style={styles.sequenceIndicator}>
                <Ionicons
                  name="arrow-down"
                  size={18}
                  color="#F13F91"
                />
              </View>
            )}
        </View>
      ))}
    </View>
  );
}

function StationCard({
  station,
}: {
  station: WorkoutStation;
}) {
  return (
    <View style={styles.stationCard}>
      <View style={styles.stationHeader}>
        <View style={styles.stationTitleContainer}>
          <Text style={styles.stationNumber}>
            {station.name.toUpperCase()}
          </Text>
          <Text style={styles.stationSubtitle}>
            Complete all exercises before moving on
          </Text>
        </View>

        <View style={styles.roundBadge}>
          <Text style={styles.roundBadgeText}>
            {station.rounds} ROUNDS
          </Text>
        </View>
      </View>

      {station.groups.map((group, index) => (
        <ExerciseGroupCard
          key={`${station.id}-group-${index}`}
          group={group}
        />
      ))}
    </View>
  );
}

export default function CategoryScreen() {
  const { categoryId } = useLocalSearchParams<{
    categoryId: string;
  }>();

  const routine = categoryId === wzf4x15.id
    ? wzf4x15
    : null;

  const categoryTitle =
    categoryTitles[categoryId] ?? "Routine not found";

  return (
    <SafeAreaView style={GlobalStyles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={GlobalStyles.headerRow}>
          <Image
            source={require("@/assets/images/wzf_new_logo.jpg")}
            style={{
              width: Sizes.logo,
              height: Sizes.logo,
              resizeMode: "contain",
            }}
          />
        </View>

        <Text style={GlobalStyles.dateText}>
          {getFormattedDate()}
        </Text>

        <View style={styles.headingContainer}>
          <Text style={styles.programLabel}>
            WZF ROUTINES
          </Text>

          <Text style={styles.pageTitle}>
            {routine?.title ?? categoryTitle}
          </Text>

          <Text style={styles.pageSubtitle}>
            {routine?.description ??
              (categoryTitles[categoryId]
                ? "Workout details coming soon."
                : "We couldn't find this routine.")}
          </Text>

          {routine && (
            <View style={styles.programInfo}>
              <Ionicons
                name="calendar-outline"
                size={15}
                color="#5DD1DC"
              />
              <Text style={styles.programInfoText}>
                {routine.programLength}-WEEK PROGRAM
              </Text>

              <View style={styles.infoDivider} />

              <Ionicons
                name="fitness-outline"
                size={15}
                color="#5DD1DC"
              />
              <Text style={styles.programInfoText}>
                {routine.stations.length} STATIONS
              </Text>
            </View>
          )}
        </View>

        {routine ? (
          <View style={styles.stationsContainer}>
            {routine.stations.map((station) => (
              <StationCard
                key={station.id}
                station={station}
              />
            ))}
          </View>
        ) : (
          <View style={styles.comingSoon}>
            <Ionicons
              name="barbell-outline"
              size={42}
              color="#5DD1DC"
            />
            <Text style={styles.comingSoonTitle}>
              WORKOUT COMING SOON
            </Text>
            <Text style={styles.comingSoonText}>
              We're preparing this routine. Check back soon!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 36,
  },

  headingContainer: {
    paddingHorizontal: 20,
    marginTop: 26,
    marginBottom: 22,
  },

  programLabel: {
    color: "#5DD1DC",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 2,
    marginBottom: 8,
  },

  pageTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "900",
  },

  pageSubtitle: {
    color: "#AAAAAA",
    fontSize: 13,
    marginTop: 6,
  },

  programInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 18,
  },

  programInfoText: {
    color: "#BBBBBB",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  infoDivider: {
    width: 1,
    height: 15,
    backgroundColor: "#555555",
    marginHorizontal: 6,
  },

  stationsContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },

  stationCard: {
    backgroundColor: "#20272A",
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: "#343D40",
  },

  stationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    gap: 8,
  },

  stationTitleContainer: {
    flex: 1,
  },

  stationNumber: {
    color: "#5DD1DC",
    fontSize: 16,
    fontWeight: "900",
    letterSpacing: 1,
  },

  stationSubtitle: {
    color: "#999999",
    fontSize: 10,
    marginTop: 4,
  },

  roundBadge: {
    backgroundColor: "#29484C",
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 8,
  },

  roundBadgeText: {
    color: "#5DD1DC",
    fontSize: 10,
    fontWeight: "900",
  },

  groupContainer: {
    marginTop: 10,
  },

  exerciseCard: {
    backgroundColor: "#2B3336",
    borderRadius: 12,
    padding: 14,
    gap: 8,
  },

  exerciseName: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  detailText: {
    color: "#BBBBBB",
    fontSize: 12,
  },

  exerciseNotes: {
    color: "#F13F91",
    fontSize: 12,
    fontWeight: "700",
  },

  springContainer: {
    gap: 7,
    marginTop: 4,
  },

  springRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  springLabel: {
    color: "#999999",
    fontSize: 9,
    fontWeight: "800",
    width: 48,
  },

  springDots: {
    flexDirection: "row",
    gap: 7,
  },

  springDot: {
    width: 17,
    height: 17,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },

  murderSetContainer: {
    borderWidth: 1,
    borderColor: "#A83B6C",
    borderRadius: 14,
    padding: 10,
    backgroundColor: "#35232E",
  },

  murderSetHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 10,
  },

  murderSetTitle: {
    color: "#F13F91",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
  },

  murderSetSubtitle: {
    color: "#AAAAAA",
    fontSize: 10,
    marginLeft: "auto",
  },

  sequenceIndicator: {
    alignItems: "center",
    paddingVertical: 4,
  },

  comingSoon: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginHorizontal: 16,
    backgroundColor: "#20272A",
    borderRadius: 18,
    gap: 12,
  },

  comingSoonTitle: {
    color: "#FFFFFF",
    fontWeight: "900",
    fontSize: 15,
  },

  comingSoonText: {
    color: "#AAAAAA",
    fontSize: 12,
    textAlign: "center",
  },
});
