
export type SpringColor =
  | "yellow"
  | "blue"
  | "red"
  | "green";

export type Exercise = {
  id: string;
  name: string;
  reps?: string;
  equipment?: string[];
  notes?: string;
  springs?: {
    top?: SpringColor[];
    bottom?: SpringColor[];
  };
};

export type ExerciseGroup = {
  type: "individual" | "murder-set";
  exercises: Exercise[];
};

export type WorkoutStation = {
  id: string;
  name: string;
  rounds: number;
  groups: ExerciseGroup[];
};

export const wzf4x15 = {
  id: "wzf-4x15",
  title: "WZF 4x15",
  description: "Progressive strength training",
  programLength: 6,
  stations: [
    {
      id: "station-1",
      name: "Station 1",
      rounds: 4,
      groups: [
        {
          type: "individual",
          exercises: [
            {
              id: "linebacker-squat",
              name: "Linebacker Squat",
              reps: "12+",
              equipment: ["Landmine"],
            },
          ],
        },
        {
          type: "individual",
          exercises: [
            {
              id: "kettlebell-rdl",
              name: "Kettlebell RDL",
              reps: "10–15",
              equipment: ["1 kettlebell"],
            },
          ],
        },
      ],
    },
    {
      id: "station-2",
      name: "Station 2",
      rounds: 3,
      groups: [
        {
          type: "individual",
          exercises: [
            {
              id: "bulgarian-split-squat",
              name: "Bulgarian Split Squat",
              reps: "10+ per leg",
              equipment: ["1–2 dumbbells"],
            },
          ],
        },
      ],
    },
    {
      id: "station-3",
      name: "Station 3",
      rounds: 3,
      groups: [
        {
          type: "individual",
          exercises: [
            {
              id: "mua-extension",
              name: "M.U.A. Extension",
              reps: "10–15 per leg",
              springs: {
                top: ["green"],
                bottom: ["green"],
              },
            },
          ],
        },
        {
          type: "individual",
          exercises: [
            {
              id: "glute-pull-through",
              name: "Glute Pull Through",
              reps: "12+",
              equipment: ["Tower", "Footstraps"],
            },
          ],
        },
      ],
    },
    {
      id: "station-4",
      name: "Station 4",
      rounds: 3,
      groups: [
        {
          type: "murder-set",
          exercises: [
            {
              id: "roller-lunge",
              name: "Roller Lunge",
              equipment: ["Dumbbell", "Roller"],
            },
            {
              id: "donkey-kick",
              name: "Donkey Kick",
              equipment: ["Reformer"],
              reps: "8 × 8 per leg",
              springs: {
                top: ["red", "blue","yellow"],
              }
            },
          ],
        },
      ],
    },
  ] satisfies WorkoutStation[],
};
