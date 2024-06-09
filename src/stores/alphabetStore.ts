import { defineStore } from 'pinia';

export const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'] as const;

export const typeOptions = [
  { label: 'Bicep curls', value: 'bicep_curls' },
  { label: 'Burpees', value: 'burpees' },
  { label: 'Calf Raises', value: 'calf_raises' },
  { label: 'Crunches - Regular', value: 'crunches_regular' },
  { label: 'Crunches - Bicycle', value: 'crunches_bicycle' },
  { label: 'Crunches - Reverse', value: 'crunches_reverse' },
  { label: 'Flutter Kicks', value: 'flutter_kicks' },
  { label: 'Hammer Curls', value: 'hammer_curls' },
  { label: 'Heel Touches', value: 'heel_touches' },
  { label: 'High Knees', value: 'high_knees' },
  { label: 'Hip Raises', value: 'hip_raises' },
  { label: 'Jumping Jacks', value: 'jumping_jacks' },
  { label: 'Jump Rope', value: 'jump_rope' },
  { label: 'Lateral Raises', value: 'lateral_raises' },
  { label: 'Lunges - Backward', value: 'lunges_backward' },
  { label: 'Lunges - Forward', value: 'lunges_forward' },
  { label: 'Lunges - Lateral', value: 'lunges_lateral' },
  { label: 'Lunges - Side', value: 'lunges_side' },
  { label: 'Mountain Climbers', value: 'mountain_climbers' },
  { label: 'Plank - Forearm', value: 'plank_forearm' },
  { label: 'Plank - Side', value: 'plank_side' },
  { label: 'Push Ups - Decline', value: 'pushups_decline' },
  { label: 'Push Ups - Incline', value: 'pushups_incline' },
  { label: 'Push Ups - Knee', value: 'pushups_knee' },
  { label: 'Push Ups - Wall', value: 'pushups_wall' },
  { label: 'Run In Place', value: 'run_in_place' },
  { label: 'Russian Twists', value: 'russian_twists' },
  { label: 'Shoulder Press', value: 'shoulder_press' },
  { label: 'Squats - Jumping', value: 'squats_jumping' },
  { label: 'Squats - Lateral', value: 'squats_lateral' },
  { label: 'Squats - Sumo', value: 'squats_sumo' },
  { label: 'Step Ups', value: 'step_ups' },
  { label: 'Tricep Dips', value: 'tricep_dips' },
  { label: 'Tricep Extensions', value: 'tricep_extensions' },
  { label: 'V-ups', value: 'v_ups' },
  { label: 'Wall Sit', value: 'wall_sit' },
  { label: 'Custom', value: 'custom' },
] as const;

export const unitOptions = [
  { label: 'Seconds', value: 'seconds' },
  { label: 'Reps', value: 'reps' },
] as const;

export type Workout = {
  label: string;
  type: (typeof typeOptions)[number]['value'] | '';
  unit: (typeof unitOptions)[number]['value'] | '';
  quantity: number;
};

export const useAlphabetStore = defineStore('alphabet', {
  state: () => ({
    workouts: Array(26)
      .fill(null)
      .map(() => ({
        label: '',
        type: '',
        unit: '',
        quantity: 0,
      })) as Workout[],
  }),
  persist: true,
});
