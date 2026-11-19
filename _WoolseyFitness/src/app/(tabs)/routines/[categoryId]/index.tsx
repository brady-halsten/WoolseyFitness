
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { useState } from "react";
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

    const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [currentStationIndex, setCurrentStationIndex] = useState(0);
  const [completedRoundsInStation, setCompletedRoundsInStation] = useState(0);
  const [isWorkoutComplete, setIsWorkoutComplete] = useState(false);

  const currentStation = routine?.stations[currentStationIndex];

  const totalRounds = routine?.stations.reduce(
    (total, station) => total + station.rounds,
    0
  ) ?? 0;

  const completedRoundsBeforeCurrent = routine
    ? routine.stations
        .slice(0, currentStationIndex)
        .reduce((total, station) => total + station.rounds, 0)
    : 0;

  const totalCompletedRounds =
    completedRoundsBeforeCurrent + completedRoundsInStation;

  const progressPercent = totalRounds > 0
    ? (totalCompletedRounds / totalRounds) * 100
    : 0;

  const handleStartWorkout = () => {
    setCurrentStationIndex(0);
    setCompletedRoundsInStation(0);
    setIsWorkoutComplete(false);
    setIsWorkoutStarted(true);
  };

  const handleCompleteRound = () => {
    if (!currentStation || !routine) return;

    const nextCompletedRound = completedRoundsInStation + 1;

    if (nextCompletedRound < currentStation.rounds) {
      setCompletedRoundsInStation(nextCompletedRound);
      return;
    }

    // All rounds at this station are complete.
    if (currentStationIndex < routine.stations.length - 1) {
      setCurrentStationIndex((current) => current + 1);
      setCompletedRoundsInStation(0);
    } else {
      // Final station and final round are complete.
      setCompletedRoundsInStation(nextCompletedRound);
      setIsWorkoutComplete(true);
    }
  };

  const handleEndWorkout = () => {
    setIsWorkoutStarted(false);
    setIsWorkoutComplete(false);
    setCurrentStationIndex(0);
    setCompletedRoundsInStation(0);
  };

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

        {routine && !isWorkoutStarted && (
          <View style={styles.stationsContainer}>
            <Pressable
              style={styles.startWorkoutButton}
              onPress={handleStartWorkout}
              accessibilityRole="button"
            >
              <Ionicons
                name="play-circle-outline"
                size={22}
                color="#102629"
              />
              <Text style={styles.startWorkoutButtonText}>
                START WORKOUT
              </Text>
            </Pressable>

            {routine.stations.map((station) => (
              <StationCard
                key={station.id}
                station={station}
              />
            ))}
          </View>
        )}

        {routine && isWorkoutStarted && !isWorkoutComplete && currentStation && (
          <View style={styles.workoutContainer}>
            {/* Overall Progress */}
            <View style={styles.progressCard}>
              <View style={styles.progressHeader}>
                <Text style={styles.progressTitle}>
                  WORKOUT PROGRESS
                </Text>

                <Text style={styles.progressCount}>
                  {totalCompletedRounds} / {totalRounds} ROUNDS
                </Text>
              </View>

              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${progressPercent}%` },
                  ]}
                />
              </View>

              <Text style={styles.progressSubtitle}>
                Station {currentStationIndex + 1} of {routine.stations.length}
              </Text>
            </View>

            {/* Current Station */}
            <View style={styles.stationCard}>
              <View style={styles.stationHeader}>
                <View style={styles.stationTitleContainer}>
                  <Text style={styles.stationNumber}>
                    {currentStation.name.toUpperCase()}
                  </Text>

                  <Text style={styles.stationSubtitle}>
                    Complete all exercises before moving on
                  </Text>
                </View>

                <View style={styles.roundBadge}>
                  <Text style={styles.roundBadgeText}>
                    {completedRoundsInStation + 1} OF {currentStation.rounds}
                  </Text>
                </View>
              </View>

              {/* Current Station Exercises */}
              {currentStation.groups.map((group, index) => (
                <ExerciseGroupCard
                  key={`${currentStation.id}-group-${index}`}
                  group={group}
                />
              ))}

              {/* Round Instructions */}
              <View style={styles.roundInstruction}>
                <Ionicons
                  name="information-circle-outline"
                  size={18}
                  color="#5DD1DC"
                />

                <Text style={styles.roundInstructionText}>
                  Complete all exercises above before marking this round complete.
                </Text>
              </View>

              {/* Complete Round Button */}
              <Pressable
                style={styles.completeRoundButton}
                onPress={handleCompleteRound}
                accessibilityRole="button"
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={21}
                  color="#102629"
                />

                <Text style={styles.completeRoundButtonText}>
                  COMPLETE ROUND
                </Text>
              </Pressable>
            </View>

            <Pressable
              style={styles.endWorkoutButton}
              onPress={handleEndWorkout}
              accessibilityRole="button"
            >
              <Text style={styles.endWorkoutButtonText}>
                End Workout
              </Text>
            </Pressable>
          </View>
        )}

        {routine && isWorkoutComplete && (
          <View style={styles.completionCard}>
            <Ionicons
              name="checkmark-circle"
              size={66}
              color="#5DD1DC"
            />

            <Text style={styles.completionTitle}>
              WORKOUT COMPLETE!
            </Text>

            <Text style={styles.completionSubtitle}>
              Great work. You've completed all four stations.
            </Text>

            <View style={styles.completionStats}>
              <Text style={styles.completionStatNumber}>
                {totalRounds}
              </Text>

              <Text style={styles.completionStatLabel}>
                TOTAL ROUNDS COMPLETED
              </Text>
            </View>

            <Pressable
              style={styles.startWorkoutButton}
              onPress={handleEndWorkout}
              accessibilityRole="button"
            >
              <Text style={styles.startWorkoutButtonText}>
                BACK TO PROGRAM
              </Text>
            </Pressable>
          </View>
        )}

        {!routine && (
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
  workoutContainer: {
    paddingHorizontal: 16,
    gap: 16,
  },

  startWorkoutButton: {
    backgroundColor: "#5DD1DC",
    borderRadius: 14,
    paddingVertical: 17,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  startWorkoutButtonText: {
    color: "#102629",
    fontSize: 13,
    fontWeight: "900",
    letterSpacing: 1,
  },

  progressCard: {
    backgroundColor: "#20272A",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#343D40",
    gap: 10,
  },

  progressHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  progressTitle: {
    color: "#5DD1DC",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1,
  },

  progressCount: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },

  progressTrack: {
    height: 8,
    backgroundColor: "#394347",
    borderRadius: 5,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#5DD1DC",
    borderRadius: 5,
  },

  progressSubtitle: {
    color: "#AAAAAA",
    fontSize: 11,
  },

  roundInstruction: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 9,
    marginTop: 18,
    marginBottom: 14,
  },

  roundInstructionText: {
    color: "#AAAAAA",
    fontSize: 11,
    lineHeight: 17,
    flex: 1,
  },

  completeRoundButton: {
    backgroundColor: "#5DD1DC",
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },

  completeRoundButtonText: {
    color: "#102629",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
  },

  endWorkoutButton: {
    alignItems: "center",
    paddingVertical: 12,
  },

  endWorkoutButtonText: {
    color: "#AAAAAA",
    fontSize: 12,
    fontWeight: "700",
  },

  completionCard: {
    marginHorizontal: 16,
    padding: 28,
    backgroundColor: "#20272A",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#343D40",
    alignItems: "center",
    gap: 16,
  },

  completionTitle: {
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "900",
    textAlign: "center",
  },

  completionSubtitle: {
    color: "#AAAAAA",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
  },

  completionStats: {
    alignItems: "center",
    marginVertical: 10,
  },

  completionStatNumber: {
    color: "#5DD1DC",
    fontSize: 38,
    fontWeight: "900",
  },

  completionStatLabel: {
    color: "#AAAAAA",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
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
